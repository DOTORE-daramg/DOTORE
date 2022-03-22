import React from "react";
import { Outlet } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import { useRecoilValue } from 'recoil';
import { userInfoState, userInfoTypes } from '../..';

const Artist = () => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  console.log(userInfo);

  return (
    <>
      <ProfileBanner
        profileImgUrl={userInfo.profile_img_url}
        profileNickname={userInfo.nickname}
        profileLevel='Lv.2 어린이 도토리'
        profileAddress={userInfo.address}
        profileDescription={userInfo.description}
        profileDotoriAmount={`${userInfo.acorn}`}
      ></ProfileBanner>
      <ArtistNav></ArtistNav>
      <Outlet />
    </>
  );
};

export default Artist;
