import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { atom, RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import App from "./App";

const { persistAtom } = recoilPersist();

function getLibrary(provide: ExternalProvider) {
  const library = new Web3Provider(provide, "any");
  return library;
}

export interface isLoggedInTypes {
  isLoggedIn: boolean;
}

export const isLoggedInState = atom<isLoggedInTypes>({
  key: "isLoggedIn",

  default: {
    isLoggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export interface userInfoTypes {
  address: string;
  acorn: number;
  description: string;
  nickname: string;
  profileImgUrl: string;
}

export const userInfoState = atom<userInfoTypes>({
  key: "userInfoState",

  default: {
    address: "",
    acorn: 0,
    description: "",
    nickname: "",
    profileImgUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});

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
