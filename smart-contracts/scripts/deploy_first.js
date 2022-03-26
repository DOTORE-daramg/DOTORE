// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
//const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  
  const DTTSaleFactory = await hre.ethers.getContractFactory("DTTSaleFactory");
  const dTTSaleFactory = await DTTSaleFactory.deploy();
  
  await dTTSaleFactory.deployed();
  
  console.log("DTTSaleFactory deployed to:", dTTSaleFactory.address);

  const DTTContract = await hre.ethers.getContractFactory("DTTContract");
  const dTTContract = await DTTContract.deploy(dTTSaleFactory.address);

  await dTTContract.deployed(dTTSaleFactory.address);

  console.log("DTTContract deployed to:", dTTContract.address);

  const DTTSaleContract = await hre.ethers.getContractFactory("Sale");
  const dTTSaleContract = await DTTSaleContract.deploy(dTTSaleContract.address);

  await dTTSaleContract.deployed(dTTSaleContract.address);

  console.log("DTTSaleContract deployed to:", dTTSaleContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
