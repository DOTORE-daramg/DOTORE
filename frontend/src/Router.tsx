import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feedback from "./pages/Feedback";
import ChildList from "./pages/list/ChildList";
import ParentList from "./pages/list/ParentList";
import Main from "./pages/Main";
import ChildMinting from "./pages/minting/ChildMinting";
import ParentMinting from "./pages/minting/ParentMinting";
import Artist from "./pages/artist/Artist";
import NFTList from "./pages/artist/NFTList";
import { Header } from "./stories/nav/Header";
import TxHistory from "./pages/artist/TxHistory";
import Download from "./pages/artist/Download";
import Like from "./pages/artist/Like";
import Detail from "./pages/Detail";
import FeedbackList from "./pages/artist/FeedbackList";
import { Footer } from "./stories/footer/Footer";
import styled from "styled-components";

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
  return (
    <Container>
      <Router>
        <Header
          isLoggedIn={false}
          onLogin={() => console.log("login")}
          onLogout={() => console.log("login")}
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
            <Route path="nft" element={<NFTList />} />
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
