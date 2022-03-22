import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image } from "./Image";

const Container = styled.div``;

export interface RealtedNFTItemProps {
  imageUrl: string;
  itemTitle?: string;
  itemAddress: string;
}

const RealtedNFTItem = ({
  imageUrl,
  itemTitle = "NFT",
  itemAddress,
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
    <Container onClick={() => navigate(`/detail/${itemAddress}`)}>
      <Image imageUrl={imageUrl} name={itemTitle} mode={viewMode} />
    </Container>
  );
};

export default RealtedNFTItem;
