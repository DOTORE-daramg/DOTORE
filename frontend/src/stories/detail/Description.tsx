import React from "react";
import styled from "styled-components";
import { HorizonProfile } from "../profile/HorizonProfile";
import { Title } from "./Title";

const DescriptionContainer = styled.div`
  @media screen and (max-width: 1024px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 300px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  margin: 20px 0 20px 0;
`;

const StyledDescription = styled.div`
  line-height: 30px;
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
