//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './DTT.sol';

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DTTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _saleIds; // 생성된 total items 수
    Counters.Counter private _itemsSold; // 팔린 items 수

    DTT public dTT;
    address payable owner; // 컨트랙트 주인

    constructor(address _dTTAddress) {
        owner = payable(msg.sender);
        dTT = DTT(_dTTAddress);
    }

    struct MarketItem {
        uint256 saleId;
        uint256 tokenId;
        address payable seller; // nft 파는 사람
        address payable owner; // nft 소유주
        uint256 price;
        bool sold;
    }

    // tokenId => saleId
    mapping(uint256 => uint256) public saleMap;

    // saleId 값으로 접근
    mapping(uint256 => MarketItem) public idMarketItem;

    event MarketItemCreated(
        uint256 indexed saleId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // createMarketItem
    function createMarketItem(
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant returns (uint256) {
        require(price > 0, "Price must be above zero");
        require(saleMap[tokenId] == 0, "Already on sale");

        _saleIds.increment();
        uint256 saleId = _saleIds.current();

        // 매핑
        saleMap[tokenId] = saleId;

        idMarketItem[saleId] = MarketItem(
            saleId,
            tokenId,
            payable(msg.sender), //판매자의 주소
            payable(address(0)), //아직 소유주 없으니까 0으로 둠
            price,
            false
        );

        // 컨트랙트에 nft의 소유권 전송
        dTT.transferFrom(msg.sender, address(this), tokenId);

        // log
        emit MarketItemCreated(
            saleId,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );

        return saleId;
    }

    // purchase
    function purchase(uint256 tokenId)
        public
        payable
        nonReentrant
    {
        require(saleMap[tokenId] != 0, "Not for sale");

        uint256 _saleId = saleMap[tokenId];
        uint256 price = idMarketItem[_saleId].price;

        require(msg.sender != idMarketItem[_saleId].seller, 'Owner cannot buy');
        require(
            msg.value >= price,
            "Please submit the asking price in order to complete purchase"
        );

        // 판매자에게 지불
        payable(idMarketItem[_saleId].seller).transfer(msg.value);

        // 컨트랙트가 가지고 있던 소유권을 구매하려는 사람에게 넘김
        dTT.transferFrom(address(this), msg.sender, tokenId);

        idMarketItem[_saleId].owner = payable(msg.sender); // 구매자를 owner로
        idMarketItem[_saleId].sold = true; // 팔렸다고 표시
        _itemsSold.increment(); // 팔린 물건 수 + 1

        saleMap[tokenId] = 0;
    }

    // 판매 취소 함수
    function cancelSale(uint256 tokenId) public {
        uint256 _saleId = saleMap[tokenId];
        require(msg.sender == idMarketItem[_saleId].seller, 'You are not the owner of the token');

        // NFT 돌려주기
        dTT.transferFrom(address(this), msg.sender, tokenId);

        saleMap[tokenId] = 0;
    }
}
