// This file handles the upgrade process for the ALTGold contract, allowing for future enhancements while maintaining the state and data.

const { ethers, upgrades } = require("hardhat");

async function main() {
    const ALTGold = await ethers.getContractFactory("ALTGold");
    console.log("Upgrading ALTGold...");
    await upgrades.upgradeProxy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", ALTGold);
    console.log("ALTGold upgraded successfully.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });