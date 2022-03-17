import React from "react";
import styled from "styled-components";
import AppRouter from "./Router";
import GlobalStyles from "./shared/GlobalStyles";
import { Header } from "./stories/nav/Header";

const Dotori = styled.div`
  font-size: 10rem;
`;

function App() {
  return (
    <>
      <AppRouter />
      <GlobalStyles />
    </>
  );
}

export default App;
