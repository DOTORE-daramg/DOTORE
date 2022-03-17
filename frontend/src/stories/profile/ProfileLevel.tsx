import React from "react";
import styled from "styled-components";

const StyledProfileLevel = styled.span`
  font-size: 14px;
  color: #8393af;
  font-weight: 400;
`;

interface ProfileLevelProps {
  profileLevel: string;
}

export const ProfileLevel = ({ profileLevel }: ProfileLevelProps) => {
  return <StyledProfileLevel>{profileLevel}</StyledProfileLevel>;
};
