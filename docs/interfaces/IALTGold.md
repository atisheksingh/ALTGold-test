# IALTGold



> IALTGold



*Interface for the ALTGold token contract, providing minting, burning, whitelist, and pausing functionalities.*

## Methods

### addToWhitelist

```solidity
function addToWhitelist(address account) external nonpayable
```

Adds an address to the whitelist, enabling special permissions.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The address to add to the whitelist. |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

Returns the token balance of a specific account.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The address of the account to query. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The token balance of the specified account. |

### burn

```solidity
function burn(uint256 amount) external nonpayable
```

Burns a specific amount of tokens from the caller&#39;s account.



#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | The amount of tokens to burn. |

### burnFrom

```solidity
function burnFrom(address account, uint256 amount) external nonpayable
```

Burns a specific amount of tokens from a specified account, deducting from the caller&#39;s allowance.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The address from which tokens will be burned. |
| amount | uint256 | The amount of tokens to burn. |

### isWhitelisted

```solidity
function isWhitelisted(address account) external view returns (bool)
```

Checks if an address is whitelisted.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The address to check. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the address is whitelisted, false otherwise. |

### mint

```solidity
function mint(address to, uint256 amount) external nonpayable
```

Mints new tokens to the specified address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | The address to receive the minted tokens. |
| amount | uint256 | The amount of tokens to mint. |

### pause

```solidity
function pause() external nonpayable
```

Pauses all token transfers and sensitive operations.




### removeFromWhitelist

```solidity
function removeFromWhitelist(address account) external nonpayable
```

Removes an address from the whitelist, revoking special permissions.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The address to remove from the whitelist. |

### transfer

```solidity
function transfer(address to, uint256 amount) external nonpayable returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) external nonpayable returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### unpause

```solidity
function unpause() external nonpayable
```

Unpauses the contract, resuming normal operations.




### version

```solidity
function version() external view returns (string)
```

Returns the version of the contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | The version string. |




