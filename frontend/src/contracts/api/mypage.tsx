import { web3 } from "..";
import { modifyTokenId } from "../../api/item";
import { updateSaleStatus } from "../../api/sale";
import { getSaleId } from "./second";

export const checkMintDoneTx = async (txHash: string) => {
  await web3.eth.getTransactionReceipt(txHash).then((res) => {
    // console.log(TxHash);
    if (res === null) {
      return;
    } else if (res.logs.length === 0) {
      modifyTokenId({ itemTrxHash: txHash, tokenId: 0 });
    } else {
      const tokenId = parseInt(res.logs[0].topics[3]);
      modifyTokenId({ itemTrxHash: txHash, tokenId: tokenId });
    }
  });
};
export const checkSaleDoneTx = async (txHash: string) => {
  await web3.eth.getTransactionReceipt(txHash).then(async (res) => {
    if (res === null) {
      return;
    } else if (res.logs.length === 0) {
      updateSaleStatus(0, txHash);
    } else {
      const tokenId = parseInt(res.logs[0].topics[3]);
      const saleId = await getSaleId(tokenId);
      updateSaleStatus(saleId, txHash);
    }
  });
};
