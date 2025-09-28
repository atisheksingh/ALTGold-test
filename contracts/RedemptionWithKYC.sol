// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./Redemption.sol";

contract RedemptionWithKYC is Redemption {
    mapping(address => bool) public kycPassed;

    function setKYC(address user, bool passed) external onlyOwner {
        kycPassed[user] = passed;
    }

    function _isCompliant(address user) internal view override returns (bool) {
        return kycPassed[user];
    }
}