import React from "react";
import styled from "styled-components";
import RealtedNFTItem, { RealtedNFTItemProps } from "./RealtedNFTItem";
import { Title } from "./Title";

const Container = styled.div`
  width: 350px;
  height: 400px;
`;
const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  grid-gap: 10px;
`;

interface RelatedNFTProps {
  relatedNFTs: Array<RealtedNFTItemProps>;
}

const RelatedNFT = ({ relatedNFTs }: RelatedNFTProps) => {
  return (
    <Container>
      <Title title="관련 있는 NFT 작품" />
      <ContentContainer>
        {relatedNFTs.map((nft) => (
          <RealtedNFTItem
            key={nft.itemAddress}
            imageUrl={nft.imageUrl}
            itemTitle={nft.itemTitle}
            itemAddress={nft.itemAddress}
          />
        ))}
      </ContentContainer>
    </Container>
  );
};

export default RelatedNFT;
