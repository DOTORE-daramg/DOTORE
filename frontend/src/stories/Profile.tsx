// Profile.tsx 
import React from 'react';
import styled from "styled-components";
import { ProfileImg } from './ProfileImg';

const StyledItem = styled.div`
    color: pink;
    font-family: "SUIT", sans-serif;
    font-weight: 600;
    border: 2px;
    border-color: black;
    border-radius: 10px;
    display: flex;
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

function Profile({
    children,
    profileImgUrl,
    profileNickname,
    profileLevel,
    size: "large",
    ...props
}: ProfileProps) {
    return (
        <StyledItem>
            {/* {children} */}
            {/* <StyledProfileImg src={profileImgUrl} alt="profile" /> */}
            <ProfileImg />
            <StyledProfileNickname>{profileNickname}</StyledProfileNickname>
            <StyledProfileLevel>{profileLevel}</StyledProfileLevel>
        </StyledItem>
    )
}

export default Profile;