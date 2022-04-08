import React from "react";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import { ProfileImg } from "../profile/ProfileImg";
import dicon from "../assets/mypage/default-dotori-icon.png";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";

// Banner Container ============================================
const BannerContainer = styled.div`
  width: 100%;
  height: 20rem;
  background: rgba(102, 103, 171, 0.1);
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  @media screen and (max-width: 768px) {
    height: 23rem;
    padding-top: 2rem;
  }
`;

// Profile Container ============================================
const ProfileContainer = styled.div`
  width: 45rem;
  display: flex;
  height: 100%;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 35rem;
  }
  @media screen and (max-width: 500px) {
    width: 24rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

// Profile Container - ImgContainer =================
const ProfileImgContainer = styled.div`
  display: flex;
  /* margin: 16px; */
  margin-right: 4rem;
  border-radius: 400px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 500px) {
    /* width: 100%; */
    margin: 1rem 0;
    justify-content: center;
  }
`;

// Profile Container - DescriptionContainer =========
const ProfileDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileDescriptionContainerTop = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-left: 1rem;
  }
`;
const ProfileNickname = styled.span`
  font-size: 1.4rem;
  color: #000000;
  font-weight: 700;
  margin-right: 1.5rem;
`;
const ProfileLevel = styled.span`
  font-size: 0.8rem;
  color: #4b4b4b;
  font-weight: 400;
`;
const ProfileDescriptionContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileAddress = styled.span`
  font-size: 0.8rem;
  color: #959595;
  font-weight: 500;
  margin-top: 1rem;
`;
const ProfileDescription = styled.span`
  font-size: 1rem;
  color: #4b4b4b;
  font-weight: 500;
  margin-top: 1rem;
`;
const ProfileDotoriAmount = styled.div`
  font-size: 1rem;
  color: #515151;
  font-weight: 600;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  img {
    width: 1.4rem;
    height: 1.6rem;
    margin-right: 3px;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
    img {
      width: 1.2rem;
      height: 1.4rem;
      margin-right: 3px;
    }
  }
`;

export interface ProfileBannerProps {
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  profileAddress: string;
  profileDescription: string;
  profileDotoriAmount: string;
  onClickToggleModal?: () => void;
}

export const ProfileBanner = ({
  profileImgUrl,
  profileNickname,
  profileLevel,
  profileAddress,
  profileDescription,
  profileDotoriAmount,
  onClickToggleModal,
}: ProfileBannerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  return (
    <BannerContainer>
      <ProfileContainer>
        <ProfileImgContainer>
          <ProfileImg
            size={isMobile ? "8rem" : "10rem"}
            profileImgUrl={profileImgUrl}
          />
        </ProfileImgContainer>
        <ProfileDescriptionContainer>
          <ProfileDescriptionContainerTop>
            <ProfileNickname>{profileNickname}</ProfileNickname>
            <ProfileLevel>{profileLevel}</ProfileLevel>
            {userInfo.address === profileAddress && (
              <div onClick={onClickToggleModal}>
                <Icon mode="fas" icon="pencil" color="#959595"></Icon>
              </div>
            )}
          </ProfileDescriptionContainerTop>
          <ProfileDescriptionContainerBottom>
            <ProfileAddress>{profileAddress}</ProfileAddress>
            {profileDescription ? (
              <ProfileDescription>{profileDescription}</ProfileDescription>
            ) : (
              <ProfileDescription>
                아직 작성된 한줄 소개가 없습니다.
              </ProfileDescription>
            )}
            <ProfileDotoriAmount>
              <img src={dicon} alt="dicon" />
              {profileDotoriAmount}
            </ProfileDotoriAmount>
          </ProfileDescriptionContainerBottom>
        </ProfileDescriptionContainer>
      </ProfileContainer>
    </BannerContainer>
  );
};
