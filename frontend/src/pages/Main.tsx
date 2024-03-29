import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewList } from "../api/item";
import { getUsers } from "../api/user";
import Skeleton from "../stories/list/Skeleton";
import Banner from "../stories/main/Banner";
import Profile from "../stories/profile/Profile";
import { SubTitle } from "../stories/SubTitle";
import { ThumbnailProps } from "../stories/thumbnail/Thumbnail";
import { ThumbnailGrid } from "../stories/thumbnail/ThumbnailGrid";
import { Title } from "../stories/Title";
import { getLevel } from "../utils/Level";

const Container = styled.div`
  height: 100%;
`;

const NFTContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  gap: 3rem;
  a {
    text-decoration: none;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface Iitem {
  acorn: number;
  authorAddress: string;
  createdAt: string;
  download: number;
  format: string;
  isFirst: boolean;
  itemDescription: string;
  itemHash: string;
  itemTitle: string;
  like: number;
  nickname: string;
  onSaleYn: boolean;
  ownerAddress: string;
  price: null;
  profileImgUrl: string;
  result: string;
  tags: number[];
  tokenId: number;
}

interface Iuser {
  acorn: number;
  address: string;
  nickname: string;
  profileImgUrl: string;
  profileLevel: string;
  onClick: () => void;
}

const Main = () => {
  const [isNFTLoading, setIsNFTLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [itemList, setItemList] = useState<ThumbnailProps[]>([]);
  const [profileList, setProfileList] = useState<Iuser[]>([]);
  const isPc = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

  useEffect(() => {
    if (isNFTLoading) {
      viewList(1, "", 1, "all").then((res) => {
        const {
          data: { data: data },
        } = res;
        let newItemList: ThumbnailProps[] = [];
        data.map((res: Iitem) => {
          const { itemHash, nickname, itemTitle, tokenId, like } = res;
          const onClick = () => {
            navigate(`/detail/${tokenId}`);
          };
          newItemList.push({
            itemHash,
            itemTitle,
            nickname,
            like,
            tokenId,
            onClick,
          });
        });

        newItemList.sort((a, b) => b.like - a.like);
        setItemList(newItemList);
        setIsNFTLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (isProfileLoading) {
      getUsers().then((res) => {
        const {
          data: { data: data },
        } = res;

        data.map((res: Iuser) => {
          const { acorn, address, nickname, profileImgUrl } = res;
          const onClick = () => {
            navigate(`/artist/${address}`);
          };
          const profileLevel = getLevel(acorn);
          profileList.push({
            acorn,
            address,
            nickname,
            profileImgUrl,
            profileLevel,
            onClick,
          });
        });
        profileList.sort((a, b) => {
          return b.acorn - a.acorn;
        });
        setIsProfileLoading(false);
      });
    }
  }, [isProfileLoading]);

  return (
    <Container>
      <Banner />
      <NFTContainer>
        <Title label="Popular NFTs" size="4rem" />
        <SubTitle label="지금 이 시각 가장 활발한 창작물" />
        {!isNFTLoading ? (
          <ThumbnailGrid
            itemList={isPc ? itemList.slice(0, 9) : itemList.slice(0, 6)}
            size={isPc ? `48rem` : `20rem`}
            columnCount={isPc ? 3 : 2}
          />
        ) : (
          <div
            style={{
              display: "flex",
              width: isPc ? `48rem` : `20rem`,
              justifyContent: "space-between",
            }}
          >
            <Skeleton width="15rem" height="15rem" />
            <Skeleton width="15rem" height="15rem" />
            <Skeleton width="15rem" height="15rem" />
          </div>
        )}

        <Link to="/list">
          <SubTitle label="&gt; 더 많은 작품 보러 가기"></SubTitle>
        </Link>
      </NFTContainer>

      <NFTContainer>
        <Title label="Top Artists" size="4rem" />
        <SubTitle label="지금 이 시각 가장 주목받는 작가" />
        {!isProfileLoading ? (
          <GridContainer>
            {profileList &&
              profileList
                .slice(0, 6)
                .map((profile) => (
                  <Profile
                    profileImgUrl={profile.profileImgUrl}
                    profileNickname={profile.nickname}
                    profileLevel={profile.profileLevel}
                    size="72px"
                    onClick={profile.onClick}
                    key={profile.address}
                  />
                ))}
          </GridContainer>
        ) : (
          <GridContainer>
            <Skeleton width="233.33px" height="104px" />
            <Skeleton width="233.33px" height="104px" />
            <Skeleton width="233.33px" height="104px" />
          </GridContainer>
        )}
      </NFTContainer>
    </Container>
  );
};

export default Main;
