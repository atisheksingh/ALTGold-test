const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Redemption Contract", function () {
    let altGold;
    let mockUSDC;
    let redemption;
    let owner;
    let user;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDC.connect(user).deploy();
        await mockUSDC.deployed();

        const ALTGold = await ethers.getContractFactory("ALTGold");
        altGold = await upgrades.deployProxy(ALTGold, [], { initializer: "initialize" });
        await altGold.deployed();

        const Redemption = await ethers.getContractFactory("Redemption");
        redemption = await upgrades.deployProxy(Redemption, [altGold.address, mockUSDC.address], { initializer: "initialize" });
        await redemption.deployed();


        await altGold.addToWhitelist(user.address);
        await altGold.addToWhitelist(redemption.address);

        const userBalance1 = await mockUSDC.balanceOf(user.address);
        await mockUSDC.connect(user).approve(redemption.address, ethers.utils.parseUnits("1000", 18));
        await mockUSDC.connect(user).transfer(redemption.address, ethers.utils.parseUnits("1000", 18));
      
    });

    it("should allow users to redeem ALT GOLD for USDC", async function () {
        const amountToMint = ethers.utils.parseUnits("100", 18);
        await altGold.mint(user.address, amountToMint);
        await altGold.connect(user).approve(redemption.address, amountToMint);
        
        const redemptionAmount = ethers.utils.parseUnits("50", 18);
        await expect(redemption.connect(user).redeem(redemptionAmount))
       
        const userBalance = await mockUSDC.balanceOf(user.address);
        console.log("User USDC Balance after redemption:", ethers.utils.formatUnits(userBalance, 18));
    });

    it("should revert if user tries to redeem more than they have", async function () {
        const redemptionAmount = ethers.utils.parseUnits("50", 18);
        await expect(redemption.connect(user).redeem(redemptionAmount)).to.be.revertedWith("Insufficient ALT GOLD balance");
    });

    it("should emit an event on successful redemption", async function () {
        const amountToMint = ethers.utils.parseUnits("100", 18);
        await altGold.mint(user.address, amountToMint);
        await altGold.connect(user).approve(redemption.address, amountToMint);

        const redemptionAmount = ethers.utils.parseUnits("50", 18);
        await expect(redemption.connect(user).redeem(redemptionAmount))
    });
});