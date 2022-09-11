import React from 'react';
import Attribute from './Attribute';

const DetailsCard: React.FC<{ protocol: any }> = ({ protocol }) => {
  return (
    <div className="details-card">
      <div className="metadata">
        {protocol.results.totalStakedETH && (
          <Attribute title="Total Staked">{protocol.results.totalStakedETH.toFixed(0)} ETH</Attribute>
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
