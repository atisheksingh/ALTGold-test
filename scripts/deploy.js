const { ethers, upgrades } = require("hardhat");
const { int } = require("hardhat/internal/core/params/argumentTypes");

async function main() {
    // Deploy ALTGold contract
    const ALTGold = await ethers.getContractFactory("ALTGold");
    const altGold = await upgrades.deployProxy(ALTGold, [], { initializer: "initialize" });
    await altGold.deployed();
    console.log("Proxy address:", altGold.address);

    const mockusdc = await ethers.getContractFactory("MockUSDC");
    const mockusdcInstance = await mockusdc.deploy();
    await mockusdcInstance.deployed();
    console.log("MockUSDC deployed to:", mockusdcInstance.address);

   // Deploy Redemption contract (UUPS proxy)
    const Redemption = await ethers.getContractFactory("Redemption");
    const redemptionInstance = await upgrades.deployProxy(
        Redemption,
        [altGold.address, mockusdcInstance.address, 500],
        { initializer: "initialize" }
    );
    await redemptionInstance.deployed();
    console.log("Redemption deployed to:", redemptionInstance.address);
  
     // Deploy RedemptionWithKYC contract (UUPS proxy)
    const RedemptionWithKYC = await ethers.getContractFactory("RedemptionWithKYC");
    const redemptionWithKYCInstance = await upgrades.deployProxy(
        RedemptionWithKYC,
        [altGold.address, mockusdcInstance.address, 500],
        { initializer: "initialize" }
    );
    await redemptionWithKYCInstance.deployed();
    console



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });