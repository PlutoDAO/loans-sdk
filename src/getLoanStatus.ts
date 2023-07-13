import fetchLoansApi from './fetchLoansApi';
import ILoanStatusResponse from './types/ILoanStatusResponse';
import { ApiStellarNetwork } from './ApiStellarNetwork';

/**
 * This fetch will return the loan status
 * @param server `string` The Stellar server that the API will work with
 * @param borrower `string` For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
 * @returns {ILoanStatusResponse} `ILoanStatusResponse` The status of the loan
 */
export async function getLoanStatus(
    server: ApiStellarNetwork,
    borrower: string,
): Promise<ILoanStatusResponse> {
    const result = await fetchLoansApi(server, `loan/${borrower}`, 'GET');

    if (result.ok) {
        return result.json();
    } else {
        throw new Error('get_loan_status_error');
    }
}
