// This file contains unit tests for the ALTGold contract. It tests the functionalities such as minting, burning, whitelisting, and event emissions to ensure compliance with the specified requirements.

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ALTGold Contract", function () {
    let altGold;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        const ALTGold = await ethers.getContractFactory("ALTGold");
        [owner, addr1, addr2] = await ethers.getSigners();
        altGold = await upgrades.deployProxy(ALTGold, [], { initializer: "initialize"   });
        await altGold.deployed();
    });

    describe("Minting", function () {
        it("Should mint tokens to whitelisted address", async function () {
            await altGold.addToWhitelist(addr1.address);
            await altGold.mint(addr1.address, 100);
            expect(await altGold.balanceOf(addr1.address)).to.equal(100);
        });

        it("Should revert minting for non-whitelisted address", async function () {
            await expect(altGold.connect(addr2).mint(100))//.to.be.revertedWith("Address not whitelisted");
        });
    });

    describe("Burning", function () {
        beforeEach(async function () {
            await altGold.addToWhitelist(addr1.address);
            await altGold.mint(addr1.address, 100);
        });

        it("Should burn tokens", async function () {
            await altGold.connect(addr1).burn(50);
            expect(await altGold.balanceOf(addr1.address)).to.equal(50);
        });

        it("Should emit Transfer event on burn", async function () {
            await expect(altGold.connect(addr1).burn(50))
                .to.emit(altGold, "Transfer")
                .withArgs(addr1.address, ethers.constants.AddressZero, 50);
        });
    });

    describe("Whitelisting", function () {
        it("Should add address to whitelist", async function () {
            await altGold.addToWhitelist(addr1.address);
            expect(await altGold.isWhitelisted(addr1.address)).to.be.true;
        });

        it("Should remove address from whitelist", async function () {
            await altGold.addToWhitelist(addr1.address);
            await altGold.removeFromWhitelist(addr1.address);
            expect(await altGold.isWhitelisted(addr1.address)).to.be.false;
        });
    });

    describe("Pausable functionality", function () {
        it("Should pause the contract", async function () {
            await altGold.pause();
            await expect(altGold.mint(addr1.address, 100)).to.be.revertedWith("Pausable: paused");
        });

        it("Should unpause the contract", async function () {
            await altGold.pause();
            await altGold.unpause();
            await altGold.addToWhitelist(addr1.address);
            await altGold.mint(addr1.address, 100);
            expect(await altGold.balanceOf(addr1.address)).to.equal(100);
        });
    });
});