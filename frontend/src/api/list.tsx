import { api } from "./api";

export const viewAll = async () => {
  return await api.get(`/api/items/all`);
};
