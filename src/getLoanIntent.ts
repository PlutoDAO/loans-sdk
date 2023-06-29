import { BalanceDto } from './BalanceDto';
import fetchLoansApi from './fetchLoansApi';
import { ApiStellarNetwork } from './ApiStellarNetwork';

/**
 * This fetch will return a loan intent transaction XDR
 * @param server `string` The Stellar server that the API will work with
 * @param borrower `string` For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
 * @param entryBalance `BalanceDto`
 * @returns {string} `string` XDR
 */
export async function getLoanIntent(
    server: ApiStellarNetwork,
    borrower: string,
    entryBalance: BalanceDto,
): Promise<string> {
    const result = await fetchLoansApi(server, 'loan/Intent', 'POST', {
        borrower,
        entryBalance,
    });

    if (result.ok) {
        return result.json();
    } else {
        throw new Error('get_loan_intent_error');
    }
}
