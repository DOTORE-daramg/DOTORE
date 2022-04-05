import React from "react";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import { Logo } from "../common/Logo";

const FooterContainer = styled.footer`
  background-color: #6667ab;
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: left;
    padding-left: 8vw;
  }
`;

const LogoContainer = styled.div`
  width: 40vw;
  margin-bottom: 14px;
  display: flex;
  cursor: default;
  align-items: center;
  .name {
    font-size: 28px;
    color: white;
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoContainer = styled.div``;

const Description = styled.div`
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  color: white;
  align-items: center;
  cursor: default;
  font-size: 14px;
  svg {
    color: white;
    width: 16px;
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
    font-size: 1.1rem;
    font-weight: 600;
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
        <div className="name">DOTORE</div>
      </LogoContainer>
      <Description>
        <Icon mode="fas" icon="phone" />
        <div className="title">고객센터</div>
        <div className="desc">02-1544-9001</div>
      </Description>
      <Description>
        <Icon mode="fas" icon="envelope" />
        <div className="title">문의사항</div>
        <div className="desc">dotore@dotore.com</div>
      </Description>
      <Description>
        <Icon mode="fas" icon="laptop-code" />
        <div className="title">TEAM</div>
        <div className="desc">한지희 이성재 이호진 인주비 조영운 제진명</div>
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
