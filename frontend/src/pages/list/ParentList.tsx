import React from "react";
import styled from "styled-components";
import { InputBox } from "../../stories/InputBox";
import { Title } from "../../stories/Title";
const Container = styled.div`
  height: 100vh;
  margin: 60px;
`;

const InnerContainer = styled.div``;
const ParentList = () => {
  return (
    <Container>
      <Title label="1차 NFT 보기" size="2rem"></Title>
      <InnerContainer>
        <InputBox width="10rem" />
      </InnerContainer>
    </Container>
  );
};

export default ParentList;
