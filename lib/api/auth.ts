import { User, AuthCredentials, SignupData, AuthResponse, ApiResponse } from '../types';
import { mockUsers } from '../mockData';
import { simulateApiCall, setAuthToken, removeAuthToken } from './config';

/**
 * Authentication API Service
 * 
 * Currently uses dummy authentication. To integrate with real API:
 * 1. Replace simulateApiCall with actual API calls
 * 2. Update endpoints in config.ts
 * 3. Handle real JWT tokens from backend
 */

// Login user
export async function login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
    // Simulate API authentication - replace with real API
    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user) {
        return simulateApiCall({
            data: {} as AuthResponse,
            error: 'Invalid email or password'
        });
    }

    // In real implementation, backend validates password
    // For demo, we'll accept any password
    const token = `dummy_token_${user.id}_${Date.now()}`;
    setAuthToken(token);

    // Store user in localStorage for session persistence
    if (typeof window !== 'undefined') {
        localStorage.setItem('current_user', JSON.stringify(user));
    }

    return simulateApiCall({
        data: { user, token },
        message: 'Login successful'
    });
}

// Signup new user
export async function signup(signupData: SignupData): Promise<ApiResponse<AuthResponse>> {
    // Validate .edu email
    if (!signupData.email.endsWith('.edu')) {
        return simulateApiCall({
            data: {} as AuthResponse,
            error: 'Please use a valid university (.edu) email address'
        });
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === signupData.email);
    if (existingUser) {
        return simulateApiCall({
            data: {} as AuthResponse,
            error: 'An account with this email already exists'
        });
    }

    // Create new user
    const newUser: User = {
        id: `user_${Date.now()}`,
        name: signupData.name,
        email: signupData.email,
        university: signupData.university,
        verified: true, // In real app, would require email verification
        joinedDate: new Date().toISOString(),
        rating: 0,
        reviewCount: 0
    };

    const token = `dummy_token_${newUser.id}_${Date.now()}`;
    setAuthToken(token);

    // Store user in localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('current_user', JSON.stringify(newUser));
    }

    return simulateApiCall({
        data: { user: newUser, token },
        message: 'Account created successfully'
    });
}

// Logout user
export async function logout(): Promise<ApiResponse<{ success: boolean }>> {
    removeAuthToken();

    if (typeof window !== 'undefined') {
        localStorage.removeItem('current_user');
    }

    return simulateApiCall({
        data: { success: true },
        message: 'Logged out successfully'
    });
}

// Get current user from session
export async function getCurrentUser(): Promise<ApiResponse<User | null>> {
    if (typeof window === 'undefined') {
        return simulateApiCall({
            data: null,
            message: 'No session available'
        });
    }

    const userStr = localStorage.getItem('current_user');
    if (!userStr) {
        return simulateApiCall({
            data: null,
            message: 'No user logged in'
        });
    }

    try {
        const user = JSON.parse(userStr) as User;
        return simulateApiCall({
            data: user,
            message: 'User retrieved successfully'
        });
    } catch {
        return simulateApiCall({
            data: null,
            error: 'Invalid session data'
        });
    }
}

// Verify .edu email
export async function verifyEduEmail(email: string): Promise<ApiResponse<{ valid: boolean }>> {
    const isValid = email.endsWith('.edu');

    return simulateApiCall({
        data: { valid: isValid },
        message: isValid ? 'Valid university email' : 'Please use a .edu email address'
    });
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token') && !!localStorage.getItem('current_user');
}
