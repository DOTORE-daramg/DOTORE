import React from 'react';
import styled from "styled-components";
import { ProfileImg } from '../profile/ProfileImg';
import dicon from '../assets/mypage/default-dotori-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

// Banner Container ============================================
const BannerContainer = styled.div`
  /* width: 1440px; */
  /* height: 100%; */
  /* position: absolute; */
  width: 100%;
  /* height: 353px; 353-59 = 294 */
  height: 294px;
  /* left: 0px;
  top: 92px; */
  background: rgba(102, 103, 171, 0.1);
  display: flex;
  justify-content: center;
`;

// Profile Container ============================================
const ProfileContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

// Profile Container - ImgContainer =================
const ProfileImgContainer = styled.div`
  display: flex;
  /* margin: 16px; */
  margin-right: 62px;
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
      color: #959595;
      margin-left: 12px;
  }
`;
const ProfileNickname = styled.span`
  font-size: 20px;
  color: #000000;
  font-weight: 700;
  margin-right: 22px;
`;
const ProfileLevel = styled.span`
  font-size: 14px;
  color: #4B4B4B;
  font-weight: 400;
`;
const ProfileDescriptionContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileAddress = styled.span`
  font-size: 14px;
  color: #959595;
  font-weight: 500;
  margin-top: 16px;
`;
const ProfileDescription = styled.span`
  font-size: 16px;
  color: #4B4B4B;
  font-weight: 500;
  margin-top: 16px;
`;
const ProfileDotoriAmount = styled.div`
  font-size: 16px;
  color: #515151;
  font-weight: 600;
  margin-top: 16px;
  display: flex;
  align-items: center;
  img {
    width: 22px;
    height: 26px;
    margin-right: 3px;
  }
`;

export interface ProfileBannerProps {
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  profileAddress: string;
  profileDescription: string;
  profileDotoriAmount: string;
  size: string;
  onClick?: () => void;
}

export const ProfileBanner = ({
  profileImgUrl,
  profileNickname,
  profileLevel,
  profileAddress,
  profileDescription,
  profileDotoriAmount,
  size,
  ...props
}: ProfileBannerProps) => {
  return (
    <BannerContainer>
      <ProfileContainer>
        <ProfileImgContainer>
          <ProfileImg size={size} profileImgUrl={profileImgUrl} />
        </ProfileImgContainer>
        <ProfileDescriptionContainer>
          <ProfileDescriptionContainerTop>
            <ProfileNickname>{profileNickname}</ProfileNickname>
            <ProfileLevel>{profileLevel}</ProfileLevel>
            <FontAwesomeIcon icon={faPencil} />
          </ProfileDescriptionContainerTop>
          <ProfileDescriptionContainerBottom>
            <ProfileAddress>{profileAddress}</ProfileAddress>
            <ProfileDescription>{profileDescription}</ProfileDescription>
            <ProfileDotoriAmount><img src={dicon} alt='dicon' />{profileDotoriAmount}</ProfileDotoriAmount>
          </ProfileDescriptionContainerBottom>
        </ProfileDescriptionContainer>
      </ProfileContainer>
    </BannerContainer>
  );
};