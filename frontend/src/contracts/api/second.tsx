import { web3 } from "..";
import { dTT, dTTMarketAddress, dTTMarketContract } from "..";
import { postMintBefore } from "../../api/item";

// 2차 NFT 민팅, 판매등록, 구매

interface createTokenProps {
  title: string;
  description: string;
  tokenUrl: string;
  tags: string[];
  format: string;
  original: Number[];
  userAddress: string;
}

// onClickDTT - createToken
export const createToken = async ({
  title,
  description,
  tokenUrl,
  tags,
  format,
  original,
  userAddress,
}: createTokenProps) => {
  let txHash = "";
  const tx = await dTT.methods
    .createToken(title, description, tokenUrl, false, dTTMarketAddress)
    .send({
      from: userAddress,
      gas: 3000000,
      gasPrice: "10000000000",
    })
    .on("transactionHash", (hash: string) => {
      txHash = hash;
      postMintBefore({
        authorAddress: userAddress,
        format,
        isFirst: false,
        itemDescription: description,
        itemHash: tokenUrl,
        itemTitle: title,
        itemTrxHash: hash,
        original,
        tags,
      });
    });
  return { tx, txHash };
};

interface createMarketItemProps {
  tokenId: number;
  price: number;
  userAddress: string;
}

// onClickCreate - createMarketItem
export const createMarketItem = async ({
  tokenId,
  price,
  userAddress,
}: createMarketItemProps) => {
  await dTTMarketContract.methods.createMarketItem(tokenId, price).send({
    from: userAddress,
    gas: 3000000,
    gasPrice: "10000000000",
  });
  // .on('transactionHash', (hash) => {
  //     // 백엔드에 해시값, item title, description, file, (tokenId 빼고 다)
  // });
};
interface purchaseProps {
  tokenId: number;
  price: number;
  userAddress: string;
}

// onClickPurchase - purchase
export const purchase = async ({
  tokenId,
  price,
  userAddress,
}: purchaseProps) => {
  await dTTMarketContract.methods
    .purchase(
      tokenId
      // userAddress
    )
    .send({
      from: userAddress,
      gas: 3000000,
      value: price,
      gasPrice: "10000000000",
    });
  // .on('transactionHash', (hash) => {
  //     // 백엔드에 해시값, item title, descriptionn, file, (tokenId 빼고 다)
  // });
};
