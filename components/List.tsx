import React, { useState } from 'react'
import Row from './Row';

interface ListProps {
  data: any[]
  daysUntilUnlock: number
}

enum SORT {
  APY,
  DISCOUNT,
  EFFECTIVE_APY,
}

const sortByAPY = (a: any, b: any) => b.results.apy - a.results.apy
const sortByDiscount = (a: any, b: any) => a.results.underlyingAssetMarketRate - b.results.underlyingAssetMarketRate
const sortByEffectiveAPY = (daysUntilUnlock: number) => (a: any, b: any) => {
  const apyA = a.results.apy + ((1 - a.results.underlyingAssetMarketRate) / (daysUntilUnlock / 365))
  const apyB = b.results.apy + ((1 - b.results.underlyingAssetMarketRate) / (daysUntilUnlock / 365))
  return apyB - apyA
}

const List = ({ data, daysUntilUnlock }: ListProps) => {
  const [sort, setSort] = useState<SORT>(SORT.EFFECTIVE_APY);

  let sortedData = data
  switch (sort) {
    case SORT.APY:
      sortedData = data.sort(sortByAPY)
      break
    case SORT.DISCOUNT:
      sortedData = data.sort(sortByDiscount)
      break
    case SORT.EFFECTIVE_APY:
      sortedData = data.sort(sortByEffectiveAPY(daysUntilUnlock))
      break
  }

  return (
    <div className="list">
      <div className="header">
        <div className="name">Name</div>
        <div className="amount" onClick={() => setSort(SORT.DISCOUNT)}>
          {sort === SORT.DISCOUNT && '▼'} Market Price
        </div>
        <div className="apy" onClick={() => setSort(SORT.APY)}>
          {sort === SORT.APY && '▼'} APY
        </div>
        <div className="amount" onClick={() => setSort(SORT.EFFECTIVE_APY)}>
          {sort === SORT.EFFECTIVE_APY && '▼'} Effective APY
        </div>
      </div>

      {sortedData.map((protocol: any) => (
        <Row protocol={protocol} key={protocol.id} daysUntilUnlock={daysUntilUnlock} />
      ))}

      <style jsx>{`
        .list {
          border: solid 1px lightGray;
          border-radius: 0px;
          overflow: hidden;
          max-width: 700px;
          width: 100%;
        }

        .header {
          display: flex;
          padding: 0 4px;
          border-bottom: solid 1px lightGray;
          background: #eee;
          font-weight: 500;
          padding-left: 10px;
        }

        .item {
          display: flex;
          padding: 0 4px;
          background-color: #fff;
          font-size: 18px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-size: 20px 20px;
          padding-left: 10px;
        }

        .item.app {
          background-color: #fad3f6;
        }

        .item > div,
        .header > div {
          padding: 16px 32px;
        }

        .name {
          flex: 1;
        }

        .amount, .apy {
          cursor: pointer;
          text-align: right;
        }
        .amount {
          min-width: 180px;
        }
        .apy {
          min-width: 100px;
        }

        @media (max-width: 700px) {
          .header {
            padding-left: 28px;
            padding-right: 30px;
          }
          .header > div {
            font-size: 14px;
          }

          .amount {
            font-size: 16px;
            min-width: 110px;
          }
          .name {
            font-size: 14px;
          }
          .hide {
            display: none;
          }

          .item {
            padding-left: 30px;
            padding-right: 0;
            background-position: 6px center;
          }

          .item > div,
          .header > div {
            padding: 8px 2px;
          }
        }

        @media (max-width: 500px) {
          .list {
            max-width: calc(100vw - 8px);
          }
          .header > div {
            padding: 8px 2px 8px 4px;
          }
          .header > div.name {
            padding-left: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default List;