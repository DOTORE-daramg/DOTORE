import React from 'react';
import styled from "styled-components";
import dicon from '../../assets/profile/default_dotori.png';

const StyledProfileImg = styled.img<{ size: string }>`
  border: 2px;
  border-radius: 400px;
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: #fff;
`;

export interface ProfileImgProps {
  size: string;
  profileImgUrl: string;
}

export const ProfileImg = ({
  size, 
  profileImgUrl,
}: ProfileImgProps) => {
  return (
    <StyledProfileImg size={size} src={profileImgUrl ? profileImgUrl : dicon }></StyledProfileImg>
  );
};

// export default ProfileImg;