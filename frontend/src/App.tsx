import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./shared/GlobalStyles";
import Main from "./pages/Main";
import { Header } from "./stories/nav/Header";

const Dotori = styled.div`
  font-size: 10rem;
`;

function App() {
  return (
    <>
      <Router>
        <Header
          isLoggedIn={false}
          onLogin={() => console.log("login")}
          onLogout={() => console.log("login")}
          onCreateAccount={() => console.log("login")}
        />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
