import { dTT, dTTMarketContract, web3 } from "..";


export const userToTx = async (address: string) => {
  return await dTT.getPastEvents("Transfer", {
    filter: {
      to: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
}

export const userFromTx =async (address:string) => {
  return await dTT.getPastEvents("Transfer", {
    filter: {
      from: address,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
}

export const saleToTx = async (address:string) => {
  return await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { owner: address },
    fromBlock: 0,
    toBlock: "latest",
  });
}

export const saleFromTx =async (address:string) => {
  return await dTTMarketContract.getPastEvents("MarketItemEvent", {
    filter: { seller: address },
    fromBlock: 0,
    toBlock: "latest",
  });
}

// export const userTxRecord = async (address: string) => {
//   let userToTx = await dTT.getPastEvents("Transfer", {
//     filter: {
//       to: address,
//     },
//     fromBlock: 0,
//     toBlock: "latest",
//   });
//   let userFromTx = await dTT.getPastEvents("Transfer", {
//     filter: {
//       from: address,
//     },
//     fromBlock: 0,
//     toBlock: "latest",
//   });
//   // console.log(userToTx, userFromTx);

//   let saleToTx = await dTTMarketContract.getPastEvents("MarketItemEvent", {
//     filter: { owner: address },
//     fromBlock: 0,
//     toBlock: "latest",
//   });

//   let saleFromTx = await dTTMarketContract.getPastEvents("MarketItemEvent", {
//     filter: { seller: address },
//     fromBlock: 0,
//     toBlock: "latest",
//   });
//   // console.log(saleFromTx)

//   // userToTx = [...userToTx, ...userFromTx, ...saleToTx, ...saleFromTx];

//   console.log(userToTx);

//   // return await sortData(userToTx);
// };

const makeTimeStamp = (blockHash: string) => {
  return web3.eth.getBlock(blockHash).then((res)=> {
    return res.timestamp
  });
};

export const getTimeStamp = (blockHash: string) => {
  return makeTimeStamp(blockHash);
}

// async function sortData(list: any[]) {
//   if (list.length === 0) return;
//   let result: transactionRecordTypes[] = [];
//   await list.reduce(async (previousPromise, nextData) => {
//     await previousPromise;
//     await getTimeStamp(nextData.blockHash).then((res) => {
//       if (nextData.event === "Transfer") {
//         result.push({
//           from: nextData.returnValues.from,
//           to: nextData.returnValues.to,
//           timeStamp: new Date(parseInt(res.timestamp + "000")),
//           tokenId: nextData.returnValues.tokenId,
//           status: "Transfer",
//           price: "0",
//           transactionHash: nextData.transactionHash,
//         });
//       } else {
//         result.push({
//           from: nextData.returnValues.owner,
//           to: nextData.returnValues.seller,
//           timeStamp: new Date(parseInt(res.timestamp + "000")),
//           tokenId: nextData.returnValues.tokenId,
//           status: nextData.event,
//           price: web3.utils.fromWei(nextData.returnValues.price),
//           transactionHash: nextData.transactionHash,
//         });
//       }
//     });
//   });
//   return await result;
// }

export const makeData =async (list:any[]) => {
  return list.map((data, index) => {
    console.log(data.blockHash);
  })
}