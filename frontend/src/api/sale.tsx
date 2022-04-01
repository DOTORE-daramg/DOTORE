import { api } from "./api";

const cashContractAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8"; // 이더리움 토큰 주소

interface createSaleParams {
  price: string;
  saleTrxHash: string;
  sellerAddress: string;
  tokenId: number;
}
export const updateSaleStatus = async (saleId: number, saleTrxHash: string) => {
  return await api.patch(`api/sales`, { saleId, saleTrxHash });
};
export const updateSale = async (saleId: number, saleTrxHash: string) => {
  return await api.patch(`/api/sales`, { saleId, saleTrxHash });
};
export const getSale = async (tokenId: string) => {
  return await api.get(`/api/sales/${tokenId}`);
};
export const createSale = async (data: createSaleParams) => {
  return await api.post(`/api/sales/before`, { cashContractAddress, ...data });
};
export const cancelSale = async (address: string, tokenId: number) => {
  return await api.post(`/api/sales/cancel`, { address, tokenId });
};
export const completeSale = async (buyerAddress: string, tokenId: number) => {
  return await api.patch(`/api/sales/cancel`, { buyerAddress, tokenId });
};
