/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '../config';
import { sendLoan } from '../sendLoan';

describe('Send loan', () => {
    afterEach(() => {
        global.fetch = vi.fn();
    });

    it('Should send a signed loan intent XDR', async () => {
        const BORROWER = '1234';
        const XDR = '1234';

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(true),
            }),
        ) as never;

        await sendLoan('testnet', BORROWER, XDR);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.testnetServerUrl}/loan`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    borrower: BORROWER,
                    loanSignedTransaction: XDR,
                }),
            },
        );
    });
});
