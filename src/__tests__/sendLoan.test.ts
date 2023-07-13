/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '../config';
import { sendLoan } from '../sendLoan';
import { TooFewOffersError } from '../errors';

const failed = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
    title: 'An error occurred while processing your request.',
    status: 500,
    detail: 'op_too_few_offers',
    traceId: '00-90aa545795c0a25e47086c49cc2d8c90-13062f7b74e3c42b-00',
};

const BORROWER = '1234';
const XDR = '1234';

describe('Send loan', () => {
    afterEach(() => {
        global.fetch = vi.fn();
    });

    it('Should send a signed loan intent XDR', async () => {
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

    it('Should throw an error when there are too few offers', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve(failed),
            }),
        ) as never;

        await expect(sendLoan('testnet', BORROWER, XDR)).rejects.toStrictEqual(
            new TooFewOffersError(),
        );
    });
});
