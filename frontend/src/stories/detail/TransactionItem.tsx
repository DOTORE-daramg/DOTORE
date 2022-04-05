import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";
import { web3 } from "../../contracts";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;
const Category = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ItemContainer = styled.div`
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface DetailProps {
  data: any;
}
const TransactionItem = ({ data }: DetailProps) => {
  const timeStamp = new Date(parseInt(data.timeStamp + "000"));
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo(data.returnValues.from || data.returnValues.owner).then((res) =>
      setFrom(res.data.nickname)
    );
    getUserInfo(data.returnValues.to || data.returnValues.seller).then((res) =>
      setTo(res.data.nickname)
    );
  }, []);

  const onClickFromUser = () => {
    navigate(`/artist/${data.returnValues.from || data.returnValues.owner}`);
  };

  const onClickToUser = () => {
    navigate(`/artist/${data.returnValues.to || data.returnValues.seller}`);
  };

  return (
    <Container>
      <Category width="30%">
        {timeStamp.getFullYear()}-{timeStamp.getMonth() + 1}-
        {timeStamp.getDate()}
      </Category>
      <Category width="25%">
        <ItemContainer onClick={onClickFromUser}>{from}</ItemContainer>
      </Category>
      <Category width="25%">
        <ItemContainer onClick={onClickToUser}>{to}</ItemContainer>
      </Category>
      <Category width="20%">
        {web3.utils.fromWei(data.returnValues.price)}ETH
      </Category>
    </Container>
  );
};

export default TransactionItem;
