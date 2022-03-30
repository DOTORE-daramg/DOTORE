import { web3 } from "..";
import { dTT, dTTMarketAddress, dTTMarketContract } from "../../contracts";
import { useRecoilValue } from "recoil";

interface createTokenProps {
    title: string;
    description: string;
    tokenUrl: string;
    isFirst: boolean;
    userAddress: string;
}

// onClickDTT - createToken
export const createToken = async ({ title, description, tokenUrl, isFirst, userAddress }: createTokenProps) => {
    await dTT.methods
        .createToken(
            title,
            description,
            tokenUrl,
            isFirst,
            dTTMarketAddress
        )
        .send({
            from: userAddress,
            gas: 3000000,
            gasPrice: "10000000000",
        })
        .on('transactionHash', (hash) => {
            // 백엔드에 해시값, item title, description, file, (tokenId 빼고 다)
        });
}

interface createMarketItemProps {
    tokenId: number;
    price: number;
    userAddress: string;
}

// onClickCreate - createMarketItem
export const createMarketItem = async ({ tokenId, price, userAddress }: createMarketItemProps) => {
    await dTTMarketContract.methods
        .createMarketItem(
            tokenId,
            price
        )
        .send({
            from: userAddress,
            gas: 3000000,
            gasPrice: "10000000000",
        })
        .on('transactionHash', (hash) => {
            // 백엔드에 해시값, item title, description, file, (tokenId 빼고 다)
        });

}

// onClickPurchase - purchase
export const purchase = async () => {
    await dTTMarketContract.methods
        .purchase(
            1
            // "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        )
        .send({
            from: userInfo.address,
            gas: 3000000,
            value: "1000000000000000000",
            gasPrice: "10000000000",
        }).on('transactionHash', (hash) => {
            // 백엔드에 해시값, item title, descriptionn, file, (tokenId 빼고 다)
        });
}