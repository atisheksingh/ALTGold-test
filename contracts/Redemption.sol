// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Redemption is Initializable, OwnableUpgradeable {
    IERC20Upgradeable public altGoldToken;
    IERC20Upgradeable public usdcToken;

    /// @dev Current redemption rate (USDC per ALT GOLD in basis points)
    /// @notice Default: 1 ALT GOLD = 50 USDC (5000 basis points)
    uint256 public redemptionRate;
    
    /// @dev Fee charged on redemptions (in basis points)
    /// @notice Default: 0.5% (50 basis points)
    uint256 public redemptionFee;
    
    /// @dev Total amount of ALTGOLD redeemed
    uint256 public totalRedeemed;
    
    /// @dev Total fees collected in USDC
    uint256 public totalFeesCollected;
    
    /// @dev Mapping to track user redemption history for compliance
    mapping(address => uint256) public userTotalRedeemed;
    
    /// @dev Mapping to track daily redemption limits per user
    mapping(address => mapping(uint256 => uint256)) public dailyUserRedemptions;
    
    /// @dev Daily redemption limit per user (default: 1000 ALTGOLD)
    uint256 public dailyRedemptionLimit;
    
    /// @dev Treasury address to collect fees
    address public treasury;
    

    event RedemptionRequested(address indexed user, uint256 amount, uint256 timestamp);

     /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(IERC20Upgradeable _altGoldToken, IERC20Upgradeable _usdcToken) initializer public {
        altGoldToken = _altGoldToken;
        usdcToken = _usdcToken;
        __Ownable_init();
    }

    function redeem(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(altGoldToken.balanceOf(msg.sender) >= amount, "Insufficient ALT GOLD balance");
        altGoldToken.transferFrom(msg.sender, address(this), amount);
        usdcToken.transfer(msg.sender, amount); 
        emit RedemptionRequested(msg.sender, amount, block.timestamp);
    }
    //withdraw usdcToken from contract
    function withdrawusdcToken(uint256 amount) external onlyOwner {
        usdcToken.transfer(msg.sender, amount);
    }
    // withdraw altGold tokens from contract
    function withdrawAltGold(uint256 amount) external onlyOwner {
        altGoldToken.transfer(msg.sender, amount);
    }

    //<=================================== get/set functions ===================================================>
    // get usdcToken balance of contract
    function  usdcTokenBalanceofContract() public view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }
    //get altGold token balance of contract
    function altGoldTokenBalanceofContract() public view returns (uint256) {
        return altGoldToken.balanceOf(address(this));
    }
    // sset usdcToken address
    function setusdcToken(IERC20Upgradeable _usdcToken) external onlyOwner {
        usdcToken = _usdcToken;
    }
    //set altGold token address
    function setAltGoldToken(IERC20Upgradeable _altGoldToken) external onlyOwner {
        altGoldToken = _altGoldToken;
    }

}