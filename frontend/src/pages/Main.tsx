import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import banner1 from "../assets/banner1.png";
import Profile from "../stories/profile/Profile";
import { SubTitle } from "../stories/SubTitle";
import { ThumbnailGrid } from "../stories/thumbnail/ThumbnailGrid";
import { Title } from "../stories/Title";

const Container = styled.div`
  height: 100%;
`;

const Banner = styled.img`
  /* width: 100%; */
  height: 30vh;
  margin-top: 100px;
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
`;
const Main = () => {
  const itemList = [
    {
      itemImageUrl:
        "https://littledeep.com/wp-content/uploads/2020/02/littledeep_squirrel_style1.png",
      itemTitle: "다람쥐1",
      authorName: "이성재",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
    {
      itemImageUrl:
        "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
      itemTitle: "다람쥐2",
      authorName: "주비스",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
    {
      itemImageUrl:
        "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
      itemTitle: "다람쥐3",
      authorName: "이성재이성재이성재이성재이성재이성재이성재",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
    {
      itemImageUrl:
        "https://ww.namu.la/s/eac71acc34e222bd691c5f8e0ad2450976cfb81af259569252f2dfbd83d2aca1b9e3f4fb4a26d42da46ce2c802a125b24aee7f3b4fa419dca2d33f8cfcf053f1b822d3f2ef26a4b7cf6440c4291e34ba",
      itemTitle: "다람쥐4",
      authorName: "이성재이성재이성재이성재이성재이성재이성재",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
    {
      itemImageUrl:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/09/urbanbrush-20190902130111743623.png",
      itemTitle: "토리토리도토리",
      authorName: "이성재이성재이성재이성재이성재이성재이성재",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
    {
      itemImageUrl:
        "https://blog.kakaocdn.net/dn/bpj8Kc/btqCFxz4xFK/kpUTKlADoZxWjnGhHslje1/img.png",
      itemTitle: "다람쥐6",
      authorName: "John Doe",
      size: "14rem",
      onClick: () => {
        console.log("clicked!");
      },
    },
  ];
  const profileList = [
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
    {
      profileImgUrl:
        "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
      profileNickname: "주비스",
      profileLevel: "Lv.2 꼬맹이도토리",
      size: "72px",
    },
  ];
  return (
    <Container>
      <Banner src={banner1} />

      <NFTContainer>
        <Title label="Popular NFTs" size="4rem" />
        <SubTitle label="지금 이 시각 가장 활발한 창작물" />
        <ThumbnailGrid itemList={itemList} size="48rem" columnCount={3} />
        <Link to="/list">
          <SubTitle label="&gt; 더 많은 작품 보러 가기"></SubTitle>
        </Link>
      </NFTContainer>

      <NFTContainer>
        <Title label="Top Artists" size="4rem" />
        <SubTitle label="지금 이 시각 가장 주목받는 작가" />
        <GridContainer>
          {profileList.map((profile) => (
            <Profile
              profileImgUrl={profile.profileImgUrl}
              profileNickname={profile.profileNickname}
              profileLevel={profile.profileLevel}
              size={profile.size}
            />
          ))}
        </GridContainer>
      </NFTContainer>
    </Container>
  );
};

export default Main;
