//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract DTT is ERC721URIStorage {
    using Counters for Counters.Counter; // auto-increment
    Counters.Counter private _tokenIds;

    constructor() ERC721("Dotore NFT", "DTT") {
    }

    struct Item {
        string title;
        string description;
        bool isFirst;
    }

    mapping(uint256 => Item) public Items;

    function createToken(string memory title, string memory description, string memory tokenURI, bool isFirst, address marketplaceAddress) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId); // 민팅
        _setTokenURI(newItemId, tokenURI); // 가스비 줄이려고! baseURI랑 tokenURI 연결.
        Items[newItemId] = Item(title, description, isFirst);

        if(!isApprovedForAll(msg.sender, marketplaceAddress)){
            setApprovalForAll(marketplaceAddress, true); // marketplace에 trx 권한을 준다.
        }

        return newItemId;
    }

    function setApprovalForAll(address sender, address operator, bool approved) public virtual {
        _setApprovalForAll(sender, operator, approved);
    }

    function getIsFirst(uint256 tokenId) view public returns(bool) {
        return Items[tokenId].isFirst;
    }
}
