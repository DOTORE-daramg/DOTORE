import { dTT, dTTMarketContract, web3 } from "..";

export interface transactionRecordTypes {
  from: string;
  to: string;
  timeStamp: Date;
  tokenId: number;
  status: string;
  price: string;
  transactionHash: string;
}

export const userTxRecord = async (address: string) => {
  let userToTx = await dTT.getPastEvents("Transfer", {
    filter: {
      to: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
  let userFromTx = await dTT.getPastEvents("Transfer", {
    filter: {
      from: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
  // console.log(userToTx, userFromTx);

  let saleToTx = await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { owner : address },
    fromBlock: 0,
    toBlock: "latest",
  });

  let saleFromTx = await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { seller : address },
    fromBlock: 0,
    toBlock: "latest",
  });
  // console.log(saleFromTx)

  userToTx = [...userToTx, ...userFromTx, ...saleToTx, ...saleFromTx];

  // console.log(userToTx);
  
  return await sortData(userToTx);
};

const getTimeStamp = async (blockHash: string) => {
  return await web3.eth.getBlock(blockHash);
};

async function sortData (list: any[]) {
  if (list.length === 0) return;
  let result: transactionRecordTypes[] = []
  await list.reduce(async (previousPromise, nextData) => {
    await previousPromise;
    const newElem = await getTimeStamp(nextData.blockHash).then((res) => {
      if (nextData.event === "Transfer") {
        result.push({
          from: nextData.returnValues.from,
          to: nextData.returnValues.to,
          timeStamp: new Date(parseInt(res.timestamp+"000")),
          tokenId: nextData.returnValues.tokenId,
          status: "Transfer",
          price: "0",
          transactionHash: nextData.transactionHash
        });
      } else {
        result.push({
          from: nextData.returnValues.owner,
          to: nextData.returnValues.seller,
          timeStamp: new Date(parseInt(res.timestamp+"000")),
          tokenId: nextData.returnValues.tokenId,
          status: nextData.event,
          price: web3.utils.fromWei(nextData.returnValues.price),
          transactionHash: nextData.transactionHash
        });
        result.sort((a, b) =>
        a.timeStamp > b.timeStamp ? -1 : a < b ? 1 : 0)
      }
  })
  })
  return result
}