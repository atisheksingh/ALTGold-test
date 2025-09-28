// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title IALTGold
 * @dev Interface for the ALTGold token contract, providing minting, burning, whitelist, and pausing functionalities.
 */
interface IALTGold {
    /**
     * @notice Mints new tokens to the specified address.
     * @param to The address to receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external;

    /**
     * @notice Burns a specific amount of tokens from the caller's account.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external;

    /**
     * @notice Burns a specific amount of tokens from a specified account, deducting from the caller's allowance.
     * @param account The address from which tokens will be burned.
     * @param amount The amount of tokens to burn.
     */

    function burnFrom(address account, uint256 amount) external;

    /**
     * @notice Adds an address to the whitelist, enabling special permissions.
     * @param account The address to add to the whitelist.
     */
    function addToWhitelist(address account) external;

    /**
     * @notice Removes an address from the whitelist, revoking special permissions.
     * @param account The address to remove from the whitelist.
     */

    function removeFromWhitelist(address account) external;

    /**
     * @notice Checks if an address is whitelisted.
     * @param account The address to check.
     * @return True if the address is whitelisted, false otherwise.
     */

    function isWhitelisted(address account) external view returns (bool);

    /**
     * @notice Pauses all token transfers and sensitive operations.
     */

    function pause() external;

    /**
     * @notice Unpauses the contract, resuming normal operations.
     */

    function unpause() external;

    /**
     * @notice Returns the version of the contract.
     * @return The version string.
     */
    function version() external view returns (string memory);
    /**
     * @notice Returns the token balance of a specific account.
     * @param account The address of the account to query.
     * @return The token balance of the specified account.
     */
    function balanceOf(address account) external view returns (uint256);
  
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);

}
