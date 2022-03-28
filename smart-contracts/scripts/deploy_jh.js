const hre = require("hardhat");

async function main() {

    const DTTMarket = await hre.ethers.getContractFactory("DTTMarket");
    const dttMarket = await DTTMarket.deploy();

    await dttMarket.deployed();

    console.log("DTTMarket deployed to:", dttMarket.address);

    const DTT = await hre.ethers.getContractFactory("DTT");
    const dtt = await DTT.deploy(dttMarket.address);
    await dtt.deployed();
    console.log("dtt deployed to:", dtt.address);


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
    })
