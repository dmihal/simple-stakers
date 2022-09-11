import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import sdk from 'data/sdk'
import List from 'components/List'
import SocialTags from 'components/SocialTags'
import { TAGLINE, TITLE } from '../constants'

interface HomeProps {
  data: any[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  const [months, setMonths] = useState(9)

  return (
    <main>
      <SocialTags />

      <h1 className="title">{TITLE}</h1>

      <p className="description">{TAGLINE}</p>

      <p>
        Like this site?{' '}
        <a href="https://gitcoin.co/grants/1624/cryptofees-info">Support it on Gitcoin Grants</a>
      </p>

      <div>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-show-count="true"
        >
          Tweet
        </a>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </div>

      <div className="list">
        <List data={data} daysUntilUnlock={months * 30} />
        <div className="month-bar">
          Assuming staked ETH will unlock {}
          <input
            className="months"
            type="number"
            value={months}
            onChange={e => setMonths(parseInt(e.target.value))}
            min="0"
          />
          {} months from now.
        </div>
      </div>

      <p>
        The best way to stake ETH is to {}
        <a href="https://ethereum.org/en/staking/solo/">run your own Ethereum validator node</a>
        . Running a validator provides the highest possible yield, and contributes to the decentralization {}
        of the Ethereum network.
      </p>

      <p>
        However, many users find benefits of staking using a {}
        <a href="https://ethereum.org/en/staking/pools/">liquid staking pool</a>
        . These protocols and companies take custody of user ETH and operate validator nodes on their {}
        behalf, in exchange for a percentage of the generated yield.
      </p>

      <p>
        There are two primary benefits of these liquid-staking pools. First, users may stake amounts {}
        smaller than the 32 ETH required to run a validator node. Second, the staked assets are {}
        represented by staking tokens, which can be used in other DeFi applications (as collateral, {}
        as a trading pair, etc). Additionally, users can effectively "unstake" their ETH by selling {}
        these staked assets on secondary markets.
      </p>

      <p>
        When choosing a staking pool, users should be aware of both the effective APY provided by the {}
        staking pool (which is determined by the fee the pool charges), as well as the market discount {}
        of the staking token. Most staking tokens currently trade at a discount to ETH on secondary {}
        markets, which can provide opportunities for those who wish to purchase staking assets.
      </p>

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
          font-weight: 700;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        .list {
          margin: 12px 0 48px;
        }

        .month-bar {
          background: #eee;
          font-size: 14px;
          text-align: right;
          border: solid 1px #ccc;
          padding: 4px;
        }
        .months {
          background: #f7f7f7;
          border: none;
          width: 34px;
        }

        p {
          margin: 4px 8px;
          max-width: 700px;
        }

        @media (max-width: 700px) {
          .title {
            font-size: 36px;
          }
          .description {
            font-size: 18px;
          }
        }
      `}</style>
    </main>
  );
};

/*
 * Looking for the data source?
 *
 * This site pulls data from the CryptoStats protocol
 * Visit https://cryptostats.community/discover/issuance to see the code for these adapters
 */
export const getStaticProps: GetStaticProps = async () => {
  const list = sdk.getCollection('eth-staking-pools')
  await list.fetchAdapters()
  let data = await list.executeQueriesWithMetadata([
    'apy',
    'underlyingAssetMarketRate',
    'totalStakedETH',
  ], { allowMissingQueries: true })
  data = data.filter(val => val.results.apy)

  return { props: { data }, revalidate: 60 * 60 };
};

export default Home;
