import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RefreshTx } from "../../stories/artist/RefreshTx";
import { Icon } from "../../stories/common/Icon";
import { getAuthoredNFTList } from "../../api/artist";
import LoadingSpinner from "../../stories/common/LoadingSpinner";
import { ThumbnailProps } from "../../stories/thumbnail/Thumbnail";
import { ThumbnailGrid } from "../../stories/thumbnail/ThumbnailGrid";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";

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

const AuthoredNFTList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const columnCount = isPc ? 4 : isTablet ? 3 : 3;
  const gridSize = isPc ? "52rem" : isTablet ? "40rem" : "20rem";
  const { userAddress } = useParams();
  const [itemList, setItemList] = useState<ThumbnailProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  useEffect(() => {
    if (isLoading) {
      if (userAddress) {
        getAuthoredNFTList(userAddress).then((res) => {
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
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {userInfo.address === userAddress ? (
            <RefreshTx gridSize={gridSize} setIsLoading={setIsLoading} />
          ) : null}
          {itemList && itemList.length > 0 ? (
            <ThumbnailGrid
              itemList={itemList}
              size={gridSize}
              columnCount={columnCount}
            ></ThumbnailGrid>
          ) : (
            <div>아직 창작한 작품이 없습니다.</div>
          )}
        </>
      )}
    </>
  );
};

export default AuthoredNFTList;
