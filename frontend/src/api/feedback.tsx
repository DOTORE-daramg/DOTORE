import { api } from "./api";

export const createFeedback = async () => {
  return await api.post(`/api/feedbacks`);
};
