// API Configuration
// Replace DUMMY_API_BASE with your real API endpoint when ready

export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.unibuy.dummy',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
    }
};

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    CURRENT_USER: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',

    // Products
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: string) => `/products/${id}`,
    CREATE_PRODUCT: '/products',
    UPDATE_PRODUCT: (id: string) => `/products/${id}`,
    DELETE_PRODUCT: (id: string) => `/products/${id}`,

    // Users
    USER_PROFILE: (id: string) => `/users/${id}`,
    USER_LISTINGS: (id: string) => `/users/${id}/listings`,
    UPDATE_PROFILE: (id: string) => `/users/${id}`,

    // Messages
    CONVERSATIONS: '/messages/conversations',
    MESSAGES: (conversationId: string) => `/messages/conversations/${conversationId}`,
    SEND_MESSAGE: (conversationId: string) => `/messages/conversations/${conversationId}`,
    CREATE_CONVERSATION: '/messages/conversations',
};

// Simulated API delay for realistic experience
export const SIMULATED_DELAY = 500;

// Helper function to simulate API call
export const simulateApiCall = <T>(data: T, delay: number = SIMULATED_DELAY): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
};

// Error handler
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Generic API request handler (for future real API integration)
export async function apiRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    try {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                ...API_CONFIG.HEADERS,
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new ApiError(
                response.status,
                error.message || 'An error occurred',
                error.errors
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Network error occurred');
    }
}

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
};

// Add auth header to requests
export const getAuthHeaders = (): Record<string, string> => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
