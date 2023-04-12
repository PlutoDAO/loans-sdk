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

#### ``getLoanIntent(server: ApiStellarNetwork, borrower: string, entryBalance: BalanceDto)``

Returns a loan intent transaction XDR

#### ``getLoanStatus(server: ApiStellarNetwork, borrower: string)``

Returns the loan status

#### ``getSettleDebtIntent(server: ApiStellarNetwork, borrower: string, debtCancellationAsset: ILoanAssetRequest)``

Returns a repay withdraw collateral intent transaction XDR to be signed by the borrower to cancel the remaining debt

#### ``getWithdrawCollateralIntent(server: ApiStellarNetwork, borrower: string)``

Returns a withdraw collateral intent transaction XDR to be signed by the borrower once the loan has paid itself

#### ``sendLoan(server: ApiStellarNetwork, borrower: string, loanSignedTransaction: string)``

Submits a signed loan intent transaction XDR to get a loan

#### ``sendWithdrawCollateral(server: ApiStellarNetwork, borrower: string, withdrawCollateralSignedXdr: string)``

Submits a signed withdraw collateral intent transaction XDR to withdraw the loan collateral
