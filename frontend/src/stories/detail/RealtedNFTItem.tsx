import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image } from "./Image";

const Container = styled.div``;

export interface RealtedNFTItemProps {
  itemHash: string;
  itemTitle?: string;
  tokenId: string;
}

const RealtedNFTItem = ({
  itemHash,
  itemTitle = "NFT",
  tokenId,
}: RealtedNFTItemProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc
    ? "detailList"
    : isTablet
    ? "detailList"
    : "detailListM";
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/detail/${tokenId}`)}>
      <Image
        // imageUrl={itemHash}
        imageUrl="https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2"
        name={itemTitle}
        mode={viewMode}
      />
    </Container>
  );
};

export default RealtedNFTItem;
