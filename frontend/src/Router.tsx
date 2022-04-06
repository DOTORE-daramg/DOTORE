import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Feedback from "./pages/feedback/Feedback";
import ChildList from "./pages/list/ChildList";
import ParentList from "./pages/list/ParentList";
import Main from "./pages/Main";
import ChildMinting from "./pages/minting/ChildMinting";
import ParentMinting from "./pages/minting/ParentMinting";
import Artist from "./pages/artist/Artist";
import OwnedNFTList from "./pages/artist/OwnedNFTList";
import AuthoredNFTList from "./pages/artist/AuthoredNFTList";
import { Header } from "./stories/nav/Header";
import TxHistory from "./pages/artist/TxHistory";
import Download from "./pages/artist/Download";
import Like from "./pages/artist/Like";
import Detail from "./pages/Detail";
import FeedbackList from "./pages/artist/FeedbackList";
import FeedbackCreate from "./pages/feedback/FeedbackCreate";
import { Footer } from "./stories/footer/Footer";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { getUserInfo, login } from "./api/user";
import { useRecoilState } from "recoil";
import {
  isLoggedInState,
  isLoggedInTypes,
  userInfoState,
  userInfoTypes,
} from ".";
import List from "./pages/list/List";
import { web3 } from "./contracts";
import ScrollToTop from "./utils/ScrollToTop";
import { errorAlert, successAlert } from "./stories/common/alert";
const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 200px;
  position: relative;
  footer {
    height: 200px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`;

const AppRouter = () => {
  const { account, activate, deactivate } = useWeb3React();
  const [isLoggedIn, setIsLoggedIn] =
    useRecoilState<isLoggedInTypes>(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState<userInfoTypes>(userInfoState);
  const [address, setAddress] = useState<string>();

  // 메타마스크, 페이지 모두 로그인 안돼있는 경우 => 로그인 버튼 눌러서 연결해줘야됨
  // 메타마스크만 로그인 돼있는 경우
  // 껏다가 다시 들어오면 메타마스크는 로그인 돼있으니까 새로고침 하면 account = undefined
  // 리코일에 저장이 돼있으니까 isLoggedIn = true
  // 계정을 바꾸면 activate가 안돼있으니까 account 안생김
  // activate를 항상 활성화 하자니 지맘대로 로그인돼
  // 메타마스크는 로그인 안했는데 우리사이트는 로그인 돼있는 경우 리코일에 저장돼있으면 메타마스크랑 상관없이 로그인돼있어요
  // 민팅 리코일에 저장돼있는 userinfo를 가져다 쓰니까
  // 로그인 시나리오
  // 1 세션에 저장된 address가 존재하는지 확인
  // 2.1 존재한다면 해당 address로 connect를 시도하여 account가 일치하는지 확인
  // 3 account가 일치한다면 로그인을 시도하여 userInfo를 받아와 전역에 저장
  // 2.2 존재하지 않는다면 로그인 시도 안함

  // 계정 주소가 변하면 실행

  const getAccount = async () => {
    return await web3.eth.getAccounts();
  };

  useEffect(() => {
    if (account)
      getAccount().then((response) => {
        setAddress(response[0]);
        login(response[0])
          .then(() => {
            getUserInfo(response[0]).then((res) => {
              const data = res.data;
              setUserInfo({
                address: data.address,
                acorn: data.acorn,
                description: data.description,
                nickname: data.nickname,
                profileImgUrl: data.profileImgUrl,
              });
              setIsLoggedIn({
                isLoggedIn: true,
              });
            });
          })
          .catch(() => {
            errorAlert("로그인에 실패하였습니다.");
          });
      });
  }, [account]);

  useEffect(() => {
    if (userInfo.address)
      activate(injected, (e) => {
        if (
          e.message === "No Ethereum provider was found on window.ethereum."
        ) {
          window.open("https://metamask.io/download.html");
        }
      });
  }, []);

  const onLogin = async () => {
    await activate(injected, (e) => {
      if (e.message === "No Ethereum provider was found on window.ethereum.") {
        window.open("https://metamask.io/download.html");
      }
    });
  };

  const onLogout = () => {
    deactivate();
    setIsLoggedIn({
      isLoggedIn: false,
    });
    setUserInfo({
      address: "",
      acorn: 0,
      description: "",
      nickname: "",
      profileImgUrl: "",
    });
    errorAlert("로그아웃 하였습니다.");
    window.location.replace("https://j6a407.p.ssafy.io");
  };

  return (
    <Container>
      <Router>
        {/* <ScrollToTop /> */}
        <Header
          isLoggedIn={isLoggedIn.isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="prminting" element={<ParentMinting />} />
          <Route path="cdminting" element={<ChildMinting />} />

          <Route path="list" element={<List />} />
          <Route path="prlist" element={<ParentList />} />
          <Route path="cdlist" element={<ChildList />} />

          <Route path="detail/:tokenId" element={<Detail />} />

          <Route path="feedbackcreate/:tokenId" element={<FeedbackCreate />} />

          <Route path="artist/:userAddress" element={<Artist />}>
            <Route path="ownednft" element={<OwnedNFTList />} />
            <Route path="authorednft" element={<AuthoredNFTList />} />
            <Route path="feedback" element={<FeedbackList />} />
            <Route path="history" element={<TxHistory />} />
            <Route path="download" element={<Download />} />
            <Route path="like" element={<Like />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>

          <Route path="feedback/:tokenId/:articleNo" element={<Feedback />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
};

export default AppRouter;
