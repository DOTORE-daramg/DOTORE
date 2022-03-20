import React from "react";
import styled from "styled-components";

const MenuItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  /* color: black; */
  color: ${props => props.isSelected ? '#6667AB' : 'black'};
  font-weight: ${props => props.isSelected ? '800' : '500'};
  background-color: ${props => props.isSelected ? '#ffffff' : 'rgba(0, 0, 0, 0)'};
  font-style: Medium;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  cursor: pointer;
  /* width: 134px; */
  height: 50px;
  left: 349px;
  top: 396px;
  border-radius: 10px 10px 0px 0px;
`;

type ArtistNavMenuId = 'ownednft' | 'authorednft' | 'feedback' | 'history' | 'download' | 'like';

export interface ArtistNavMenuProps {
  id: ArtistNavMenuId;
  label: string;
  isSelected: boolean; // true면 흰배경 + 글씨색
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const ArtistNavMenu = ({
  id,
  label,
  onClick,
  ...props
}: ArtistNavMenuProps) => {
  return (
    <MenuItem
      {...props}
      isSelected={props.isSelected}
      onClick={onClick}
    >
      <span>{label}</span>
    </MenuItem>
  )
};
