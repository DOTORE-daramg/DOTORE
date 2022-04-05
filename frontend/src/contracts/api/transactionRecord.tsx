import { dTT, dTTMarketContract, web3 } from "..";

export const userToTx = async (address: string) => {
  return await dTT.getPastEvents("Transfer", {
    filter: {
      to: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const userFromTx = async (address: string) => {
  return await dTT.getPastEvents("Transfer", {
    filter: {
      from: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const saleToTx = async (address: string) => {
  return await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { owner: address },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const saleFromTx = async (address: string) => {
  return await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { seller: address },
    fromBlock: 0,
    toBlock: "latest",
  });
};

export const getTimeStamp = async (blockHash: string) => {
  return await web3.eth.getBlock(blockHash).then((res) => {
    return res.timestamp;
  });
};
