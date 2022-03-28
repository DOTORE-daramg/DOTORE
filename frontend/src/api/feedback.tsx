import { api } from "./api";

export type createParams = {
  decription: string;
  imgUrl?: string;
  questioner: string;
  respondent: string;
  tokenId: number | undefined;
};

export const createFeedback = async (params: createParams) => {
  console.log(params);
  return await api.post("/api/feedbacks", params);
};
