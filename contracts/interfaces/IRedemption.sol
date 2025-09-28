// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IRedemption {
    function redeemGoldForUSDC(uint256 amount) external;
    function setRedemptionLimit(uint256 limit) external;
    function altGoldTokenBalanceofContract() external view returns (uint256);
    function usdcTokenBalanceofContract() external view returns (uint256);
    function getAltGoldTokenAddress() external view returns (address);
    function getUSDCTokenAddress() external view returns (address);
    function getTotalRedemptionLimit() external view returns (uint256);
    function getUserTotalRedeemed(address user) external view returns (uint256);
    function getTotalRedeemed() external view returns (uint256);
    function setusdcToken(address _usdcToken) external;
    function setAltGoldToken(address _altGoldToken) external;
    function addUsdtTocontract(uint256 amount) external;
    function withdrawusdcToken(uint256 amount) external;
    function withdrawAltGold(uint256 amount) external;
}