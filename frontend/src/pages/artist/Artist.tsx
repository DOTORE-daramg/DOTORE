import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ProfileBanner } from "../../stories/artist/ProfileBanner";
import { ArtistNav } from "../../stories/artist/ArtistNav";
import StyledPagination from "../../stories/common/StyledPagination";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { ProfileUpdateModal } from "../../stories/artist/ProfileUpdateModal";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";
import { getLevel } from "../../utils/Level";
import { errorAlert } from "../../stories/common/alert";

const Container = styled.div`
  padding: 30px 0px 70px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Artist = () => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);
  const [isModalShow, setIsModalShow] = useState(false);
  const { userAddress } = useParams();
  const [artistInfo, setArtistInfo] = useState<userInfoTypes>();
  const navigate = useNavigate();
  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
  };
  const [activePage, setActivePage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setActivePage(page);
  }

  useEffect(() => {
    if (userAddress) {
      getUserInfo(userAddress)
        .then((res) => {
          setArtistInfo(res.data);
        })
        .catch(() => {
          errorAlert("존재하지 않는 회원입니다.");
          navigate("/");
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
