import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import path from 'path';
import SocialCard from 'components/SocialCard';
import sdk from 'data/sdk'

// These statements causes Next to bundle these files
path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'SofiaProRegular.ttf');

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const list = sdk.getCollection('eth-staking-pools')
  await list.fetchAdapters()
  let data = await list.executeQueriesWithMetadata([
    'apy',
    'underlyingAssetMarketRate',
    'totalStakedETH',
  ], { allowMissingQueries: true })
  data = data
    .filter(val => val.results.apy)
    .map(item => {
      const daysUntilUnlock = 9 * 30
      item.results.effectiveAPY = item.results.apy + ((1 - item.results.underlyingAssetMarketRate) / (daysUntilUnlock / 365))
      return item
    })
    .sort((a: any, b: any) => b.results.effectiveAPY - a.results.effectiveAPY)

  const svg = ReactDOMServer.renderToString(
    React.createElement(SocialCard, { data, date: sdk.date.formatDate(new Date()) })
  );

  const buffer = Buffer.from(svg);
  const output = await sharp(buffer, { density: 300 }).toFormat('png').toBuffer();

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=240');
  res.setHeader('Content-Type', 'image/png');
  res.write(output, 'binary');
  res.end(null, 'binary');
};

export default handler;
