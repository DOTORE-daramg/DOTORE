import { web3 } from "..";
import { modifyTokenId } from "../../api/item";

export const CheckDoneTx = async (TxHash: string) => {
  await web3.eth.getTransactionReceipt(TxHash).then((res) => {
    // console.log(TxHash);
    if (res === null) {
      return;
    } else if (res.logs.length === 0) {
      modifyTokenId({ itemTrxHash: TxHash, tokenId: 0 });
    } else {
      const tokenId = parseInt(res.logs[0].topics[3]);
      modifyTokenId({ itemTrxHash: TxHash, tokenId: tokenId });
    }
  });
};
