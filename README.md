# loans-sdk

loans-sdk is a Javascript library for communicating with the API of loans. It is used to take pluto-loans and/or withdraw the collateral.

See the [accepted assets](#accepted-assets) for taking a loan and settle the debt

This project is built using Typescript, and vitest for unit testing

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

### The loans-sdk will export the following functions:

```js
getLoanIntent(server: ApiStellarNetwork, borrower: string, entryBalance: BalanceDto)
```

Returns a loan intent transaction XDR

```js
getLoanStatus(server: ApiStellarNetwork, borrower: string)
```

Returns the loan status

```js
getSettleDebtIntent(server: ApiStellarNetwork, borrower: string, debtCancellationAsset: ILoanAssetRequest)
```

Returns a repay withdraw collateral intent transaction XDR to be signed by the borrower to cancel the remaining debt

```js
getWithdrawCollateralIntent(server: ApiStellarNetwork, borrower: string)
```

Returns a withdraw collateral intent transaction XDR to be signed by the borrower once the loan has paid itself

```js
sendLoan(server: ApiStellarNetwork, borrower: string, loanSignedTransaction: string)
```

Submits a signed loan intent transaction XDR to get a loan

```js
sendWithdrawCollateral(server: ApiStellarNetwork, borrower: string, withdrawCollateralSignedXdr: string)
```

Submits a signed withdraw collateral intent transaction XDR to withdraw the loan collateral

## Types

The loans-sdk will export the following types:

#### ILoanAssetRequest

An object representing the asset required for the API

```ts
interface ILoanAssetRequest {
  isNative: boolean;
  code: string;
  issuer: string;
}
```

#### ILoanStatusResponse

An object representing the status of a loan

```ts
interface ILoanStatusResponse {
  percentagePaid: number;
  remainingDebt: number;
  userTotalYusdcInVault: number;
}
```

#### IBalanceDto

An object representing the required info to determine how much will be the loan

```ts
interface IBalanceDto {
  asset: LoanAssetRequest;
  amount: string;
}
```

## Accepted assets

#### To take a loan

- XLM
- YXLM
- PUSD
- USDC
- YUSDC
- ARS
- ARST
- AQUA
- BTC
- ETH

#### To settle the debt

- PUSD
- USDC
- YUSDC
