## Get a loan

List of accepted assets

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

Objects

```javascript
import type ILoanAssetRequest from './types/ILoanAssetRequest';

export class LoanAssetRequest implements ILoanAssetRequest {
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

```javascript
import { LoanAssetRequest } from './LoanAssetRequest';
import type IBalanceDto from './types/IBalanceDto';

export class BalanceDto implements IBalanceDto {
    public asset: LoanAssetRequest;
    public amount: string;

    constructor(asset: LoanAssetRequest, amount: string) {
        this.asset = asset;
        this.amount = amount;
    }
}
```

Examples

```javascript
// First we need to get the XDR that will be signed by the borrower

import {LoanAssetRequest, ApiStellarNetwork} from 'plutodao-loans-sdk';

const server: ApiStellarNetwork = 'testnet'; // 'testnet' | 'public'
const borrower 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
const asset = new LoanAssetRequest('yUSDC', 'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF', false);
const amount = '150';
const entryBalance = new BalanceDto(asset, amount);

const loanIntentXdr = await getLoanIntent(server, borrower, entryBalance);

// Then, after the borrower signs the transaction, we send the loan

const signedLoanIntentXdr = 'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendLoan(server, borrower, signedLoanIntentXdr);
```

## Check loan status

```javascript
const server = 'testnet'; // 'testnet' | 'public'
const borrower 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';

const loanStatus = await getLoanStatus(server, borrower);

loanStatus = {
  percentagePaid: number,
  remainingDebt: number,
  userTotalYusdcInVault: number
}
```

## Withdraw collateral

There are two ways to let the borrower withdraw its collateral, by letting the loan paid itself or by settling the debt

### Loan paid itself

```javascript
// Only when the loand paid itself

const server: ApiStellarNetwork  = 'testnet'; // 'testnet' | 'public'
const borrower 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';

const withdrawCollateralIntentXDR = await getWithdrawCollateralIntent(server, borrower);
```

### Settle debt

List of accepted assets

-   PUSD
-   USDC
-   YUSDC

```javascript
const asset = new LoanAssetRequest(
    'yUSDC',
    'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF',
    false,
);

const settleDebtXDR = await getSettleDebtIntent(server, borrower, asset);
```

When the borrower signs the XDR, we send it

```javascript
const signedWithdrawCollateralXdr =
    'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendWithdrawCollateral(server, borrower, signedWithdrawCollateralXdr);
```
