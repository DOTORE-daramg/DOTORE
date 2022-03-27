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
    address contractAddress; // DTTMarket 주소

    constructor(address marketplaceAddress) ERC721("Dotore NFT", "DTT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId); // 민팅
        _setTokenURI(newItemId, tokenURI); // 가스비 줄이려고! baseURI랑 tokenURI 연결.
        setApprovalForAll(contractAddress, true); // marketplace에 trx 권한을 준다.

        return newItemId;
    }
}
