import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  /* color: white; */
  width: 100vw;
  height: 100vh;
  min-width: 0;
  position: fixed;
  z-index: 10;
  overflow: hidden;
`;

const SideNav = styled(motion.nav)`
  display: flex;
  position: relative;
  min-width: 0;
  flex-basis: 400px;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  transform: translateX(-100%);
  line-height: 2;
`;

const Links = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  padding-top: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }

  a {
    color: black;
    text-decoration: none;
  }
  #sub {
    padding-left: 20px;
  }
`;
type mobileNavProps = {
  isOpen: boolean;
  onClick: () => void;
};
export const MobileMenu = ({ isOpen, onClick }: mobileNavProps) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <Container>
      <SideNav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <Links>
          <li>
            <a href="#">NFT 등록</a>
            <a id="sub">1차 NFT 등록</a>
            <a id="sub">2차 NFT 등록</a>
          </li>
          <li>
            <a href="#">NFT 보기</a>
            <a id="sub">view all</a>
            <a id="sub">1차 NFT 보기</a>
            <a id="sub">2차 NFT 보기</a>
          </li>
          <li>
            <a href="#">NFT 구매</a>
          </li>
          <li>
            <a href="#">마이페이지</a>
          </li>
        </Links>
        <Links>
          <li>
            <a>로그아웃</a>
          </li>
        </Links>
      </SideNav>
    </Container>
  );
};
