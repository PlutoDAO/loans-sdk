import { WithdrawCollateralError } from './errors';
import fetchLoansApi from './fetchLoansApi';
import { ApiStellarNetwork } from './ApiStellarNetwork';

/**
 * This fetch will submit a signed withdraw collateral intent transaction XDR to withdraw the loan collateral
 * @param server `string` The Stellar server that the API will work with
 * @param borrower `string` For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
 * @param withdrawCollateralSignedXdr `string` XDR that can come from the getWithdrawCollateralIntent or the getSettleDebtIntent function
 * @returns {boolean} `boolean` Result of the submit
 */
export async function sendWithdrawCollateral(
    server: ApiStellarNetwork,
    borrower: string,
    withdrawCollateralSignedXdr: string,
): Promise<boolean> {
    const result = await fetchLoansApi(
        server,
        'loan/withdrawCollateral',
        'POST',
        {
            borrower,
            withdrawCollateralSignedXdr,
        },
    );

    if (result.ok) {
        return result.ok;
    } else {
        throw new WithdrawCollateralError();
    }
}
