import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import { useRecoilValue } from 'recoil';
import { userInfoState, userInfoTypes } from '../..';
import { ProfileUpdateModal } from "../../stories/artist/ProfileUpdateModal";

const Artist = () => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  console.log(userInfo);
  const [isModalShow, setIsModalShow] = useState(false);
  const onClickToggleModal  = () => {
    setIsModalShow(prev => !prev);
    console.log('toggle!')
  };
  return (
    <>
      {isModalShow && (
        <ProfileUpdateModal
          userInfo={userInfo}
          onClickToggleModal={onClickToggleModal}
        ></ProfileUpdateModal>
      )}
      <ProfileBanner
        profileImgUrl={userInfo.profile_img_url}
        profileNickname={userInfo.nickname}
        profileLevel='Lv.2 어린이 도토리'
        profileAddress={userInfo.address}
        profileDescription={userInfo.description}
        profileDotoriAmount={`${userInfo.acorn}`}
        onClickToggleModal={onClickToggleModal}
      ></ProfileBanner>
      <ArtistNav></ArtistNav>
      <Outlet />
    </>
  );
};

export default Artist;
