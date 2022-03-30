import { api } from "./api";

export const getNFTList = async (address: string) => {
  return await api.get(`/api/mypage/owner/${address}`);
};

export const getAuthoredNFTList = async (address: string) => {
  return await api.get(`/api/mypage/author/${address}`);
};

export const getResFeedbacks = async (address: string) => {
  return await api.post(`/api/mypage/response/${address}`);
};

export const getReqFeedbacks = async (address: string) => {
  return await api.post(`/api/mypage/request/${address}`);
};

export const getLikedNFTList = async (address: string) => {
  return await api.get(`/api/mypage/like/${address}`);
};
