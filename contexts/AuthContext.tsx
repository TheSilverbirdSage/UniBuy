"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthCredentials, SignupData } from '@/lib/types';
import * as authApi from '@/lib/api/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: AuthCredentials) => Promise<{ success: boolean; error?: string }>;
    signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from session on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await authApi.getCurrentUser();
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to load user:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (credentials: AuthCredentials) => {
        try {
            const response = await authApi.login(credentials);

            if (response.error) {
                return { success: false, error: response.error };
            }

            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    const signup = async (data: SignupData) => {
        try {
            const response = await authApi.signup(data);

            if (response.error) {
                return { success: false, error: response.error };
            }

            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Signup failed. Please try again.' };
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
