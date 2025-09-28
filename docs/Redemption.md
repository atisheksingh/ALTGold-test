# Redemption









## Methods

### addUsdtTocontract

```solidity
function addUsdtTocontract(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### altGoldToken

```solidity
function altGoldToken() external view returns (contract IALTGold)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IALTGold | undefined |

### altGoldTokenBalanceofContract

```solidity
function altGoldTokenBalanceofContract() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getTotalRedeemed

```solidity
function getTotalRedeemed() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getUserTotalRedeemed

```solidity
function getUserTotalRedeemed(address user) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### initialize

```solidity
function initialize(address _altGoldToken, address _usdcToken, uint256 _RedemptionLimit) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _altGoldToken | address | undefined |
| _usdcToken | address | undefined |
| _RedemptionLimit | uint256 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### redeemGoldForUSDC

```solidity
function redeemGoldForUSDC(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.*


### setAltGoldToken

```solidity
function setAltGoldToken(address _altGoldToken) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _altGoldToken | address | undefined |

### setTotalRedemptionLimit

```solidity
function setTotalRedemptionLimit(uint256 _totalRedemptionLimit) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _totalRedemptionLimit | uint256 | undefined |

### setusdcToken

```solidity
function setusdcToken(contract IERC20Upgradeable _usdcToken) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _usdcToken | contract IERC20Upgradeable | undefined |

### totalRedeemed

```solidity
function totalRedeemed() external view returns (uint256)
```



*Total amount of ALTGOLD redeemed*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalRedemptionLimit

```solidity
function totalRedemptionLimit() external view returns (uint256)
```



*Daily redemption limit per user*


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



*Event emitted when a redemption is requested*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| amount  | uint256 | undefined |
| timestamp  | uint256 | undefined |



