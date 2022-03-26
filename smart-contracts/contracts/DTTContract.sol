//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "hardhat/console.sol";

contract DTTContract is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Dotore NFT", "DTT") {
        // admin = msg.sender;
        contractAddress = marketplaceAddress;
    }

    // NFT struct
    struct Item {
        string title;
        string description;
        string fileUrl;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    mapping(uint256 => Item) public itemMap;

    Counters.Counter private _tokenIds;

    function createMint(
        string memory title,
        string memory description,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        itemMap[newItemId] = Item(title, description, tokenURI);

        _mint(msg.sender, newItemId);
        setApprovalForAll(contractAddress, true); // NFT 전송 권한 준다.
        return newItemId;
    }
}
