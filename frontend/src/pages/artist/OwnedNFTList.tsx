import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThumbnailGrid } from "../../stories/thumbnail/ThumbnailGrid";
import { useMediaQuery } from "react-responsive";
import { RefreshTx } from "../../stories/artist/RefreshTx";
import { getNFTList } from "../../api/artist";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { ThumbnailProps } from "../../stories/thumbnail/Thumbnail";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../stories/common/LoadingSpinner";

const dummyItemList = [
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
  {
    nickname: "",
    itemTitle: "",
    owner_address: "",
    like: 0,
    itemHash: "",
  },
];

const Container = styled.div`
  display: flex;
  margin: auto;
  padding: 5rem 2rem;
  justify-content: center;
  min-height: 22rem;
  align-items: center;
`;

const OwnedNFTList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const columnCount = isPc ? 4 : isTablet ? 3 : 3;
  const gridSize = isPc ? "52rem" : isTablet ? "40rem" : "20rem";
  const { userAddress } = useParams();
  const [itemList, setItemList] = useState<ThumbnailProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (isLoading) {
      if (userAddress) {
        getNFTList(userAddress).then((res) => {
          console.log(res);
          if (res.data.result !== "작품 목록이 없습니다.") {
            setItemList(res.data.data);
          }
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
    return () => clearTimeout();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {itemList && itemList.length > 0 ? (
            <ThumbnailGrid
              itemList={itemList}
              size={gridSize}
              columnCount={columnCount}
            ></ThumbnailGrid>
          ) : (
            <div>아직 소유한 작품이 없습니다.</div>
          )}
        </>
      )}
    </Container>
  );
};

export default OwnedNFTList;
