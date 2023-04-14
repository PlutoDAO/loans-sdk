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
