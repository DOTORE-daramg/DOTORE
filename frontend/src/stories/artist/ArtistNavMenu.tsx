import React from "react";
import styled from "styled-components";

const MenuItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  /* color: black; */
  color: ${props => props.isSelected ? '#6667AB' : 'black'};
  font-weight: ${props => props.isSelected ? '800' : '500'};
  background-color: ${props => props.isSelected ? '#ffffff' : 'rgba(0, 0, 0, 0)'};
  font-style: Medium;
  font-size: 1.2rem;
  line-height: 22px;
  text-align: center;
  align-items: center;
  justify-content: center;
  /* padding: 0 2rem; */
  cursor: pointer;
  width: 8rem;
  height: 100%;
  border-radius: 10px 10px 0px 0px;
  @media screen and (max-width: 768px) {
    width: 6rem;
    font-size: 1rem;
  }
  @media screen and (max-width: 500px) {
    width: 4rem;
    font-size: 0.8rem;
  }
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
