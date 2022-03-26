//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract DTTSaleFactory is Ownable {
    address public admin;
    address[] public sales;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다.
     */
    function createSale(
        uint256 tokenId,
        uint256 purchasePrice,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO
        address saleAddress = address(
            new Sale(
                admin,
                payable(msg.sender),
                tokenId,
                purchasePrice,
                currencyAddress, // 이더리움인지~ 비트코인인지~~~
                nftAddress
            )
        );

        sales.push(saleAddress);

        emit NewSale(saleAddress, msg.sender, tokenId);

        return saleAddress;
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

// ------------------------------------------------------------------------------------------------

/**
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address payable public seller;
    address payable public buyer;
    address admin;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event SaleEnded(address buyer, uint256 purchasePrice);

    constructor(
        address _admin,
        address payable _seller,
        uint256 _tokenId,
        uint256 _purchasePrice,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_purchasePrice > 0);
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function purchase() public payable notEnded {
        // TODO
        buyer = payable(msg.sender);
        require(buyer != seller, "You can't buy your item");
        // ended = false 판매중인지 확인

        // buyer가 purchasePrice+gas보다 돈 많이 갖고 있는지
        require(
            erc20Contract.balanceOf(buyer) >= purchasePrice,
            "You need more money"
        );

        require(
            erc721Contract.getApproved(tokenId) == admin,
            "Market is not approved"
        );

        // 구매 희망자가 sale 컨트랙트에게 구매 희망자의 erc-20 토큰을 송금할 수 있는 권한을 허용한 경우 (ERC-20 approve)
        erc20Contract.approve(address(this), purchasePrice);

        // 토큰 넘겨주기
        erc20Contract.transferFrom(buyer, seller, purchasePrice);

        // admin이 NFT 넘겨주기

        erc721Contract.transferFrom(seller, buyer, tokenId);
        _end();
        emit SaleEnded(buyer, purchasePrice);
    }

    function cancelSales() public {
        // TODO
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address
        )
    {
        return (purchasePrice, tokenId, currencyAddress, nftAddress);
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
    modifier notEnded() {
        require(ended == false, "Sale: Sale is ended.");
        _;
    }
}
