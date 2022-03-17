import React from "react";
import styled from "styled-components";

const StyledProfileNickname = styled.span`
  font-size: 20px;
  color: #6667ab;
  font-weight: 700;
`;

interface ProfileNicknameProps {
  nickname: string;
}

export const ProfileNickname = ({ nickname }: ProfileNicknameProps) => {
  return <StyledProfileNickname>{nickname}</StyledProfileNickname>;
};
