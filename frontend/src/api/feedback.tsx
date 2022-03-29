import { api } from "./api";

export type createParams = {
  description: string;
  imgUrl?: string;
  questioner: string;
  respondent: string;
  tokenId: number | undefined;
};

export type createAnswer = {
  articleNo: number | undefined;
  description: string;
  imgUrl?: string;
  writer: string;
};
export const createFeedback = async (params: createParams) => {
  return await api.post("/api/feedbacks", params);
};

export const getFeedBack = async (articleNo?: string) => {
  return await api.get(`/api/feedbacks/detail/${articleNo}`);
};

export const createAnswer = async (params: createAnswer) => {
  return await api.post("/api/feedbacks/answer", params);
};
