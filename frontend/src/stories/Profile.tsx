// Profile.tsx 
import React from 'react';
import styled from "styled-components";
import { ProfileImg } from './ProfileImg';

const ProfileContainer = styled.div`
    color: pink;
    font-family: "SUIT", sans-serif;
    font-weight: 600;
    border: 2px;
    border-color: black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
    justify-content: left;
    padding-left: 8vw;
    }
`;

const ProfileImage = styled.div``;
const StyledProfileImg = styled.img<{ size: string }>`
    border: 2px;
    border-radius: 400px;
    width: ${props => props.size};
    height: ${props => props.size};
`;

const ProfileDescription = styled.div`
    display: flex;
    color: white;
    justify-items: center;
`;

// const StyledProfileImg = styled.img`

// `;

const StyledProfileNickname = styled.span`
    color: black;
`;

const StyledProfileLevel = styled.span`
    color: black;
`;

interface ProfileProps {
    children?: React.ReactElement | string;
    profileImgUrl: string;
    profileNickname: string;
    profileLevel: string;
    size?: "small" | "medium" | "large";
    onClick?: () => void;
}

interface ProfileImgProps {
    size: string;
    profileImgUrl: string;
}

function Profile({
    children,
    //profileImgUrl,
    profileNickname,
    profileLevel,
    ...props
}: ProfileProps, {
    size,
    profileImgUrl,
}: ProfileImgProps) {
    return (
        <ProfileContainer>
            <StyledProfileImg size={size} src={profileImgUrl}>

            </StyledProfileImg>
            {/* {children} */}
            {/* <StyledProfileImg src={profileImgUrl} alt="profile" /> */}
            {/* <ProfileImg /> */}
            <StyledProfileNickname>{profileNickname}</StyledProfileNickname>
            <StyledProfileLevel>{profileLevel}</StyledProfileLevel>
        </ProfileContainer>
    )
}

export default Profile;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              