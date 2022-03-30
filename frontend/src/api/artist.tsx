import { api } from "./api";

export const getNFTList = async (address: string) => {
  console.log(address);
  return await api.get(`/api/mypage/owner/${address}`);
};
