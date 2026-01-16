"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthCredentials } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface LoginResult {
    success: boolean;
    error?: string;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: AuthCredentials) => Promise<LoginResult>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on mount
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            // In a real app, you would fetch the user profile here using the token
            // For now, we'll just set a mock user if we have a token (or leave null until profile fetch is implemented)
        }
    }, []);

    const login = async (credentials: AuthCredentials): Promise<LoginResult> => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await response.json();

            if (!response.ok) {
                let errorMessage = 'Login failed';
                if (result.detail) {
                     errorMessage = typeof result.detail === 'string' 
                        ? result.detail 
                        : JSON.stringify(result.detail);
                }
                throw new Error(errorMessage);
            }

            // Store token
            localStorage.setItem('access_token', result.access_token);
            setIsAuthenticated(true);
            
            // Mock setting user data - replace with actual /me endpoint call
            const mockUser: User = {
                id: '1',
                name: 'Student User',
                email: credentials.email,
                university: 'University of Lagos',
                verified: true,
                joinedDate: new Date().toISOString()
            };
            setUser(mockUser);

            return { success: true };
        } catch (error: any) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
