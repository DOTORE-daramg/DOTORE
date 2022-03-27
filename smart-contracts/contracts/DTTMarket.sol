//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DTTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address dttContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed dttContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function createMarketItem(
        address dttContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be above zero");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idMarketItem[itemId] = MarketItem(
            itemId,
            dttContract,
            tokenId,
            payable(msg.sender), //address of the seller putting the nft up for sale
            payable(address(0)), //no owner yet (set owner to empty address)
            price,
            false
        );

        IERC721(dttContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            dttContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function createMarketSale(address dttContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idMarketItem[itemId].price;
        uint256 tokenId = idMarketItem[itemId].tokenId;

        require(
            msg.value >= price,
            "Please submit the asking price in order to complete purchase"
        );

        idMarketItem[itemId].seller.transfer(msg.value);

        IERC721(dttContract).transferFrom(address(this), msg.sender, tokenId);

        idMarketItem[itemId].owner = payable(msg.sender);
        idMarketItem[itemId].sold = true;
        _itemsSold.increment();
    }
}
