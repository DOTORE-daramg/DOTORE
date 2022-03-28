import React from "react";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import RealtedNFTItem, { RealtedNFTItemProps } from "./RealtedNFTItem";
import { Title } from "./Title";

const Container = styled.div`
  width: 350px;
  height: 400px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    height: fit-content;
    margin-bottom: 60px;
  }
`;

const Info = styled.div`
  position: absolute;
  left: 32%;
  top: 44%;
  width: 19rem;
  font-size: 0.7rem;
  line-height: 1.4;
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: none;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover ${Info} {
    display: block;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  width: 65%;
  justify-content: space-between;
`;
const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  grid-gap: 10px;
  place-items: center;
`;

interface RelatedNFTProps {
  relatedNFTs: Array<RealtedNFTItemProps>;
}

const RelatedNFT = ({ relatedNFTs }: RelatedNFTProps) => {
  return (
    <Container>
      <TitleContainer>
        <Title title="관련 있는 NFT 작품" />
        <IconContainer>
          <Icon
            style="fas"
            icon="circle-question"
            color="#6667ab"
            size="12px"
          />
          <Info>
            지금 보고 계신 작품과 관련 있는 다른 작품들이에요. <br />
            1차 NFT의 경우 해당 작품에서 파생된 2차 NFT 작품들, <br />
            2차 NFT의 경우 영감을 받은 1차 NFT 작품들이 표시됩니다. <br />
          </Info>
        </IconContainer>
      </TitleContainer>
      <ContentContainer>
        {relatedNFTs.map((nft) => (
          <RealtedNFTItem
            key={nft.tokenId}
            itemHash={nft.itemHash}
            tokenId={nft.tokenId}
          />
        ))}
      </ContentContainer>
    </Container>
  );
};

export default RelatedNFT;
