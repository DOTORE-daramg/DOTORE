import React from "react";
import styled from "styled-components";
import { ProfileImg } from "../profile/ProfileImg";
import { ProfileLevel } from "../profile/ProfileLevel";
import { ProfileNickname } from "../profile/ProfileNickname";
import { Title } from "./Title";

const DescriptionContainer = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0 30px 0;
`;
const StyledDescription = styled.div`
  line-height: 25px;
`;

interface DescriptionProps {
  title: string;
  descrition: string;
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  size: string;
}

export const Description = ({
  title,
  descrition,
  profileImgUrl,
  profileNickname,
  profileLevel,
  size,
}: DescriptionProps) => {
  return (
    <DescriptionContainer>
      <Title title={title} />
      <ProfileContainer>
        <ProfileImg size={size} profileImgUrl={profileImgUrl} />
        <ProfileLevel profileLevel={profileLevel} />
        <ProfileNickname nickname={profileNickname} />
      </ProfileContainer>
      <StyledDescription
        dangerouslySetInnerHTML={{ __html: descrition }}
      ></StyledDescription>
    </DescriptionContainer>
  );
};
