import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { ProfileUpdateModal } from "../../stories/artist/ProfileUpdateModal";
import { getUserInfo } from "../../api/user";

const Artist = () => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);
  const setUserInfo = useSetRecoilState<userInfoTypes>(userInfoState);
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
  }, []);
  return (
    <>
      {isModalShow && (
        <ProfileUpdateModal
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          onClickToggleModal={onClickToggleModal}
        ></ProfileUpdateModal>
      )}
      {artistInfo && (
        <ProfileBanner
          profileImgUrl={artistInfo.profile_img_url}
          profileNickname={artistInfo.nickname}
          profileLevel="Lv.2 어린이 도토리"
          profileAddress={artistInfo.address}
          profileDescription={artistInfo.description}
          profileDotoriAmount={`${artistInfo.acorn}`}
          onClickToggleModal={onClickToggleModal}
        ></ProfileBanner>
      )}
      <ArtistNav></ArtistNav>
      <Outlet />
    </>
  );
};

export default Artist;
