import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../../api/item";
import { getUserInfo } from "../../api/user";
import { web3 } from "../../contracts";
import { Image } from "../detail/Image";

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

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  :hover {
    cursor: pointer;
  }
`;

const TransactionHistoryItem = ({ data }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<Date>(new Date());
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [itemInfo, setItemInfo] = useState<any>({
    itemHash: "",
    itemTitle: "",
  });
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "trade" : isTablet ? "trade" : "tradeM";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setTimeStamp(new Date(parseInt(data.timeStamp + "000")));
      getUserInfo(data.returnValues.from || data.returnValues.seller).then(
        (res) => setFrom(res.data.nickname)
      );
      getUserInfo(data.returnValues.to || data.returnValues.owner).then((res) =>
        setTo(res.data.nickname)
      );
      getItem(data.returnValues.tokenId).then((res) => {
        setItemInfo(res.data);
      });
      setIsLoading(true);
    }
  }, [isLoading]);

  const onClickItem = () => {
    navigate(`/detail/${data.returnValues.tokenId}`);
  };

  const onClickFromUser = () => {
    navigate(`/artist/${data.returnValues.from || data.returnValues.seller}`);
  };

  const onClickToUser = () => {
    navigate(`/artist/${data.returnValues.to || data.returnValues.owner}`);
  };

  return (
    <TableRow>
      <TableBlock width="15%">
        <TableCell>{data.event}</TableCell>
      </TableBlock>
      <TableBlock width="25%">
        <ItemContainer onClick={onClickItem}>
          {isLoading && itemInfo && (
            <Image
              imageUrl={itemInfo.itemHash}
              name={itemInfo.itemTitle}
              mode={viewMode}
            ></Image>
          )}
          <TableCell>{itemInfo.itemTitle}</TableCell>
        </ItemContainer>
      </TableBlock>
      <TableBlock width="10%">
        {isLoading && (
          <TableCell>
            {timeStamp.getFullYear()}-{timeStamp.getMonth() + 1}-
            {timeStamp.getDate()}
          </TableCell>
        )}
      </TableBlock>
      <TableBlock width="20%">
        <TableCell>
          <ItemContainer onClick={onClickFromUser}>{from}</ItemContainer>
        </TableCell>
      </TableBlock>
      <TableBlock width="20%">
        <ItemContainer onClick={onClickToUser}>{to}</ItemContainer>
      </TableBlock>
      <TableBlock width="10%">
        <TableCell>
          {data.returnValues.price
            ? `${web3.utils.fromWei(data.returnValues.price)} ETH`
            : ""}
        </TableCell>
      </TableBlock>
    </TableRow>
  );
};

export default TransactionHistoryItem;
