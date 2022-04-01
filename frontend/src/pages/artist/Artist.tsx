import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { ProfileUpdateModal } from "../../stories/artist/ProfileUpdateModal";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";

const Container = styled.div`
  padding: 30px 0px 70px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Artist = () => {
  const [userInfo, setUserInfo] = useRecoilState<userInfoTypes>(userInfoState);
  const [isModalShow, setIsModalShow] = useState(false);
  const { userAddress } = useParams();
  const [artistInfo, setArtistInfo] = useState<userInfoTypes>();
  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
    console.log("toggle!");
  };

  useEffect(() => {
    if (userAddress) {
      getUserInfo(userAddress).then((res) => {
        console.log(res.data);
        setArtistInfo(res.data);
      });
    }
  }, [userAddress, userInfo]);

  // useEffect(() => {
  //   if (artistInfo && userAddress === userInfo.address) {
  //     setUserInfo(artistInfo);
  //   }
  // }, [artistInfo]);

  return (
    <>
      {isModalShow && (
        <ProfileUpdateModal
          // userInfo={userInfo}
          // setUserInfo={setUserInfo}
          onClickToggleModal={onClickToggleModal}
        ></ProfileUpdateModal>
      )}
      {artistInfo && (
        <ProfileBanner
          profileImgUrl={artistInfo.profileImgUrl}
          profileNickname={artistInfo.nickname}
          profileLevel="Lv.2 어린이 도토리"
          profileAddress={artistInfo.address}
          profileDescription={artistInfo.description}
          profileDotoriAmount={`${artistInfo.acorn}`}
          onClickToggleModal={onClickToggleModal}
        ></ProfileBanner>
      )}
      <ArtistNav></ArtistNav>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Artist;
