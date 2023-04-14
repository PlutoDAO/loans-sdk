import config from './config';
import { ApiStellarNetwork } from './ApiStellarNetwork';

export default async function fetchLoansApi<T>(
    server: ApiStellarNetwork,
    endpoint: string,
    method: string,
    body?: T,
): Promise<Response> {
    let apiUrl = '';

    if (server === 'public') {
        apiUrl = config.publicServerUrl;
    } else if (server === 'testnet') {
        apiUrl = config.testnetServerUrl;
    }

    const result = await fetch(`${apiUrl}/${endpoint}`, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    return result;
}
