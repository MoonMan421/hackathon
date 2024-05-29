import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {prettifyNumber} from "../utils/prettifyNumber";

const MobileTable = ({
  tableData: tableData,
  getPrice: getPrice,
  getDailyEmission: getDailyEmission,
  getMaxSupply: getMaxSupply,
  getCircSupply: getCircSupply,
}) => {
  const rows = tableData
    .map(record => {
      return <Tr>
        <Td className={"mobile-row"}>
          <div className={"row-chain-mobile"}>
            <img
              src={record.logo}
              alt={'chainIcon'}
              style={{height: "2em", paddingRight: "1em", alignSelf: "center"}}
            >
            </img>
            <div className={"column-mobile"}>
              <div className={"white-bold-mobile"}>
                {record.chain}
              </div>
              <div className={"row-small"}>
                {record.token}
              </div>
            </div>
          </div>
        </Td>
        <Td className={"mobile-row"}>
          <div className={"price-mobile"}>
            ${getPrice(record).toFixed(2)}
          </div>
        </Td>
        <Td className={"mobile-row"}>
          <div className={"column-mobile"}>
            <div className={"whale-tx-row-mobile white-bold-mobile"}>
              ${prettifyNumber(getDailyEmission(record) * getPrice(record))}
            </div>
            <div className={"whale-tx-row-mobile row-small"}>
              {prettifyNumber(getDailyEmission(record))} {record.token}
            </div>
          </div>
        </Td>
        <Td className={"mobile-row"}>
          <div className={"column-mobile"}>
            <div className={"whale-tx-row-mobile white-bold-mobile"}>
              ${prettifyNumber(getCircSupply(record) * getPrice(record))}
            </div>
            <div className={"whale-tx-row-mobile row-small"}>
              {prettifyNumber(getCircSupply(record))} {record.token}
            </div>
          </div>
        </Td>
        <Td className={"mobile-row"}>
          <div className={"column-mobile"}>
            <div className={"whale-tx-row-mobile white-bold-mobile"}>
              ${prettifyNumber(getMaxSupply(record) * getPrice(record))}
            </div>
            <div className={"whale-tx-row-mobile row-small"}>
              {prettifyNumber(getMaxSupply(record))} {record.token}
            </div>
          </div>
        </Td>
        <Td className={"mobile-row"}>
          <div className={"bar-label-box-mobile"}>
            <div className={"bar-label blue"}>
              {(getCircSupply(record) / getMaxSupply(record) * 100).toFixed(1)} %
            </div>
            <div className={"bar-label red"}>
              {((1 - getCircSupply(record) / getMaxSupply(record)) * 100).toFixed(1)}%
            </div>
          </div>
          <div className={"bar-box-mobile"}>
            <div className={"left-bar"} style={{width: `${getCircSupply(record) / getMaxSupply(record) * 100}%`}}>
            </div>
            <div className={"right-bar"}
                 style={{width: `${(1 - getCircSupply(record) / getMaxSupply(record)) * 100}%`}}>
            </div>
          </div>
        </Td>
      </Tr>
    });

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Token</Th>
          <Th>Price</Th>
          <Th>Daily Unlock</Th>
          <Th>Market Cap</Th>
          <Th>FDV </Th>
          <Th>Unlocked Supply %</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows}
      </Tbody>
    </Table>
  );
}

export default MobileTable;