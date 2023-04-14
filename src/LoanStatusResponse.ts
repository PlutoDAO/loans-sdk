import ILoanStatusResponse from './types/ILoanStatusResponse';

export class LoanStatusResponse implements ILoanStatusResponse {
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
