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
