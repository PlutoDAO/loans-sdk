/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import npmPackage from '../index';

describe('NPM Package', () => {
    it('should be an object', () => {
        const properties = [
            'getLoanIntent',
            'getLoanStatus',
            'sendLoan',
            'getWithdrawCollateralIntent',
            'getSettleDebtIntent',
            'sendWithdrawCollateral',
            'LoanAssetRequest',
            'BalanceDto',
            'LoanStatusResponse',
            'TooFewOffersError',
            'RequestLoanError',
            'WithdrawCollateralError',
        ];

        for (const property of properties) {
            expect(npmPackage).to.have.property(property);
        }
    });
});
