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
            await expect(altGold.connect(addr2).mint(100)).to.be.revertedWith("");
        });

        it("Should emit Transfer event on mint", async function () {
            await altGold.addToWhitelist(addr1.address);
            await expect(altGold.mint(addr1.address, 200))
                .to.emit(altGold, "Transfer")
                .withArgs(ethers.constants.AddressZero, addr1.address, 200);
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
    // testing transfer functionality and event emission
    describe("Transfers", function () {
        beforeEach(async function () {
            await altGold.addToWhitelist(addr1.address);
            await altGold.addToWhitelist(addr2.address);
            await altGold.mint(addr1.address, 100);
        });

        it("Should emit Transfer event on transfer", async function () {
            await expect(altGold.connect(addr1).transfer(addr2.address, 30))
                .to.emit(altGold, "Transfer")
                .withArgs(addr1.address, addr2.address, 30);
        });
    });
    // testing whitelisting events 
    describe("Whitelist management", function () {
        it("Should add address to whitelist", async function () {
           await expect(altGold.addToWhitelist(addr1.address))
                .to.emit(altGold, "WhitelistUpdated")
                .withArgs(addr1.address, true);
            expect(await altGold.isWhitelisted(addr1.address)).to.be.true;
        });

        it("Should remove address from whitelist", async function () {
            await altGold.addToWhitelist(addr1.address);
            await expect(altGold.removeFromWhitelist(addr1.address))
                .to.emit(altGold, "WhitelistUpdated")
                .withArgs(addr1.address, false);
            expect(await altGold.isWhitelisted(addr1.address)).to.be.false;
        });

        it("should emit WhitelistUpdated for each address in addressesToWhitelist", async function () {
            const addrs = [addr1.address, addr2.address];
            await expect(altGold.addressesToWhitelist(addrs))
                .to.emit(altGold, "WhitelistUpdated")
                .withArgs(addr1.address, true)
                .and.to.emit(altGold, "WhitelistUpdated")
                .withArgs(addr2.address, true);
        });
    });
    // testing pausable functionality
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

    describe("misc", function () {
        it("Should transfer ownership", async function () {
            await altGold.transferOwnership(addr1.address);
            expect(await altGold.owner()).to.equal(addr1.address);
        });

        it("Should restrict functions to owner only", async function () {
            await expect(altGold.connect(addr2).pause()).to.be.revertedWith("Ownable: caller is not the owner");
        });
    
        it("should not be able to transfer a non whitelisted address", async function () {
            await altGold.addToWhitelist(addr1.address);
            await altGold.mint(addr1.address, 100);
            await expect(altGold.connect(addr1).transfer(addr2.address, 50)).to.be.revertedWith("TransferToNonWhitelisted");
        });

        it("should revert if sender is not whitelisted", async function () {
            await altGold.addToWhitelist(addr2.address);
            await altGold.mint(addr2.address, 100);
            // Remove addr2 from whitelist
            await altGold.removeFromWhitelist(addr2.address);
            await altGold.addToWhitelist(owner.address);
            await expect(
                altGold.connect(addr2).transfer(owner.address, 10)
            ).to.be.revertedWith("AddressNotWhitelisted");
        });
    });




});
