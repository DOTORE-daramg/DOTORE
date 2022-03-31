import React from "react";
import styled from "styled-components";
import dotori from "../../assets/feedback/sitting-dotori.png";

const Container = styled.div`
  width: 100vw;
  height: 500px;
  background-color: rgba(102, 103, 171, 0.3);
  margin-top: 60px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
  color: #585858;
  padding: 20%;
  line-height: 2;
  #name {
    font-weight: 800;
    font-size: 2.3rem;
    color: #6667ab;
  }
  #desc {
    font-size: 1rem;
    margin-top: 10px;
  }
  #em {
    color: #6667ab;
  }
  #last {
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;
const ImgContainer = styled.img`
  position: absolute;
  right: 20%;
  top: 11px;
  height: 480px;
  @media screen and (max-width: 1200px) {
    right: 50px;
  }
  @media screen and (max-width: 768px) {
    right: 30px;
    height: 280px;
  }
  @media screen and (max-width: 500px) {
    opacity: 0.5;
    right: 10px;
  }
`;
const Banner = () => {
  return (
    <Container>
      <Content>
        우리의 재능이 모여 새로운 가치가 되는 곳,<div id="name">도토리</div>
        <div id="desc">
          안녕하세요! <span id="em">도토리</span>에 오신 걸 환영해요.
          <br />
          <span id="em">도토리</span>는 재능 기부를 통한 2차 창작 지원 NFT
          플랫폼입니다. <br />
          도네이션 + 토큰 + 리메이크 / 레퍼런스의 줄임말로,
          <br />
          재능 기부를 통해 보다 더 많은 창작자들이 NFT 작품을 선보일 수 있게
          합니다. <br />
          <div id="last">그렇다면 이제 함께 도토리를 주우러 가 볼까요?</div>
        </div>
        <ImgContainer src={dotori}></ImgContainer>
      </Content>
    </Container>
  );
};

export default Banner;
