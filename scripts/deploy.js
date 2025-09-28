const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploy ALTGold contract
    const ALTGold = await ethers.getContractFactory("ALTGold");
    const altGold = await upgrades.deployProxy(ALTGold, [], { initializer: "initialize" });
    await altGold.deployed();
    console.log("Proxy address:", altGold.address);
    // Deploy Redemption contract
    // const Redemption = await ethers.getContractFactory("Redemption");
    // const redemptionInstance = await Redemption.deploy();
    // await redemptionInstance.deployed();
    // console.log("Redemption deployed to:", redemptionInstance.address);

    // Optionally, you can set up initial whitelisting or other configurations here
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });