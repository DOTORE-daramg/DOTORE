import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

function getLibrary(provide: ExternalProvider) {
  const library = new Web3Provider(provide, "any");
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
