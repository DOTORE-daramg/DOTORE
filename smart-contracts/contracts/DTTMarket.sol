//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./DTT.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DTTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _saleIds; // 생성된 total items 수
    Counters.Counter private _itemsSold; // 팔린 items 수

    DTT public dTT;

    constructor(address _dTTAddress) {
        dTT = DTT(_dTTAddress);
    }

    struct MarketItem {
        uint256 saleId;
        uint256 tokenId;
        address seller; // nft 파는 사람
        address owner; // nft 소유주
        uint256 price;
        bool sold;
        string status;
    }

    // tokenId => saleId
    mapping(uint256 => uint256) public saleMap;

    // saleId 값으로 접근
    mapping(uint256 => MarketItem) public idMarketItem;

    event MarketItemEvent(
        uint256 saleId,
        uint256 indexed tokenId,
        address indexed seller,
        address indexed owner,
        uint256 price,
        bool sold,
        string status
    );

    function createMarketItem(
        uint256 tokenId,
        uint256 price
    ) public nonReentrant checkExistence(tokenId) returns (uint256) {
        require(price > 0, "Price must be above zero");
        require(saleMap[tokenId] == 0, "Already on sale");
        require(dTT.getIsFirst(tokenId) == false, "This token can't be sold");
        require(dTT.ownerOf(tokenId) == msg.sender, "You are not the owner of the token");

        _saleIds.increment();
        uint256 saleId = _saleIds.current();

        saleMap[tokenId] = saleId;

        idMarketItem[saleId] = MarketItem(
            saleId,
            tokenId,
            msg.sender, //판매자의 주소
            address(0), //아직 소유주 없으니까 0으로 둠
            price,
            false,
            "CreateSaleItem"
        );

        // 컨트랙트에 nft의 소유권 전송
        dTT.transferFrom(msg.sender, address(this), tokenId);

        // log
        emit MarketItemEvent(
            saleId,
            tokenId,
            msg.sender,
            address(0),
            price,
            false,
            "CreateSaleItem"
        );

        return saleId;
    }

    // purchase
    function purchase(uint256 tokenId)
        public
        payable
        nonReentrant
        checkExistence(tokenId)
        checkSale(tokenId)
    {
        uint256 _saleId = saleMap[tokenId];
        uint256 price = idMarketItem[_saleId].price;
        address seller = idMarketItem[_saleId].seller;

        require(msg.sender != seller, "Owners can't purchase their own token");
        require(
            msg.value == price,
            "Please submit the asking price in order to complete purchase"
        );

        // 판매자에게 지불
        payable(seller).transfer(price);

        // 컨트랙트가 가지고 있던 소유권을 구매하려는 사람에게 넘김
        dTT.transferFrom(address(this), msg.sender, tokenId);

        idMarketItem[_saleId].owner = msg.sender; // 구매자를 owner로
        idMarketItem[_saleId].sold = true; // 팔렸다고 표시
        _itemsSold.increment();  // 팔린 물건 수 + 1

        saleMap[tokenId] = 0;
        if(!dTT.isApprovedForAll(msg.sender, address(this))){
            dTT.setApprovalForAll(msg.sender, address(this), true);
        }

        emit MarketItemEvent(
            _saleId,
            tokenId,
            seller,
            msg.sender,
            price,
            true,
            "Purchase"
        );
    }

    // 판매 취소 함수
    function cancelSale(uint256 tokenId) public checkExistence(tokenId) checkSale(tokenId) checkOwner(tokenId) {
        // NFT 돌려주기
        dTT.transferFrom(address(this), msg.sender, tokenId);
        
        uint256 _saleId = saleMap[tokenId];
        address seller = idMarketItem[_saleId].seller;

        emit MarketItemEvent(
            _saleId,
            tokenId,
            seller,
            address(0),
            0,
            true,
            "Cancel"
        );
        
        saleMap[tokenId] = 0;
    }

    modifier checkExistence(uint256 tokenId) {
        require(dTT.ownerOf(tokenId) != address(0), "Token does not exist");
        _;
    }
    modifier checkSale(uint256 tokenId) {
        uint256 _saleId = saleMap[tokenId];
        require(_saleId != 0, "This token is not for sale");
        _;
    }
    modifier checkOwner(uint256 tokenId) {
        uint256 _saleId = saleMap[tokenId];
        require(msg.sender == idMarketItem[_saleId].seller, "You are not the owner of the token");
        _;
    }
}
