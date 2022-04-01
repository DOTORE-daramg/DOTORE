import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewAll } from "../api/item";
import { getUsers } from "../api/user";
import banner1 from "../assets/banner1.png";
import Skeleton from "../stories/list/Skeleton";
import Banner from "../stories/main/Banner";
import Profile from "../stories/profile/Profile";
import { SubTitle } from "../stories/SubTitle";
import { ThumbnailProps } from "../stories/thumbnail/Thumbnail";
import { ThumbnailGrid } from "../stories/thumbnail/ThumbnailGrid";
import { Title } from "../stories/Title";

const Container = styled.div`
  height: 100%;
`;

// const Banner = styled.img`
//   /* width: 100%; */
//   height: 30vh;
//   margin-top: 100px;
// `;

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
  // const itemList = [
  //   {
  //     itemHash:
  //       "https://littledeep.com/wp-content/uploads/2020/02/littledeep_squirrel_style1.png",
  //     itemTitle: "다람쥐1",
  //     nickname: "이성재",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  //   {
  //     itemHash:
  //       "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
  //     itemTitle: "다람쥐2",
  //     nickname: "주비스",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  //   {
  //     itemHash:
  //       "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
  //     itemTitle: "다람쥐3",
  //     nickname: "이성재이성재이성재이성재이성재이성재이성재",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  //   {
  //     itemHash:
  //       "https://ww.namu.la/s/eac71acc34e222bd691c5f8e0ad2450976cfb81af259569252f2dfbd83d2aca1b9e3f4fb4a26d42da46ce2c802a125b24aee7f3b4fa419dca2d33f8cfcf053f1b822d3f2ef26a4b7cf6440c4291e34ba",
  //     itemTitle: "다람쥐4",
  //     nickname: "이성재이성재이성재이성재이성재이성재이성재",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  //   {
  //     itemHash:
  //       "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/09/urbanbrush-20190902130111743623.png",
  //     itemTitle: "토리토리도토리",
  //     nickname: "이성재이성재이성재이성재이성재이성재이성재",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  //   {
  //     itemHash:
  //       "https://blog.kakaocdn.net/dn/bpj8Kc/btqCFxz4xFK/kpUTKlADoZxWjnGhHslje1/img.png",
  //     itemTitle: "다람쥐6",
  //     nickname: "John Doe",
  //     size: "14rem",
  //     onClick: () => {
  //       console.log("clicked!");
  //     },
  //   },
  // ];
  // const profileList = [
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  //   {
  //     profileImgUrl:
  //       "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  //     profileNickname: "주비스",
  //     profileLevel: "Lv.2 꼬맹이도토리",
  //     size: "72px",
  //   },
  // ];

  const [isNFTLoading, setIsNFTLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const [itemList, setItemList] = useState<ThumbnailProps[]>([]);
  const [profileList, setProfileList] = useState<Iuser[]>([]);
  const isPc = useMediaQuery({ minWidth: 768 });
  const navigete = useNavigate();

  useEffect(() => {
    if (isNFTLoading) {
      viewAll().then((res) => {
        const {
          data: { data: data },
        } = res;
        data.map((res: Iitem) => {
          const { itemHash, nickname, itemTitle, tokenId, like } = res;
          const onClick = () => {
            navigete(`/detail/${tokenId}`);
          };

          itemList.push({
            itemHash,
            itemTitle,
            nickname,
            like,
            tokenId,
            onClick,
          });
        });
        itemList.sort((a, b) => {
          return b.like - a.like;
        });
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
            navigete(`/artist/${address}`);
          };
          const profileLevel =
            acorn > 10 ? "Lv2. 꼬맹이 도토리" : "Lv1. 새싹 도토리";
          profileList.push({
            acorn,
            address,
            nickname,
            profileImgUrl: profileImgUrl,
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
            itemList={itemList}
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
