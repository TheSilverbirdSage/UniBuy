import { User, Product, ApiResponse } from '../types';
import { mockUsers, mockProducts } from '../mockData';
import { simulateApiCall } from './config';

/**
 * Users API Service
 * 
 * Currently uses dummy data. To integrate with real API:
 * 1. Replace simulateApiCall with actual API calls
 * 2. Update endpoints in config.ts
 */

// Get user profile by ID
export async function getUserProfile(userId: string): Promise<ApiResponse<User>> {
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
        return simulateApiCall({
            data: {} as User,
            error: 'User not found'
        });
    }

    return simulateApiCall({
        data: user,
        message: 'User profile retrieved successfully'
    });
}

// Update user profile
export async function updateUserProfile(
    userId: string,
    updates: Partial<User>
): Promise<ApiResponse<User>> {
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
        return simulateApiCall({
            data: {} as User,
            error: 'User not found'
        });
    }

    const updatedUser = { ...user, ...updates };

    // In real implementation, update localStorage
    if (typeof window !== 'undefined') {
        const currentUserStr = localStorage.getItem('current_user');
        if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            if (currentUser.id === userId) {
                localStorage.setItem('current_user', JSON.stringify(updatedUser));
            }
        }
    }

    return simulateApiCall({
        data: updatedUser,
        message: 'Profile updated successfully'
    });
}

// Get user's product listings
export async function getUserListings(userId: string): Promise<ApiResponse<Product[]>> {
    const userListings = mockProducts.filter(p => p.sellerId === userId);

    return simulateApiCall({
        data: userListings,
        message: 'User listings retrieved successfully'
    });
}

// Get user statistics
export async function getUserStats(userId: string): Promise<ApiResponse<{
    totalListings: number;
    activeListings: number;
    soldItems: number;
    totalEarnings: number;
}>> {
    const userListings = mockProducts.filter(p => p.sellerId === userId);
    const activeListings = userListings.filter(p => p.status === 'available');
    const soldItems = userListings.filter(p => p.status === 'sold');

    // Calculate mock earnings
    const totalEarnings = soldItems.reduce((sum, item) => sum + item.price, 0);

    return simulateApiCall({
        data: {
            totalListings: userListings.length,
            activeListings: activeListings.length,
            soldItems: soldItems.length,
            totalEarnings
        },
        message: 'User statistics retrieved successfully'
    });
}
