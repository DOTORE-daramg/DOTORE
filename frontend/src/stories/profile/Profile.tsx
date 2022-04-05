// Profile.tsx
import React from "react";
import styled from "styled-components";
import { ProfileImg } from "./ProfileImg";
import { ProfileLevel } from "./ProfileLevel";
import { ProfileNickname } from "./ProfileNickname";
import { motion } from "framer-motion";

const ProfileContainer = styled(motion.div)`
  font-weight: 600;
  border-color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 16rem;
  height: 104px;
  padding-left: 0px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 19rem;
    justify-content: left;
  }
`;
const StyledProfileImgContainer = styled.div`
  margin: 16px;
`;

const ProfileDescriptionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px 0;
  margin-right: 16px;
`;

interface ProfileProps {
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  size: string;
  onClick?: () => void;
}

function Profile({
  profileImgUrl,
  profileNickname,
  profileLevel,
  size,
  onClick,
}: ProfileProps) {
  return (
    <ProfileContainer
      whileHover={{
        scale: 1.03,
      }}
      onClick={onClick}
    >
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
