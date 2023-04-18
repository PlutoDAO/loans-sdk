/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '../config';
import { getWithdrawCollateralIntent } from '../getWithdrawCollateralIntent';

describe('Withdraw collateral intent', () => {
    afterEach(() => {
        global.fetch = vi.fn();
    });

    it('Should get a withdraw collateral intent XDR', async () => {
        const BORROWER = '1234';
        const XDR = '1234';

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(XDR),
            }),
        ) as never;

        const withdrawCollateralXDR = await getWithdrawCollateralIntent(
            'testnet',
            BORROWER,
        );

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.testnetServerUrl}/loan/WithdrawCollateral/Intent`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    borrower: BORROWER,
                }),
            },
        );

        expect(withdrawCollateralXDR).toEqual(XDR);
    });
});
