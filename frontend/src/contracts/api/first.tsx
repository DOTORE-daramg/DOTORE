import { web3 } from "..";
import { dTT, dTTMarketAddress } from "..";
import { postMintBefore } from "../../api/item";

// 1차 NFT 민팅, 판매등록, 구매
// 구매 안됨. (거래 x)

interface createTokenProps {
  title: string;
  description: string;
  tokenUrl: string;
  tags: string[];
  format: string;
  userAddress: string;
}

// onClickDTT - createToken
export const createToken = async ({
  title,
  description,
  tokenUrl,
  tags,
  format,
  userAddress,
}: createTokenProps) => {
  let txHash = "";
  await dTT.methods
    .createToken(title, description, tokenUrl, true, dTTMarketAddress)
    .send({
      from: userAddress,
      gas: 3000000,
      gasPrice: "10000000000",
    })
    .on("transactionHash", (hash: string) => {
      txHash = hash;
      // 백엔드에 해시값, item title, description, file, (tokenId 빼고 다)
      // postMintBefore({
      //   authorAddres: userAddress,
      //   format,
      //   isFirst: true,
      //   itemDecription: description,
      //   itemHash: tokenUrl,
      //   itemTitle: title,
      //   itemTrxHash: hash,
      //   tags,
      // });
    });
  return txHash;
};
