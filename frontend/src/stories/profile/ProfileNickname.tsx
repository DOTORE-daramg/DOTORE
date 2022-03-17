import React from "react";
import styled from "styled-components";

const StyledProfileNickname = styled.span<{ size?: string; color?: string }>`
  font-size: ${(props) => (props.size ? props.size : "20px")};
  color: ${(props) => (props.color ? props.color : "#6667ab")};
  font-weight: 700;
`;

interface ProfileNicknameProps {
  nickname: string;
  size?: string;
  color?: string;
}

export const ProfileNickname = ({
  nickname,
  size,
  color,
}: ProfileNicknameProps) => {
  return (
    <StyledProfileNickname size={size} color={color}>
      {nickname}
    </StyledProfileNickname>
  );
};
