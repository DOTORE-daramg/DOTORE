import React from 'react';
import styled from "styled-components";
import { ProfileImg } from './ProfileImg';
import Profile from './Profile';

// Banner Container =======================================
const BannerContainer = styled.div`
    /* width: 1440px; */
    /* height: 100%; */
    position: absolute;
    width: 100%;
    height: 353px;
    left: 0px;
    top: 92px;
    background: rgba(102, 103, 171, 0.1);
    display: flex;
    justify-content: center;
`;

// Profile Container ===============================================
const ProfileContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`;

// Profile Container - ImgContainer =================
const ProfileImgContainer = styled.div`
    display: flex;
    /* margin: 16px; */
`;
// const ProfileImage = styled.img``;

// Profile Container - DescriptionContainer =========
const ProfileDescriptionContainer = styled.div`
    display: flex;
`;
const ProfileNickname = styled.span`
    font-size: 20px;
    color: #6667AB;
    font-weight: 700;
`;
const ProfileLevel = styled.span`
    font-size: 14px;
    color: #8393AF;
    font-weight: 400;
`;

export interface ProfileBannerProps {
    profileImgUrl: string;
    profileNickname: string;
    profileLevel: string;
    size: string;
    onClick?: () => void;
}

export const ProfileBanner = ({
    profileImgUrl,
    profileNickname,
    profileLevel,
    size,
    ...props
}: ProfileBannerProps) => {
    return (
        <BannerContainer>
            {/* <Profile profileImgUrl={profileImgUrl} size={size} profileNickname={profileNickname} profileLevel={profileLevel} /> */}
            <ProfileContainer>
                <ProfileImgContainer>
                    <ProfileImg size={size} profileImgUrl={profileImgUrl} />
                </ProfileImgContainer>
                <ProfileDescriptionContainer>
                    <ProfileNickname>{profileNickname}</ProfileNickname>
                    <ProfileLevel>{profileLevel}</ProfileLevel>
                </ProfileDescriptionContainer>

            </ProfileContainer>
        </BannerContainer>
    );
};