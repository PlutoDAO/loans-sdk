import { LoanAssetRequest } from '../LoanAssetRequest';

export default interface IBalanceDto {
    asset: LoanAssetRequest;
    amount: string;
}
