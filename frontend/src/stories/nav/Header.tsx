import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { Logo } from "../common/Logo";
import { NavMenu } from "./NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { MobileMenu } from "./MobileMenu";

const Wrapper = styled.div`
  padding: 15px 10vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6667ab;
  background-color: rgba(102, 103, 171, 0.06);
  @media screen and (max-width: 768px) {
    padding: 2vh;
    justify-content: center;
  }
`;

const Hamburger = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    left: 1.5rem;
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
  vertical-align: top;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  margin-right: 48px;
`;

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
  user,
  isLoggedIn,
  onLogin,
  onLogout,
}: HeaderProps) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickHamburger = () => {
    setIsOpen((prev) => !prev);
    console.log("click");
  };
  return (
    <>
      <header>
        <Wrapper>
          <Hamburger onClick={onClickHamburger}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Hamburger>
          <LogoWrapper onClick={() => navigate("/")}>
            <Logo color="#6667ab" size="2rem" />
            <Title>DOTORE</Title>
          </LogoWrapper>
          <RightWrapper>
            <MenuWrapper>
              <NavMenu
                label="NFT 등록"
                dropdown={["1차 NFT 등록", "2차 NFT 등록"]}
                link={["/prminting", "/cdminting"]}
              />
              <NavMenu
                label="NFT 보기"
                dropdown={["view all", "1차 NFT 보기", "2차 NFT 보기"]}
                link={["/list", "/prlist", "/cdlist"]}
              />
              <NavMenu label="NFT 구매" onClick={() => navigate("/sell")} />
              {isLoggedIn && (
                <NavMenu
                  label="마이페이지"
                  onClick={() => navigate(`/artist/${userInfo.address}`)}
                />
              )}
            </MenuWrapper>
            {isLoggedIn ? (
              <>
                <Button
                  width="6rem"
                  onClick={onLogout}
                  label="로그아웃"
                  backgroundColor="#6667ab"
                />
              </>
            ) : (
              <>
                <Button
                  width="6rem"
                  onClick={onLogin}
                  label="로그인"
                  backgroundColor="#6667ab"
                />
              </>
            )}
          </RightWrapper>
        </Wrapper>
      </header>
      <MobileMenu isOpen={isOpen} onClick={onClickHamburger} />
    </>
  );
};
