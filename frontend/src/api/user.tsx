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
