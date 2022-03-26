//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "hardhat/console.sol";

contract DTTContract is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    address contractAddress;

    constructor() ERC721("Dotore NFT", "DTT") {}
    // 1차 NFT
    struct PrItem {
        string title;
        string description;
        string[] tags;
        string imgUrl;
    }

    // 2차 NFT
    struct CdItem {
        string title;
        string description;
        string[] tags;
        string imgUrl;
        bool isSale;
        uint256 price;
        uint256[] prItems;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from, address to, uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    mapping(uint256 => PrItem) public prItemMap;
    mapping(uint256 => CdItem) public cdItemMap;

    PrItem[] prItemArray;
    CdItem[] cdItemArray;

    Counters.Counter private _prTokenIds;
    Counters.Counter private _cdTokenIds;

    function createPrMint(
        string memory title,
        string memory description,
        string[] memory tags,
        string memory tokenURI
    ) public returns (uint256) {
        _prTokenIds.increment();
        uint256 newItemId = _prTokenIds.current();

        prItemMap[newItemId] = PrItem(title, description, tags, tokenURI);
        prItemArray.push(PrItem(title, description, tags, tokenURI));
        
        _mint(msg.sender, newItemId);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function createCdMint(
        string memory title,
        string memory description,
        string[] memory tags,
        string memory tokenURI,
        uint256[] memory prItems
    ) public returns (uint256) {
        _prTokenIds.increment();
        uint256 newItemId = _cdTokenIds.current();

        cdItemMap[newItemId] = CdItem(title, description, tags, tokenURI, false, 0, prItems);
        cdItemMap[newItemId] = CdItem(title, description, tags, tokenURI, false, 0, prItems);

        _mint(msg.sender, newItemId);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    // 1차 NFT 목록 조회
    function getPrItems(
    
    ) public view returns (PrItem[] memory) {
        return prItemArray;
    }
    
    // 2차 NFT 목록 조회
    function getCdItems(
    
    ) public view returns (CdItem[] memory) {
        return cdItemArray;
    }
}
