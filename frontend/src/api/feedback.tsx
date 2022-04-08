import { api } from "./api";

export type createParams = {
  description: string;
  imgUrl?: string;
  questioner: string;
  respondent: string;
  tokenId: number | undefined;
};

export type createAnswerType = {
  articleno: number | undefined;
  description: string;
  imgUrl?: string;
  writer: string;
};

export type updateAnswerType = {
  description: string;
  imgUrl?: string;
  no: number;
};
export const createFeedback = async (params: createParams) => {
  return await api.post("/api/feedbacks", params);
};

export const getFeedBack = async (articleno?: string) => {
  return await api.get(`/api/feedbacks/detail/${articleno}`);
};

export const createAnswer = async (params: createAnswerType) => {
  return await api.post("/api/feedbacks/answer", params);
};

export const updateAnswer = async (params: updateAnswerType) => {
  return await api.patch(`/api/feedbacks/modify/answer`, params);
};

export const updateFeedback = async (params: updateAnswerType) => {
  return await api.patch(`/api/feedbacks/modify/feedback`, params);
};
