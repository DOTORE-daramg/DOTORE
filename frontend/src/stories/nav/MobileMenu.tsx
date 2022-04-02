import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userInfoTypes } from "../..";

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  /* top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;
const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  /* color: white; */
  width: 80vw;
  height: 100vh;
  min-width: 0;
  position: fixed;
  z-index: ${(props) => (props.isOpen ? "10" : "-1")};
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
    margin-top: 10px;
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
  userInfo: userInfoTypes;
  isLoggedIn: boolean;
  isOpen: boolean;
  onClick: () => void;
  onLogin: () => void;
  onLogout: () => void;
};
export const MobileMenu = ({
  userInfo,
  isLoggedIn,
  isOpen,
  onClick,
  onLogin,
  onLogout,
}: mobileNavProps) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      {/* {isOpen && ( */}
      <Wrapper>
        <Container isOpen={isOpen}>
          <SideNav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
          >
            <Links>
              <li>
                <a>NFT 등록</a>
                <a href="/prminting" id="sub">
                  1차 NFT 등록
                </a>
                <a href="/cdminting" id="sub">
                  2차 NFT 등록
                </a>
              </li>
              <li>
                <a>NFT 보기</a>
                <a href="/list" id="sub">
                  view all
                </a>
                <a href="/prlist" id="sub">
                  1차 NFT 보기
                </a>
                <a href="/cdlist" id="sub">
                  2차 NFT 보기
                </a>
              </li>
              <li>
                <a href="/sell">NFT 구매</a>
              </li>
              <li>
                <a href={`/artist/${userInfo.address}`}>마이페이지</a>
              </li>
            </Links>
            <Links>
              <li>
                {isLoggedIn ? (
                  <div onClick={onLogout}>로그아웃</div>
                ) : (
                  <div onClick={onLogin}>로그인</div>
                )}
              </li>
            </Links>
          </SideNav>
        </Container>
        {isOpen && <Overlay onClick={onClick} />}
      </Wrapper>
      {/* )} */}
    </>
  );
};
