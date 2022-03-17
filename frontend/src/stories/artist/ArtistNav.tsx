import React from 'react';
import styled from "styled-components";
import { NavMenu } from "@/stories/nav/NavMenu";

const Nav = styled.div`
    width: 100vw;
    height: 59px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(102, 103, 171, 0.1);
    @media screen and (max-width: 500px) {
        /* padding: 2vh; */
        justify-content: center;
    }
`;


export interface ArtistNavProps {

}

export const ArtistNav = ({

}: ArtistNavProps) => {
    return (
        <Nav>

        </Nav>
    );
};