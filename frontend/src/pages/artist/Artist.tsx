import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import StyledPagination from "../../stories/common/StyledPagination";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { ProfileUpdateModal } from "../../stories/artist/ProfileUpdateModal";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";
import { getLevel } from "../../utils/Level";

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
  const [activePage, setActivePage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setActivePage(page);
  }

  useEffect(() => {
    if (userAddress) {
      getUserInfo(userAddress).then((res) => {
        console.log(res.data);
        setArtistInfo(res.data);
      });
    }
  }, [userAddress, userInfo]);

  return (
    <>
      {isModalShow && (
        <ProfileUpdateModal
          onClickToggleModal={onClickToggleModal}
        ></ProfileUpdateModal>
      )}
      {artistInfo && (
        <ProfileBanner
          profileImgUrl={artistInfo.profileImgUrl}
          profileNickname={artistInfo.nickname}
          profileLevel={getLevel(artistInfo.acorn)}
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
