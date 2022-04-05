import React, { useEffect, useState } from "react";
import { ThumbnailGrid } from "../../stories/thumbnail/ThumbnailGrid";
import { useMediaQuery } from "react-responsive";
import { RefreshTx } from "../../stories/artist/RefreshTx";
import { getNFTList } from "../../api/artist";
import { ThumbnailProps } from "../../stories/thumbnail/Thumbnail";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../stories/common/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";

const OwnedNFTList = () => {
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
        getNFTList(userAddress).then((res) => {
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
            <div>아직 소유한 작품이 없습니다.</div>
          )}
        </>
      )}
    </>
  );
};

export default OwnedNFTList;
