// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "contracts/interfaces/IALTGold.sol";

contract Redemption is Initializable, OwnableUpgradeable , ReentrancyGuardUpgradeable{
    IALTGold public altGoldToken;

    IERC20Upgradeable public usdcToken;

    /// @dev Total amount of ALTGOLD redeemed
    uint256 public totalRedeemed;

    /// @dev Mapping to track user redemption history for compliance
    mapping(address => uint256) public userTotalRedeemed;

    /// @dev Daily redemption limit per user
    uint256 public totalRedemptionLimit;

    /// @dev Event emitted when a redemption is requested
    event RedemptionRequested(
        address indexed user,
        uint256 amount,
        uint256 timestamp
    );

    //modifier
    modifier checkforUSDCbalance(uint256 amount) {
        require(
            usdcTokenBalanceofContract() >= amount,
            "Insufficient USDC in contract"
        );
        _;
    }

    modifier checkforAltGoldBalance(uint256 amount) {
        require(
            altGoldTokenBalanceofContract() >= amount,
            "Insufficient ALT GOLD in contract"
        );
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _altGoldToken,
        address _usdcToken,
        uint256 _RedemptionLimit
    ) public initializer {
        altGoldToken = IALTGold(_altGoldToken);
        usdcToken = IERC20Upgradeable(_usdcToken);
        totalRedemptionLimit = _RedemptionLimit * 10 ** 18; // assuming 18 decimals for ALTGOLD
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    function redeemGoldForUSDC(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(
            amount <= totalRedemptionLimit,
            "Amount exceeds redemption limit"
        );
        require(
            altGoldToken.balanceOf(msg.sender) >= amount,
            "Insufficient ALT GOLD balance"
        );
        // check for user to be whitelisted
        require(
            altGoldToken.isWhitelisted(msg.sender),
            "User not whitelisted for redemption"
        );
        //check for usdt wallet to have enough balance
        require(
            usdcToken.balanceOf(address(this)) >= amount,
            "Insufficient USDC in contract"
        );
        // Transfer ALT GOLD from user to this contract
        require(altGoldToken.transferFrom(msg.sender, address(this), amount),"Token transfer failed");
        // transfer usdcToken to user
        require(usdcToken.transfer(msg.sender, amount), "USDC transfer failed");
        // Update redemption tracking
        totalRedeemed += amount;
        userTotalRedeemed[msg.sender] += amount;
        totalRedeemed -= amount;
        emit RedemptionRequested(msg.sender, amount, block.timestamp);
    }

    function addUsdtTocontract (uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "USDC transfer failed"
        );
    }

    //withdraw usdcToken from contract
    function withdrawusdcToken(
        uint256 amount
    ) external onlyOwner checkforUSDCbalance(amount) {
        usdcToken.transfer(msg.sender, amount);
    }

    // withdraw altGold tokens from contract
    function withdrawAltGold(
        uint256 amount
    ) external onlyOwner checkforAltGoldBalance(amount) {
        altGoldToken.transfer(msg.sender, amount);
    }

    //<=================================== get/set functions ===================================================>
    // get usdcToken balance of contract
    function usdcTokenBalanceofContract() public view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }

    //get altGold token balance of contract
    function altGoldTokenBalanceofContract() public view returns (uint256) {
        return altGoldToken.balanceOf(address(this));
    }

    //get total redeemed amount
    function getTotalRedeemed() public view returns (uint256) {
        return totalRedeemed;
    }

    // get user total redeemed amount
    function getUserTotalRedeemed(address user) public view returns (uint256) {
        return userTotalRedeemed[user];
    }

    // sset usdcToken address
    function setusdcToken(IERC20Upgradeable _usdcToken) external onlyOwner {
        usdcToken = _usdcToken;
    }

    //set altGold token address
    function setAltGoldToken(address _altGoldToken) external onlyOwner {
        altGoldToken = IALTGold(_altGoldToken);
    }

    // set totalRedemptionLimit
    function setTotalRedemptionLimit(
        uint256 _totalRedemptionLimit
    ) external onlyOwner {
        totalRedemptionLimit = _totalRedemptionLimit * 10 ** 18; // assuming 18 decimals for ALTGOLD
    }
}
