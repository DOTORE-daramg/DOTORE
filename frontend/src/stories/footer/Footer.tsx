import React from "react";
import styled from "styled-components";
import { Logo } from "../common/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterContainer = styled.footer`
  background-color: #6667ab;
  display: flex;
  font-family: "SUIT", sans-serif;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    justify-content: left;
    padding-left: 8vw;
  }
`;

const LogoContainer = styled.div`
  width: 40vw;
  margin-bottom: 1.5rem;
  display: flex;
  cursor: default;
  align-items: center;
  .name {
    font-size: 2rem;
    color: white;
    font-weight: 600;
  }
`;

const InfoContainer = styled.div``;

const Description = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  color: white;
  align-items: center;
  cursor: default;
  svg {
    color: white;
  }
  .title {
    margin-left: 0.3rem;
  }
  .desc {
    margin-left: 0.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.div`
  width: 15vw;
  min-width: 120px;
  max-width: 180px;
  color: white;
  text-align: center;
  .title {
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .item {
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
`;

export const Footer = () => (
  <FooterContainer>
    <InfoContainer>
      <LogoContainer>
        <Logo color="#ffffff" size="36px" />
        <div className="name">DOTORI</div>
      </LogoContainer>
      <Description>
        <FontAwesomeIcon icon={faPhone} />
        <div className="title">고객센터</div>
        <div className="desc">02-1544-9001</div>
      </Description>
      <Description>
        <FontAwesomeIcon icon={faEnvelope} />
        <div className="title">문의사항</div>
        <div className="desc">dotori@dotori.com</div>
      </Description>
    </InfoContainer>
    <Menu>
      <Item>
        <div className="title">NFT 등록</div>
        <div className="item">1차 NFT 등록</div>
        <div className="item">2차 NFT 등록</div>
      </Item>
      <Item>
        <div className="title">NFT 보기</div>
        <div className="item">View All</div>
        <div className="item">1차 NFT 보기</div>
        <div className="item">2차 NFT 보기</div>
      </Item>
      <Item>
        <div className="title">NFT 구매</div>
      </Item>
    </Menu>
  </FooterContainer>
);
