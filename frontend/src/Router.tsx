import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feedback from "./pages/Feedback";
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
import { Footer } from "./stories/footer/Footer";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { login } from "./api/user";

const Container = styled.div`
  min-height: 100%;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    connector,
    library,
    chainId,
    account,
    active,
    error,
    activate,
    deactivate,
  } = useWeb3React();

  useEffect(() => {
    console.log(account);
    if (account) {
      login(account).then(() => {
        setIsLoggedIn(true);
      });
    }
  }, [account]);

  const onLogin = () => {
    activate(injected, (e) => {
      if (e.message === "No Ethereum provider was found on window.ethereum.") {
        window.open("https://metamask.io/download.html");
      }
    });
  };

  const onLogout = () => {
    deactivate();
    setIsLoggedIn(false);
  };
  return (
    <Container>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
          onCreateAccount={() => console.log("login")}
        />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="prminting" element={<ParentMinting />} />
          <Route path="cdminting" element={<ChildMinting />} />

          <Route path="prlist" element={<ParentList />} />
          <Route path="cdlist" element={<ChildList />} />

          <Route path="detail/:tokenId" element={<Detail />} />

          <Route path="artist/:userAddress" element={<Artist />}>
            <Route path="ownednft" element={<OwnedNFTList />} />
            <Route path="authorednft" element={<AuthoredNFTList />} />
            <Route path="feedback" element={<FeedbackList />} />
            <Route path="history" element={<TxHistory />} />
            <Route path="download" element={<Download />} />
            <Route path="like" element={<Like />} />
          </Route>

          <Route path="feedback/:articleNo" element={<Feedback />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
};

export default AppRouter;
