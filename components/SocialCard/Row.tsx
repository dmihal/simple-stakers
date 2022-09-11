import React from 'react';

interface RowProps {
  protocol: any;
  index: number;
}

const font = 'SofiaProRegular, Sofia Pro, sofia-pro';

const toDecimal = (num: number) => num.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const Row: React.FC<RowProps> = ({ protocol, index }) => {
  let svgImg;

  const icon = protocol.metadata.icon;

  if (icon?.indexOf('data:image/svg+xml;base64,') === 0) {
    const buffer = Buffer.from(icon.substring(26), 'base64');
    svgImg = buffer.toString('ascii');
    svgImg = svgImg.replace('<?xml version="1.0" encoding="utf-8"?>', '')
    svgImg = svgImg.replace(/<svg([^>]*)(?: (?:width|height)="\d*"){2}/, '<svg $1')
    svgImg = svgImg.replace(/">/, '" width="24" height="24">');
  }

  return (
    <g transform={`translate(28, ${117 + 37 * index})`}>
      <rect fill="#ffffff" x="0" y="0" width="628" height="37" />

      <g transform="translate(10, 4)">
        <text fontFamily={font} fontSize="16" fill="#091636" x="0" y="18">
          {index + 1}.
        </text>

        <g transform="translate(36,0)">
          {svgImg ? (
            <g dangerouslySetInnerHTML={{ __html: svgImg }} />
          ) : (
            <image x="0" y="0" width="24" height="24" href={icon} />
          )}
        </g>

        <text fontFamily={font} fontSize="16" fill="#091636" x="70" y="18">
          {protocol.metadata.name.length > 20 ? protocol.metadata.name.substr(0, 20) + '...' : protocol.metadata.name}
        </text>

        <text y="18" x="380" fontFamily={font} fontSize="16" textAnchor="end" fill="#091636">
          {toDecimal(protocol.results.underlyingAssetMarketRate)} Ξ {}
          <tspan fill={protocol.results.underlyingAssetMarketRate > 1 ? '#dd7777' : '#777777'}>
            (
            {protocol.results.underlyingAssetMarketRate > 1 && '+'}
            {toDecimal((protocol.results.underlyingAssetMarketRate - 1) * 100)}
            %)
          </tspan>
        </text>
        <text y="18" x="460" fontFamily={font} fontSize="16" textAnchor="end" fill="#091636">
          {toDecimal(protocol.results.apy * 100)}%
        </text>
        <text y="18" x="600" fontFamily={font} fontSize="16" textAnchor="end" fill="#091636">
          {toDecimal(protocol.results.effectiveAPY * 100)}%
        </text>
      </g>
    </g>
  );
};

export default Row;
