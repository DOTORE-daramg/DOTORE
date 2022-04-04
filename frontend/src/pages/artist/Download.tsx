import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDownloadNFTList } from "../../api/artist";
import LoadingSpinner from "../../stories/common/LoadingSpinner";
import { ThumbnailProps } from "../../stories/thumbnail/Thumbnail";
import { ThumbnailGrid } from "../../stories/thumbnail/ThumbnailGrid";

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
`;

const Download = () => {
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
        getDownloadNFTList(userAddress).then((res) => {
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
    return () => setIsLoading(false);
  }, [userAddress, isLoading]);

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
            <div>아직 다운로드한 작품이 없습니다.</div>
          )}
        </>
      )}
    </Container>
  );
};

export default Download;
