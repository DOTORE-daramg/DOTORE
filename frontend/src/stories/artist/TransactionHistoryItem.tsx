import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { web3 } from '../../contracts';
import { getTimeStamp } from "../../contracts/api/transactionRecord";
import { transactionRecordTypes } from "./TransactionHistoryList";

const TableRow = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  border-bottom: solid 1px #6667ab;
  height: 5rem;
  align-items: center;
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const TableCell = styled.span`
  text-align: center;
  text-overflow: ellipsis;
  /* text-overflow: clip; */
  overflow: hidden;
  /* white-space: nowrap; */
  /* margin: auto; */
`;


const TransactionHistoryItem = ({data}:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<Date>(new Date());
  console.log(data);
  useEffect(() => {
    if (!isLoading) {
      setTimeStamp(new Date(parseInt(data.timeStamp+"000")))
      setIsLoading(true);
    }
  }, [isLoading]);

  return (
    <TableRow>
      <TableBlock width="10%">
        <TableCell>{data.event}</TableCell>
      </TableBlock>
      {/* <TableBlock width="25%">
            <Image
              imageUrl={txHistory.item.itemImgUrl}
              name={txHistory.item.itemTitle}
              mode={viewMode}
            ></Image>
            <TableCell>{txHistory.item.itemTitle}</TableCell>
          </TableBlock> */}
      <TableBlock width="10%">{data.returnValues.tokenId}</TableBlock>
      <TableBlock width="10%">
        {isLoading &&
        <TableCell>
          {timeStamp.getFullYear()}-{timeStamp.getMonth() + 1}-
          {timeStamp.getDate()}
        </TableCell>
        }
      </TableBlock>
      <TableBlock width="30%">
        <TableCell>{data.returnValues.from}</TableCell>
      </TableBlock>
      <TableBlock width="30%">
        <TableCell>{data.returnValues.to}</TableCell>
      </TableBlock>
      <TableBlock width="10%">
        <TableCell>
          {data.returnValues.price ? `${web3.utils.fromWei(data.returnValues.price)} ETH` : ""}
        </TableCell>
      </TableBlock>
    </TableRow>
  );
};

export default TransactionHistoryItem;
