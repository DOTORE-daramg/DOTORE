import { web3 } from "..";
import { modifyTokenId, cancelItem } from "../../api/item";
import { updateSaleStatus, cancelSale } from "../../api/sale";
import { getSaleId } from "./second";

export const checkMintDoneTx = async (txHash: string) => {
  const tx = await web3.eth.getTransaction(txHash);
  if (tx === null) {
    // transcation이 null이면 유저가 취소된 트랜잭션
    cancelItem(txHash);
    return;
  }
  await web3.eth.getTransactionReceipt(txHash).then((res) => {
    console.log(res);
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
export const checkSaleDoneTx = async (
  txHash: string,
  address: string,
  tokenId: number
) => {
  const tx = await web3.eth.getTransaction(txHash);
  if (tx === null) {
    // transcation이 null이면 유저가 취소된 트랜잭션
    cancelSale(address, tokenId);
    return;
  }
  await web3.eth.getTransactionReceipt(txHash).then(async (res) => {
    console.log(res);

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
