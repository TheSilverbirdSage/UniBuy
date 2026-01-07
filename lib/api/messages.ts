import { Message, Conversation, ApiResponse } from '../types';
import { mockMessages, mockConversations, mockUsers, mockProducts } from '../mockData';
import { simulateApiCall } from './config';

/**
 * Messaging API Service
 * 
 * Currently uses dummy data. To integrate with real API:
 * 1. Replace simulateApiCall with actual API calls
 * 2. For real-time messaging, integrate WebSocket connection
 * 3. Update endpoints in config.ts
 */

// Get all conversations for current user
export async function getConversations(userId: string): Promise<ApiResponse<Conversation[]>> {
    // Filter conversations where user is a participant
    const userConversations = mockConversations.filter(conv =>
        conv.participants.some(p => p.id === userId)
    );

    return simulateApiCall({
        data: userConversations,
        message: 'Conversations retrieved successfully'
    });
}

// Get messages in a conversation
export async function getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    const messages = mockMessages.filter(m => m.conversationId === conversationId);

    return simulateApiCall({
        data: messages,
        message: 'Messages retrieved successfully'
    });
}

// Send a message
export async function sendMessage(
    conversationId: string,
    senderId: string,
    receiverId: string,
    content: string,
    productId?: string
): Promise<ApiResponse<Message>> {
    const newMessage: Message = {
        id: `msg_${Date.now()}`,
        conversationId,
        senderId,
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        read: false,
        productId
    };

    // In real implementation, this would POST to API
    return simulateApiCall({
        data: newMessage,
        message: 'Message sent successfully'
    });
}

// Create a new conversation
export async function createConversation(
    userId: string,
    otherUserId: string,
    productId?: string
): Promise<ApiResponse<Conversation>> {
    // Check if conversation already exists
    const existingConv = mockConversations.find(conv =>
        conv.participants.some(p => p.id === userId) &&
        conv.participants.some(p => p.id === otherUserId) &&
        (!productId || conv.product?.id === productId)
    );

    if (existingConv) {
        return simulateApiCall({
            data: existingConv,
            message: 'Conversation already exists'
        });
    }

    // Create new conversation
    const user = mockUsers.find(u => u.id === userId);
    const otherUser = mockUsers.find(u => u.id === otherUserId);
    const product = productId ? mockProducts.find(p => p.id === productId) : undefined;

    if (!user || !otherUser) {
        return simulateApiCall({
            data: {} as Conversation,
            error: 'User not found'
        });
    }

    // Create initial message
    const initialMessage: Message = {
        id: `msg_${Date.now()}`,
        conversationId: `conv_${Date.now()}`,
        senderId: userId,
        receiverId: otherUserId,
        content: product ? `Hi! I'm interested in "${product.title}"` : 'Hi!',
        timestamp: new Date().toISOString(),
        read: false,
        productId
    };

    const newConversation: Conversation = {
        id: initialMessage.conversationId,
        participants: [user, otherUser],
        product,
        lastMessage: initialMessage,
        unreadCount: 0,
        updatedAt: new Date().toISOString()
    };

    return simulateApiCall({
        data: newConversation,
        message: 'Conversation created successfully'
    });
}

// Mark messages as read
export async function markAsRead(conversationId: string, userId: string): Promise<ApiResponse<{ success: boolean }>> {
    // In real implementation, this would update message read status
    return simulateApiCall({
        data: { success: true },
        message: 'Messages marked as read'
    });
}

// Get unread message count
export async function getUnreadCount(userId: string): Promise<ApiResponse<{ count: number }>> {
    const userConversations = mockConversations.filter(conv =>
        conv.participants.some(p => p.id === userId)
    );

    const unreadCount = userConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

    return simulateApiCall({
        data: { count: unreadCount },
        message: 'Unread count retrieved successfully'
    });
}
