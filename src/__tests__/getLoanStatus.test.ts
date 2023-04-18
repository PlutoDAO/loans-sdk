/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '../config';
import { getLoanStatus } from '../getLoanStatus';
import loanStatusJSON from './fixture/loanStatus.json';

describe('Get loan status', () => {
    afterEach(() => {
        global.fetch = vi.fn();
    });

    it('should fetch the loan status', async () => {
        const BORROWER = '1234';

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(loanStatusJSON),
            }),
        ) as never;

        const loanStatus = await getLoanStatus('testnet', BORROWER);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.testnetServerUrl}/loan/${BORROWER}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: null,
            },
        );

        expect(loanStatus).toEqual(loanStatusJSON);
    });
});
