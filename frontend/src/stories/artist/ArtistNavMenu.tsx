import React from "react";
import styled from "styled-components";

const MenuItem = styled.div<{ background: string; isSelected: boolean; color: string }>`
  display: flex;
  color: ${(props) => props.color};
  /* color: black; */
  font-style: Medium;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
  /* width: 134px; */
  height: 50px;
  left: 349px;
  top: 396px;
  background: ${(props) => props.background};
  border-radius: 10px 10px 0px 0px;
`;

export interface ArtistNavMenuProps {
  label: string;
  isSelected: boolean; // true면 흰배경 + 글씨색
  background: string;
  color: string;
  onClick?: () => void;
}

export const ArtistNavMenu = ({ label, isSelected, background, color, ...props }: ArtistNavMenuProps) => {
  return (
    <MenuItem {...props} isSelected={isSelected} background={background} color={color}>
      <span>{label}</span>
    </MenuItem>
  );
};
