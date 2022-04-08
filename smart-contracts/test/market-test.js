/* test/sample-test.js */
const { expect } = require("chai");
const { ethers } = require("hardhat");
 
describe("DTTSaleFactory", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    const Market = await ethers.getContractFactory("DTTSaleFactorySeperated")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    /* deploy the NFT contract */
    const DTTContract = await ethers.getContractFactory("DTTContract")
    const dTTContract = await DTTContract.deploy(marketAddress)
    await dTTContract.deployed()
    const dTTContractAddress = dTTContract.address

    /* create two tokens */
    await dTTContract.createMint('testTitle', 'testDescription', 'www.naver.com')
    await dTTContract.createMint('testTitle2', 'testDescription2', 'www.ssafy.com');

    
    /* put both tokens for sale */
    await market.createSale(1, 13700000000, '0x2170ed0880ac9a755fd29b2688956bd959f933f8', dTTContractAddress);
    await market.createSale(2, 10000000000, marketAddress, marketAddress);
    
    const [_, buyerAddress] = await ethers.getSigners()
  
    /* execute sale of token to another user */
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    /* query for and return the unsold items */
    let items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})