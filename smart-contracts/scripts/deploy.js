const hre = require("hardhat");

async function main() {
  const DTT = await hre.ethers.getContractFactory("DTT");
  const dtt = await DTT.deploy();
  await dtt.deployed();
  console.log("dtt deployed to:", dtt.address);

  const DTTMarket = await hre.ethers.getContractFactory("DTTMarket");
  const dttMarket = await DTTMarket.deploy(dtt.address);

  await dttMarket.deployed();

  console.log("DTTMarket deployed to:", dttMarket.address);

  //   let config = `
  //   export const dttmarketaddress = "${dttMarket.address}"
  //   export const dttaddress = "${dtt.address}"
  //   `

  //   let data = JSON.stringify(config)
  // fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
