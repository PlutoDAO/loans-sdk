/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BalanceDto } from '../BalanceDto';
import config from '../config';
import { getLoanIntent } from '../getLoanIntent';
import { LoanAssetRequest } from '../LoanAssetRequest';

describe('Get loan intent', () => {
    afterEach(() => {
        global.fetch = vi.fn();
    });

    it('should fetch with server url', async () => {
        const BORROWER = '1234';
        const COLLATERAL_AMOUNT = '150';
        const ASSET_CODE = 'yUSDC';
        const ASSET_ISSUER = '1234';
        const XDR = '1234';

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(XDR),
            }),
        ) as never;

        const asset = new LoanAssetRequest(ASSET_CODE, ASSET_ISSUER, false);
        const balanceDto = new BalanceDto(asset, COLLATERAL_AMOUNT);

        const xdr = await getLoanIntent('testnet', BORROWER, balanceDto);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.testnetServerUrl}/loan/Intent`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    borrower: BORROWER,
                    entryBalance: balanceDto,
                }),
            },
        );

        expect(xdr).toEqual(XDR);
    });
});
