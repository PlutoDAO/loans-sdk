import { TooFewOffersError, RequestLoanError } from './errors';
import fetchLoansApi from './fetchLoansApi';
import { ApiStellarNetwork } from './ApiStellarNetwork';

const NOT_ENOUGH_OFFERS_ERROR = 'op_too_few_offers';

/**
 * This fetch will submit a signed loan intent transaction XDR to get a loan
 * @param server `string` The Stellar server that the API will work with
 * @param borrower `string` For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
 * @param loanSignedTransaction `string` XDR
 * @returns {boolean} `Boolean` Result of the submit
 */
export async function sendLoan(
    server: ApiStellarNetwork,
    borrower: string,
    loanSignedTransaction: string,
): Promise<boolean> {
    const result = await fetchLoansApi(server, 'loan', 'POST', {
        borrower,
        loanSignedTransaction,
    });

    if (result.ok) {
        return result.ok;
    } else {
        const response = await result.json();

        if (response.detail.includes(NOT_ENOUGH_OFFERS_ERROR)) {
            throw new TooFewOffersError();
        } else {
            throw new RequestLoanError();
        }
    }
}
