# ALT GOLD Token Project

## Overview

The ALT GOLD (ALTGOLD) token project is a decentralized finance (DeFi) application built on the Ethereum blockchain. It implements an ERC20 token with additional functionalities such as minting, burning, and whitelisting, all governed by an admin role. The project also includes a redemption mechanism that allows users to exchange ALT GOLD tokens for a mock stablecoin (USDC) on the testnet.

## Contracts

### 1. ALTGold.sol
This contract implements the ALT GOLD token with the following features:
- **Minting and Burning**: Only the admin can mint and burn tokens.
- **Whitelisting**: Addresses can be added or removed from a whitelist, controlling who can receive minted tokens.
- **Event Emissions**: Events are emitted for minting, burning, transferring, and updating the whitelist for compliance tracking.
- **Pausable Functionality**: The contract can be paused by the admin to halt all token transfers in case of emergencies.
- **Upgradeable Proxy Pattern**: Designed using OpenZeppelin's upgradeable proxy pattern to allow for future enhancements without losing state.

### 2. Redemption.sol
This contract allows users to redeem ALT GOLD tokens for a mock stablecoin (USDC). Key features include:
- **Redemption Requests**: Users can request to redeem their ALT GOLD tokens, with structured event emissions capturing the wallet address, amount redeemed, and timestamp.
- **Extensibility**: The contract is designed to integrate with off-chain compliance and KYC APIs, ensuring regulatory adherence.

### 3. MockUSDC.sol
A mock implementation of a USDC token for testing purposes. This contract simulates the behavior of a stablecoin, allowing users to redeem ALT GOLD against it.

## Scripts

### 1. deploy.js
This script is responsible for deploying the ALTGold and Redemption contracts to the blockchain. It sets up the initial state and configurations necessary for the contracts to function.

### 2. upgrade.js
This script handles the upgrade process for the ALTGold contract, allowing for future enhancements while maintaining the state and data.

## Tests

### 1. ALTGold.test.js
Unit tests for the ALTGold contract, covering functionalities such as minting, burning, whitelisting, and event emissions to ensure compliance with the specified requirements.

### 2. Redemption.test.js
Unit tests for the Redemption contract, verifying the redemption process, event emissions, and integration with the mock USDC token.

## Configuration Files

### 1. hardhat.config.js
Configuration file for Hardhat, specifying network settings, compiler options, and plugins required for the project.

### 2. package.json
Configuration file for npm, listing the dependencies, scripts, and metadata for the project.

## Justification for Storage Layout Choices and Upgrade Paths
The project utilizes the OpenZeppelin upgradeable contracts pattern to ensure that the ALT GOLD token can evolve over time without losing its state. The storage layout is designed to be efficient and modular, allowing for easy upgrades and maintenance. The use of events ensures transparency and compliance with regulatory requirements, making it suitable for a DeFi application.

## Conclusion
The ALT GOLD token project is a robust implementation of a DeFi token with essential features for minting, burning, and redemption, designed with compliance and extensibility in mind.



address on hoodi address : 0xce695DC066205d878cef2aEba3F6AD1E45e1D151