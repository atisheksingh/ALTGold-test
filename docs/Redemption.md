# Redemption









## Methods

### altGoldToken

```solidity
function altGoldToken() external view returns (contract IERC20Upgradeable)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### altGoldTokenBalanceofContract

```solidity
function altGoldTokenBalanceofContract() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### dailyRedemptionLimit

```solidity
function dailyRedemptionLimit() external view returns (uint256)
```



*Daily redemption limit per user (default: 1000 ALTGOLD)*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### dailyUserRedemptions

```solidity
function dailyUserRedemptions(address, uint256) external view returns (uint256)
```



*Mapping to track daily redemption limits per user*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### initialize

```solidity
function initialize(contract IERC20Upgradeable _altGoldToken, contract IERC20Upgradeable _usdcToken) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _altGoldToken | contract IERC20Upgradeable | undefined |
| _usdcToken | contract IERC20Upgradeable | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### redeem

```solidity
function redeem(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### redemptionFee

```solidity
function redemptionFee() external view returns (uint256)
```

Default: 0.5% (50 basis points)

*Fee charged on redemptions (in basis points)*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### redemptionRate

```solidity
function redemptionRate() external view returns (uint256)
```

Default: 1 ALT GOLD = 50 USDC (5000 basis points)

*Current redemption rate (USDC per ALT GOLD in basis points)*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.*


### setAltGoldToken

```solidity
function setAltGoldToken(contract IERC20Upgradeable _altGoldToken) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _altGoldToken | contract IERC20Upgradeable | undefined |

### setusdcToken

```solidity
function setusdcToken(contract IERC20Upgradeable _usdcToken) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _usdcToken | contract IERC20Upgradeable | undefined |

### totalFeesCollected

```solidity
function totalFeesCollected() external view returns (uint256)
```



*Total fees collected in USDC*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalRedeemed

```solidity
function totalRedeemed() external view returns (uint256)
```



*Total amount of ALTGOLD redeemed*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### treasury

```solidity
function treasury() external view returns (address)
```



*Treasury address to collect fees*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### usdcToken

```solidity
function usdcToken() external view returns (contract IERC20Upgradeable)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20Upgradeable | undefined |

### usdcTokenBalanceofContract

```solidity
function usdcTokenBalanceofContract() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### userTotalRedeemed

```solidity
function userTotalRedeemed(address) external view returns (uint256)
```



*Mapping to track user redemption history for compliance*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### withdrawAltGold

```solidity
function withdrawAltGold(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### withdrawusdcToken

```solidity
function withdrawusdcToken(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |



## Events

### Initialized

```solidity
event Initialized(uint8 version)
```



*Triggered when the contract has been initialized or reinitialized.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### RedemptionRequested

```solidity
event RedemptionRequested(address indexed user, uint256 amount, uint256 timestamp)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| amount  | uint256 | undefined |
| timestamp  | uint256 | undefined |



