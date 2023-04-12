# loans-sdk

loans-sdk is a Javascript library for communicating with the API of loans. It is used to take pluto-loans and/or withdraw the collateral.

## Quick start

### Install

1. Install it using npm:

```shell
npm i plutodao-loans-sdk
```

2. import/require into your project:

```js
import * as loansSdk from "plutodao-loans-sdk";
```

## SDK

The loans-sdk will export the following functions:

# `getLoanIntent(server: ApiStellarNetwork, borrower: string, entryBalance: BalanceDto)`

Returns a loan intent transaction XDR
