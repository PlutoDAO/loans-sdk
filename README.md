# loans-sdk

loans-sdk is a Javascript library for communicating with the API of loans. It is used to take pluto-loans and/or withdraw the collateral.

See the [accepted assets](#accepted-assets) for taking a loan and settle the debt

This project is built using Typescript, and vitest for unit testing

See the [examples](docs/reference/examples.md) to use the SDK

## Quick start

### Install

1. Install it using npm:

```shell
npm i plutodao-loans-sdk
```

2. import/require into your project:

```js
import * as loansSdk from 'plutodao-loans-sdk';
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

## Classes

### The loans-sdk will export the following classes:

#### LoanAssetRequest

A class representing the asset required for the API

```ts
class LoanAssetRequest implements ILoanAssetRequest {
    public code: string;
    public issuer: string;
    public isNative: boolean;

    constructor(assetCode: string, assetIssuer: string, isNative: boolean) {
        this.code = assetCode;
        this.issuer = assetIssuer;
        this.isNative = isNative;
    }
}
```

#### LoanStatusResponse

A class representing the status of a loan

```ts
class LoanStatusResponse implements ILoanStatusResponse {
    public percentagePaid: number;
    public remainingDebt: number;
    public userTotalYusdcInVault: number;

    constructor(
        percentagePaid: number,
        remainingDebt: number,
        userTotalYusdcInVault: number,
    ) {
        this.percentagePaid = percentagePaid;
        this.remainingDebt = remainingDebt;
        this.userTotalYusdcInVault = userTotalYusdcInVault;
    }
}
```

#### BalanceDto

A class representing the required info to determine which asset is used to take the loan and how much will be the amount

```ts
class BalanceDto implements IBalanceDto {
    public asset: LoanAssetRequest;
    public amount: string;

    constructor(asset: LoanAssetRequest, amount: string) {
        this.asset = asset;
        this.amount = amount;
    }
}
```

## Accepted assets

#### To take a loan

-   XLM
-   YXLM
-   PUSD
-   USDC
-   YUSDC
-   ARS
-   ARST
-   AQUA
-   BTC
-   ETH

#### To settle the debt

-   PUSD
-   USDC
-   YUSDC
