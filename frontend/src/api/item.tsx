import { api } from "./api";

export const viewAll = async () => {
  return await api.get(`/api/items/all`);
};

export const getItem = async (tokenId?: string) => {
  return await api.get(`/api/items/${tokenId}`);
};

export const getRelatedItem = async (tokenId?: string) => {
  return await api.get(`/api/items/relation/${tokenId}`);
};

export const getFeedbacks = async (tokenId?: string) => {
  return await api.get(`/api/feedbacks/${tokenId}`);
};

export const getFeedbacksFromMe = async (
  tokenId?: string,
  address?: string
) => {
  return await api.post(`/api/feedbacks/me`, { tokenId, address });
};

export const getIsLike = async (tokenId?: string, address?: string) => {
  return await api.get(`/api/items/like/${tokenId}/${address}`);
};

export const putLike = async (address: string, tokenId?: string) => {
  return await api.post(`/api/items/like`, { address, tokenId });
};

// export const dislike = async (address: string, tokenId: string) => {
//   return await api.delete(`/api/items/like`, { address, tokenId });
// };
