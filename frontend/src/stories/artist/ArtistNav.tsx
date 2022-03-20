import React from 'react';
import styled from "styled-components";
import { ArtistNavMenu } from "./ArtistNavMenu";

const Nav = styled.div`
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    background: rgba(102, 103, 171, 0.1);
    @media screen and (max-width: 500px) {
        /* padding: 2vh; */
        justify-content: center;
    }
`;


export interface ArtistNavProps {
    isSelected: boolean;
    background: string;
    onClickMenu: () => void;
}

export const ArtistNav = ({
    isSelected,
    onClickMenu,
}: ArtistNavProps) => {
    return (
        <Nav>
            <ArtistNavMenu
                label='나의 NFT'
                isSelected={true}
                background='white'
                color='#6667AB'
            />
            <ArtistNavMenu
                label='창작물'
                isSelected={false}
                background='none'
                color='black'
            />
            <ArtistNavMenu
                label='거래 내역'
                isSelected={false}
                background='none'
                color='black'
            />
            <ArtistNavMenu
                label='피드백'
                isSelected={false}
                background='none'
                color='black'
            />
            <ArtistNavMenu
                label='다운로드'
                isSelected={false}
                background='none'
                color='black'
            />
            <ArtistNavMenu
                label='좋아요'
                isSelected={false}
                background='none'
                color='black'
            />
        </Nav>
    );
};