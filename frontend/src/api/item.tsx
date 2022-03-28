import { api } from "./api";

export const viewAll = async () => {
  return await api.get(`/api/items/all`);
};

export const getItem = async (tokenId?: string) => {
  return await api.get(`/api/items/${tokenId}/453`);
};

export const getRelatedItem = async (tokenId?: string) => {
  return await api.get(`/api/items/relation/${tokenId}`);
};

export const getFeedbacks = async (tokenId?: string) => {
  return await api.get(`/api/feedbacks/${tokenId}`);
};
