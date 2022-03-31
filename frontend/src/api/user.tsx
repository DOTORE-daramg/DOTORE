import { api } from "./api";

export const login = async (address: string) => {
  console.log(address);
  return await api.post(`/api/user/login/${address}`);
};

export const getUserInfo = async (address: string) => {
  return await api.get(`/api/mypage/${address}`);
};

export const getUsers = async () => {
  return await api.get(`/api/user`);
};

export const updateDesc = async (address: string, description: string) => {
  return await api.patch(`/api/mypage/desc`, { address, description });
};

export const updateNickname = async (address: string, nickname: string) => {
  return await api.patch(`/api/mypage/nickname`, { address, nickname });
};

export const updateImage = async (address: string, data: FormData) => {
  return await api.patch(`/api/mypage/img`, { address, data });
};
