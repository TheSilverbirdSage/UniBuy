export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    TIMEOUT: 10000,
    SIMULATE_DELAY: 800 // ms to simulate network latency
};

/**
 * Simulates an API call with a delay
 * @param data The data to return
 * @param delayMs Optional delay in milliseconds (defaults to API_CONFIG.SIMULATE_DELAY)
 * @returns Promise resolving to the data
 */
export async function simulateApiCall<T>(data: T, delayMs: number = API_CONFIG.SIMULATE_DELAY): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delayMs);
    });
}
