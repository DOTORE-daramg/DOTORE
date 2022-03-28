import React, { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArtistNavMenu } from "./ArtistNavMenu";

const Nav = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  background: rgba(102, 103, 171, 0.1);
  @media screen and (max-width: 500px) {
    /* padding: 2vh; */
    justify-content: center;
    height: 2.6rem;
  }
`;

export const ArtistNav = () => {
  const [selectedTab, setSelectedTab] = useState('ownednft');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(selectedTab);
  }, [selectedTab, navigate]);
  return (
    <Nav>
      <ArtistNavMenu
        id='ownednft'
        label="나의 NFT"
        isSelected={selectedTab === 'ownednft'}
        onClick={() => {
          setSelectedTab('ownednft')
        }}
      />
      <ArtistNavMenu
        id='authorednft'
        label="창작물"
        isSelected={selectedTab === 'authorednft'}
        onClick={() => {
          setSelectedTab('authorednft')
        }}
      />
      <ArtistNavMenu
        id='history'
        label="거래 내역"
        isSelected={selectedTab === 'history'}
        onClick={() => {
          setSelectedTab('history')
        }}
      />
      <ArtistNavMenu
        id='feedback'
        label="피드백"
        isSelected={selectedTab === 'feedback'}
        onClick={() => {
          setSelectedTab('feedback')
        }}
      />
      <ArtistNavMenu
        id='download'
        label="다운로드"
        isSelected={selectedTab === 'download'}
        onClick={() => {
          setSelectedTab('download')
        }}
      />
      <ArtistNavMenu
        id='like'
        label="좋아요"
        isSelected={selectedTab === 'like'}
        onClick={() => {
          setSelectedTab('like')
        }}
      />
    </Nav>
  );
};
