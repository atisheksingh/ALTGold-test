// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ALTGold is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    mapping(address => bool) private _whitelist;
    // custom events indxexed for state varibales 
    event WhitelistUpdated(address indexed account, bool added);
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);
    
    // custom errors for gas optimization
    error AddressNotWhitelisted();
    error TransferToNonWhitelisted();

    /// @dev Maximum tokens that can be minted (100 million tokens)
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("ALT GOLD", "ALTGOLD");
        __ERC20Burnable_init();
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }
    // mint erc20 token only by owner to whitelisted address
    function mint(address to, uint256 amount) public whenNotPaused onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting exceeds max supply");
       require(_whitelist[to], 'Address not whitelisted');
        _mint(to, amount);
        emit Mint(to, amount);
    }
    // burn erc20 token only by owner from whitelisted address
    function burn(uint256 amount) public override whenNotPaused {
        super.burn(amount);
        emit Burn(msg.sender, amount);
    }
    // burn from whitelisted address by owner
    function burnFrom(address account, uint256 amount) public override whenNotPaused  {
        super.burnFrom(account, amount);
        emit Burn(account, amount);
    }
    // add/remove address to/from whitelist
    function addToWhitelist(address account) public whenNotPaused onlyOwner {
        _whitelist[account] = true;
        emit WhitelistUpdated(account, true);
    }
    // add multiple addresses to whitelist
    function addressesToWhitelist(address[] calldata accounts) public whenNotPaused onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            _whitelist[accounts[i]] = true;
            emit WhitelistUpdated(accounts[i], true);
        }
    }
    // remove address from whitelist
    function removeFromWhitelist(address account) public whenNotPaused onlyOwner {
        _whitelist[account] = false;
        emit WhitelistUpdated(account, false);
    }
    // check if address is whitelisted
    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }
    // pause the contract
    function pause() public onlyOwner {
        _pause();
    }
    // unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }

    // override _beforeTokenTransfer to include whenNotPaused and whitelist check
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        if (from != address(0) && to != address(0)) { 
            // Both sender and recipient must be whitelisted for regular transfers
            if (!isWhitelisted(from)) {
                revert AddressNotWhitelisted();

            }
            if (!isWhitelisted(to)) {
                revert TransferToNonWhitelisted();
            }
            
        }
        super._beforeTokenTransfer(from, to, amount);
    } 
    // authorize upgrade only by owner for UUPS pattern 
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}