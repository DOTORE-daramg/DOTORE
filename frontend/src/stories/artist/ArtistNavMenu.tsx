import React from 'react';
import styled from "styled-components";

const MenuItem = styled.div`
    display: flex;
    color: #6667AB;
    /* color: black; */
    font-style: normal;
    font-weight: 800;
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
    background: #FFFFFF;
    /* background: #fffdf7; */
    border-radius: 10px 10px 0px 0px;
    /* span {
        margin-left: 30px;
        margin-right: 30px;
    } */
`;

export interface ArtistNavMenuProps {
    label: string;
    isSelected: boolean;    // true면 흰배경 + 글씨색
    onClick?: () => void;
}

export const ArtistNavMenu = ({
    label,
    isSelected,
    ...props
}: ArtistNavMenuProps) => {
    return (
        <MenuItem {...props}>
            <span>{label}</span>
        </MenuItem>
    );
};