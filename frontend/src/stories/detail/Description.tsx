import React from "react";
import styled from "styled-components";
import { HorizonProfile } from "../profile/HorizonProfile";
import { Title } from "./Title";

const ProfileContainer = styled.div`
  margin: 20px 0 20px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0 20px 0;
  }
`;

const StyledDescription = styled.div`
  height: 30%;
  line-height: 30px;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
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
}: DescriptionProps) => {
  return (
    <>
      <Title title={title} />
      <ProfileContainer>
        <HorizonProfile
          profileImgUrl={profileImgUrl}
          imgSize="32px"
          NicknameSize="14px"
          levelSize="14px"
          profileLevel={profileLevel}
          profileNickname={profileNickname}
        />
      </ProfileContainer>
      <StyledDescription
        dangerouslySetInnerHTML={{ __html: descrition }}
      ></StyledDescription>
    </>
  );
};
