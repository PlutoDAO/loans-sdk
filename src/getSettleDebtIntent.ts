import fetchLoansApi from './fetchLoansApi';
import type ILoanAssetRequest from './types/ILoanAssetRequest';
import { ApiStellarNetwork } from './ApiStellarNetwork';

/**
 * This fetch will return a repay withdraw collateral intent transaction XDR to be signed by the borrower to cancel the remaining debt
 * @param server `string` The Stellar server that the API will work with
 * @param borrower `string` For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
 * @param debtCancellationAsset LoanAssetRequest
 * @returns {boolean} `string` XDR
 */
export async function getSettleDebtIntent(
    server: ApiStellarNetwork,
    borrower: string,
    debtCancellationAsset: ILoanAssetRequest,
): Promise<string> {
    const result = await fetchLoansApi(
        server,
        'loan/RepayWithdrawCollateral/Intent',
        'POST',
        {
            borrower,
            debtCancellationAsset,
        },
    );

    return result.json();
}
