import { dTT, dTTMarketContract, web3 } from "..";

export const tokenTx = async (tokenId: string) => {
  return await dTT.getPastEvents("Transfer", {
    filter: {
      tokenId: tokenId,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const saleTx = async (tokenId: string) => {
  return await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { tokenId: tokenId },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const getTimeStamp = async (blockHash: string) => {
  return await web3.eth.getBlock(blockHash).then((res) => {
    return res.timestamp;
  });
};
