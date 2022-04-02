import { dTT, dTTMarketContract, web3 } from "..";

interface retrunTypes {
  from: string;
  to: string;
  timeStamp: string | number;
  tokenId: number;
  status: string;
  price: number;
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

  let saleToTx = await dTTMarketContract.getPastEvents("allEvents", {
    filter: { to: address },
    fromBlock: 0,
    toBlock: "latest",
  });

  let saleFromTx = await dTTMarketContract.getPastEvents("allEvents", {
    filter: { from: address },
    fromBlock: 0,
    toBlock: "latest",
  });

  userToTx = [...userToTx, ...userFromTx, ...saleToTx, ...saleFromTx];

  // console.log(userToTx);
  let result: retrunTypes[] = [];
  userToTx.map((data) =>
    getTimeStamp(data.blockHash).then((res) => {
      if (data.event === "Transfer") {
        result.push({
          from: data.returnValues.from,
          to: data.returnValues.to,
          timeStamp: res.timestamp,
          tokenId: data.returnValues.tokenId,
          status: "Transfer",
          price: 0,
        });
      } else {
        result.push({
          from: data.returnValues.owner,
          to: data.returnValues.seller,
          timeStamp: res.timestamp,
          tokenId: data.returnValues.tokenId,
          status: data.event,
          price: data.returnValues.price,
        });
      }
    })
  );
  return result.sort((a, b) =>
    a.timeStamp > b.timeStamp ? -1 : a < b ? 1 : 0
  );
};

const getTimeStamp = async (blockHash: string) => {
  return await web3.eth.getBlock(blockHash);
};
