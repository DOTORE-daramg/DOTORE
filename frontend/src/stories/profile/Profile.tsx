// Profile.tsx
import React from "react";
import styled from "styled-components";
import { ProfileImg } from "./ProfileImg";
import { ProfileLevel } from "./ProfileLevel";
import { ProfileNickname } from "./ProfileNickname";

const ProfileContainer = styled.div`
  font-family: "SUIT", sans-serif;
  font-weight: 600;
  /* border: solid 2px; */
  border-color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 233.33px;
  height: 104px;
  padding-left: 0px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 768px) {
    justify-content: left;
    padding-left: 3vw;
    font-size: 0.8rem;
  }
`;

const ProfileImage = styled.img``;

// const StyledProfileImg = styled.img<{ size: string }>`
//     border: 2px;
//     border-radius: 400px;
//     width: ${props => props.size};
//     height: ${props => props.size};
// `;
const StyledProfileImgContainer = styled.div`
  margin: 16px;
`;

const ProfileDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* color: white; */
  justify-items: center;
  margin-right: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

// const StyledProfileImg = styled.img`

// `;
interface ProfileProps {
  // children?: React.ReactElement | string;
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  size: string;
  onClick?: () => void;
}

interface ProfileImgProps {
  size: string;
  profileImgUrl: string;
}

function Profile({
  // children,
  profileImgUrl,
  profileNickname,
  profileLevel,
  size,
  onClick,
  ...props
}: ProfileProps) {
  return (
    <ProfileContainer onClick={onClick}>
      {/* <StyledProfileImg size={size} src={profileImgUrl} /> */}
      {/* {children} */}
      {/* <StyledProfileImg src={profileImgUrl} alt="profile" /> */}
      <StyledProfileImgContainer>
        <ProfileImg size={size} profileImgUrl={profileImgUrl} />
      </StyledProfileImgContainer>
      <ProfileDescriptionContainer>
        <ProfileNickname nickname={profileNickname} />
        <ProfileLevel profileLevel={profileLevel} />
      </ProfileDescriptionContainer>
    </ProfileContainer>
  );
}

export default Profile;
