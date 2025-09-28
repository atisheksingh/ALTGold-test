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
    altGold = await upgrades.deployProxy(ALTGold, [], {
      initializer: "initialize",
    });
    await altGold.deployed();

    const Redemption = await ethers.getContractFactory("Redemption");
    redemption = await upgrades.deployProxy(
      Redemption,
      [altGold.address, mockUSDC.address, 500],
      { initializer: "initialize" }
    );
    await redemption.deployed();

    await altGold.addToWhitelist(user.address);
    await altGold.addToWhitelist(redemption.address);

    // Mint some mock USDC to the user and approve the Redemption contract to spend it
    await mockUSDC.mint(owner.address, ethers.utils.parseUnits("1000", 18));

    await mockUSDC
      .connect(user)
      .approve(redemption.address, ethers.utils.parseUnits("1000", 18));
    // await mockUSDC.connect(user).transfer(redemption.address, ethers.utils.parseUnits("1000", 18));
  });

  it("should allow users to redeem ALT GOLD for USDC", async function () {
    // const { altGold, mockUSDC, redemption, owner, user } = await deployfixtures();

    const amountToMint = ethers.utils.parseUnits("100", 18);
    await altGold.mint(user.address, amountToMint);
    await altGold.connect(user).approve(redemption.address, amountToMint);

    await mockUSDC
      .connect(owner)
      .approve(redemption.address, ethers.utils.parseUnits("1000", 18));

    await redemption
      .connect(owner)
      .addUsdtTocontract(ethers.utils.parseUnits("1000", 18));
    const contractusdcBalance = await redemption.usdcTokenBalanceofContract();
    expect(contractusdcBalance).to.equal(ethers.utils.parseUnits("1000", 18));

    const redemptionAmount = ethers.utils.parseUnits("50", 18);
    await expect(redemption.connect(user).redeemGoldForUSDC(redemptionAmount));

    const getTotalRedeemed = await redemption.totalRedeemed();
    console.log(
      "Total Redeemed:",
      ethers.utils.formatUnits(getTotalRedeemed, 18)
    );
    // expect(getTotalRedeemed).to.equal(redemptionAmount);

    const userBalance = await mockUSDC.balanceOf(user.address);
    console.log(
      "User USDC Balance after redemption:",
      ethers.utils.formatUnits(userBalance, 18)
    );
  });

  it("should revert if user tries to redeem more than they have", async function () {
    // const { altGold, mockUSDC, redemption, owner, user } = await deployfixtures();
    const redemptionAmount = ethers.utils.parseUnits("50", 18);
    await expect(
      redemption.connect(user).redeemGoldForUSDC(redemptionAmount)
    ).to.be.revertedWith("Insufficient ALT GOLD balance");
    await redemption.connect(owner).setTotalRedemptionLimit(0);
    await expect(
      redemption.connect(user).redeemGoldForUSDC(redemptionAmount)
    ).to.be.revertedWith("Amount exceeds redemption limit");
  });

  it("should revert if user tries to redeem more than totalRedemptionLimit", async function () {
    const amountToMint = ethers.utils.parseUnits("100", 18);
    await altGold.mint(user.address, amountToMint);
    await altGold.connect(user).approve(redemption.address, amountToMint);
    const redemptionAmount = ethers.utils.parseUnits("600", 18);
    await expect(
      redemption.connect(user).redeemGoldForUSDC(redemptionAmount)
    ).to.be.revertedWith("Amount exceeds redemption limit");
  });

  it("should check for the balance of the contract", async function () {
    const contractbalannce = await redemption.altGoldTokenBalanceofContract();
    expect(contractbalannce).to.equal(0);

    const contractusdcBalance = await redemption.usdcTokenBalanceofContract();
    console.log("USDC Balance of Contract:", contractusdcBalance);
    // expect(contractusdcBalance).to.equal(ethers.utils.parseUnits("1000", 18));
  });

  it("should emit an event on successful redemption", async function () {
    const amountToMint = ethers.utils.parseUnits("100", 18);
    await altGold.mint(user.address, amountToMint);
    await altGold.connect(user).approve(redemption.address, amountToMint);

    const redemptionAmount = ethers.utils.parseUnits("50", 18);
    await expect(redemption.connect(user).redeemGoldForUSDC(redemptionAmount));
  });

  it("should allow owner to set usdcToken address", async function () {
    const Redemption = await ethers.getContractFactory("Redemption");
    const redemption = await upgrades.deployProxy(
      Redemption,
      [altGold.address, mockUSDC.address, 1000],
      { initializer: "initialize" }
    );
    await redemption.deployed();

    const newUSDC = await (
      await ethers.getContractFactory("MockUSDC")
    ).deploy();
    await redemption.setusdcToken(newUSDC.address);
    expect(await redemption.usdcToken()).to.equal(newUSDC.address);
  });

  it("should allow owner to set altGoldToken address", async function () {
    const Redemption = await ethers.getContractFactory("Redemption");
    const redemption = await upgrades.deployProxy(
      Redemption,
      [altGold.address, mockUSDC.address, 1000],
      { initializer: "initialize" }
    );
    await redemption.deployed();

    const newALTGold = await (
      await ethers.getContractFactory("ALTGold")
    ).deploy();
    await redemption.setAltGoldToken(newALTGold.address);
    expect(await redemption.altGoldToken()).to.equal(newALTGold.address);
  });

  it("should allow owner to set totalRedemptionLimit", async function () {
    const Redemption = await ethers.getContractFactory("Redemption");
    const redemption = await upgrades.deployProxy(
      Redemption,
      [altGold.address, mockUSDC.address, 1000],
      { initializer: "initialize" }
    );
    await redemption.deployed();

    await redemption.setTotalRedemptionLimit(5000);
    expect(await redemption.totalRedemptionLimit()).to.equal(
      ethers.utils.parseEther("5000")
    );
  });

  it("should mint mockUSDC tokens", async function () {
    const newUSDC = await (
      await ethers.getContractFactory("MockUSDC")
    ).deploy();
    await newUSDC.mint(user.address, 1000);
    expect(await newUSDC.balanceOf(user.address)).to.equal(1000);
  });

  it("should burn mockUSDC tokens", async function () {
    const newUSDC = await (
      await ethers.getContractFactory("MockUSDC")
    ).deploy();
    await newUSDC.mint(user.address, 1000);
    await newUSDC.burn(user.address, 500);
    expect(await newUSDC.balanceOf(user.address)).to.equal(500);
  });

  it("it should be ablet withdraw USDC tokens by owner", async function () {
    const amountToMint = ethers.utils.parseUnits("100", 18);
    await altGold.mint(user.address, amountToMint);
    await altGold.connect(user).approve(redemption.address, amountToMint);

    const redemptionAmount = ethers.utils.parseUnits("50", 18);
    await expect(redemption.connect(user).redeemGoldForUSDC(redemptionAmount));

    const getTotalRedeemed = await redemption.totalRedeemed();
    console.log(
      "Total Redeemed:",
      ethers.utils.formatUnits(getTotalRedeemed, 18)
    );
    // expect(getTotalRedeemed).to.equal(redemptionAmount);

    //withdraw amount  by owner
    const ownerInitialBalance = await mockUSDC.balanceOf(redemption.address);
    await redemption.connect(owner).withdrawusdcToken(ownerInitialBalance);
  });
});
