import React from "react";
import styled from "styled-components";
import { ProfileImg } from "./ProfileImg";
import { ProfileLevel } from "./ProfileLevel";
import { ProfileNickname } from "./ProfileNickname";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

interface HorizonProfileProps {
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  imgSize: string;
  levelSize: string;
  NicknameSize: string;
}

export const HorizonProfile = ({
  profileImgUrl,
  profileNickname,
  profileLevel,
  imgSize,
  levelSize,
  NicknameSize,
}: HorizonProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileImg size={imgSize} profileImgUrl={profileImgUrl} />
      <ProfileLevel
        profileLevel={profileLevel}
        color={"#4B4B4B"}
        size={levelSize}
      />
      <ProfileNickname
        nickname={profileNickname}
        color={"#4B4B4B"}
        size={NicknameSize}
      />
    </ProfileContainer>
  );
};
