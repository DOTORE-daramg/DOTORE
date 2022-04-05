import React from "react";
import styled from "styled-components";

const StyledProfileLevel = styled.span<{ size?: string; color?: string }>`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  color: ${(props) => (props.color ? props.color : "#8393af")};
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface ProfileLevelProps {
  profileLevel: string;
  size?: string;
  color?: string;
}

export const ProfileLevel = ({
  profileLevel,
  size,
  color,
}: ProfileLevelProps) => {
  return (
    <StyledProfileLevel size={size} color={color}>
      {profileLevel}
    </StyledProfileLevel>
  );
};
