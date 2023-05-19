import type ILoanAssetRequest from './types/ILoanAssetRequest';

export class LoanAssetRequest implements ILoanAssetRequest {
    public code?: string;
    public issuer?: string;
    public isNative: boolean;

    constructor(isNative: boolean, assetCode?: string, assetIssuer?: string) {
        this.code = assetCode;
        this.issuer = assetIssuer;
        this.isNative = isNative;

        if (isNative) {
            this.code = 'XLM';
        }
    }
}
