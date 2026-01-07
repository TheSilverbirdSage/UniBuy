// Core type definitions for UniBuy platform

export interface User {
    id: string;
    name: string;
    email: string;
    university: string;
    avatar?: string;
    verified: boolean;
    joinedDate: string;
    rating?: number;
    reviewCount?: number;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    condition: ProductCondition;
    images: string[];
    sellerId: string;
    sellerName: string;
    sellerAvatar?: string;
    location: string;
    campus: string;
    createdAt: string;
    views: number;
    saved: number;
    status: 'available' | 'pending' | 'sold';
}

export type ProductCategory =
    | 'textbooks'
    | 'dorm-gear'
    | 'tech'
    | 'clothing'
    | 'furniture'
    | 'sports'
    | 'other';

export type ProductCondition =
    | 'new'
    | 'like-new'
    | 'good'
    | 'fair'
    | 'poor';

export interface CartItem {
    product: Product;
    quantity: number;
    addedAt: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    read: boolean;
    productId?: string;
}

export interface Conversation {
    id: string;
    participants: User[];
    product?: Product;
    lastMessage: Message;
    unreadCount: number;
    updatedAt: string;
}

export interface ProductFilters {
    category?: ProductCategory;
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
    campus?: string;
    search?: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface SignupData extends AuthCredentials {
    name: string;
    university: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
