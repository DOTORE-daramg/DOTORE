import { web3 } from "..";

export const CheckDoneTx = async (TxHash: string) => {
  await web3.eth.getTransactionReceipt(TxHash).then((res) => {
    let status = "pending";
    if (res === null) {
      status = "fail";
    } else if (res.logs.length === 0) {
      return;
    } else {
      const tokenId = parseInt(res.logs[0].topics[3]);
      console.log(tokenId);
      status = "success";
    }
    // 백엔드 호출해서 tokenId 넣어주기
  });
};
