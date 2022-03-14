import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Main from "./pages/Main";
import { Header } from "./stories/Header";

const Dotori = styled.div`
  font-size: 10rem;
`;

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
