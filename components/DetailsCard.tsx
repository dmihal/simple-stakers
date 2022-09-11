import React from 'react';
import Attribute from './Attribute';

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

const DetailsCard: React.FC<{ protocol: any }> = ({ protocol }) => {
  return (
    <div className="details-card">
      <div className="metadata">
        {protocol.results.totalStakedETH && (
          <Attribute title="Total Staked">{protocol.results.totalStakedETH.toFixed(0)} ETH</Attribute>
        )}

        {protocol.metadata.website && (
          <Attribute title="Website">
            <a href={protocol.metadata.website} target="website">
              {protocol.metadata.website.replace('https://', '')}
            </a>
          </Attribute>
        )}


        {protocol.metadata.tokenAddress && protocol.metadata.tokenSymbol && (
          <a
            href={`https://cowswap.exchange/#/swap?inputCurrency=${WETH}&outputCurrency=${protocol.metadata.tokenAddress}&exactAmount=1&exactField=input&referral=cryptofees.info`}
            target="cowswap"
          >
            Purchase {protocol.metadata.tokenSymbol} on CowSwap
          </a>
        )}

        <div className="spacer" />
      </div>

      <style jsx>{`
        .details-card {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .metadata {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .description {
          margin: 4px 0;
        }
        .row {
          display: flex;
        }
        .row > :global(div) {
          flex: 1;
        }
        .spacer {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default DetailsCard;
