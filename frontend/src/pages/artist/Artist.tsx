import React from "react";
import { Outlet } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";

const Artist = () => {
  const dummyProfile = {
    address: '0x47812323402031171223',
    nickname: '주비스',
    description: '안녕하세요? 반갑습니다?',
    acorn: 3,
    profile_img_url: ''
  }
  return (
    <>
      <ProfileBanner
        profileImgUrl={dummyProfile.profile_img_url}
        profileNickname={dummyProfile.nickname}
        profileLevel='Lv.2 어린이 도토리'
        profileAddress={dummyProfile.address}
        profileDescription={dummyProfile.description}
        profileDotoriAmount={`${dummyProfile.acorn}`}
        size='10rem'
      ></ProfileBanner>
      <ArtistNav></ArtistNav>
      <Outlet />
    </>
  );
};

export default Artist;
