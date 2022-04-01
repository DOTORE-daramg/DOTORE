import { api } from "./api";

interface createSaleParams {
  cashContractAddress: String;
  price: String;
  saleTrxHash: String;
  sellerAddress: String;
  tokenId: Number;
}

export const updateSale = async (saleId: Number, saleTrxHash: String) => {
  return await api.patch(`/api/sales`, { saleId, saleTrxHash });
};
export const getSale = async (tokenId: Number) => {
  return await api.get(`/api/sales/${tokenId}`);
};
export const createSale = async (data: createSaleParams) => {
  return await api.post(`/api/sales/before`, data);
};
export const cancelSale = async (address: String, tokenId: Number) => {
  return await api.post(`/api/sales/cancel`, { address, tokenId });
};
export const completeSale = async (buyerAddress: String, tokenId: Number) => {
  return await api.patch(`/api/sales/cancel`, { buyerAddress, tokenId });
};
