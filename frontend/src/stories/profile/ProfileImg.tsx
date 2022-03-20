import React from 'react';
import styled from "styled-components";

const StyledProfileImg = styled.img<{ size: string }>`
    border: 2px;
    border-radius: 400px;
    width: ${props => props.size};
    height: ${props => props.size};
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
        <StyledProfileImg size={size} src={profileImgUrl}>

        </StyledProfileImg>
    );
};

// export default ProfileImg;