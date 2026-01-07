"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User as UserIcon } from 'lucide-react';
import { Conversation, Message } from '@/lib/types';
import { getConversations, getMessages, sendMessage } from '@/lib/api/messages';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MessagesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        loadConversations();
    }, [user, router]);

    const loadConversations = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const response = await getConversations(user.id);
            if (response.data) {
                setConversations(response.data);
                if (response.data.length > 0) {
                    selectConversation(response.data[0]);
                }
            }
        } catch (error) {
            console.error('Failed to load conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectConversation = async (conversation: Conversation) => {
        setSelectedConversation(conversation);
        try {
            const response = await getMessages(conversation.id);
            if (response.data) {
                setMessages(response.data);
            }
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !user) return;

        const otherUser = selectedConversation.participants.find(p => p.id !== user.id);
        if (!otherUser) return;

        try {
            const response = await sendMessage(
                selectedConversation.id,
                user.id,
                otherUser.id,
                newMessage,
                selectedConversation.product?.id
            );

            if (response.data) {
                setMessages([...messages, response.data]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-20">
                        <Link href="/marketplace" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
                            <ArrowLeft size={20} />
                            Back to Marketplace
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-12">Messages</h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl">
                        <div className="inline-block p-8 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <UserIcon size={64} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">No messages yet</h2>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-8">
                            Start a conversation by messaging a seller from a product page
                        </p>
                        <Link href="/marketplace">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-colors">
                                Browse Products
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800">
                        {/* Conversations List */}
                        <div className="lg:col-span-1 border-r border-gray-100 dark:border-gray-800">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white">Conversations</h2>
                            </div>
                            <div className="overflow-y-auto max-h-[600px]">
                                {conversations.map(conversation => {
                                    const otherUser = conversation.participants.find(p => p.id !== user.id);
                                    return (
                                        <button
                                            key={conversation.id}
                                            onClick={() => selectConversation(conversation)}
                                            className={`w-full p-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left ${selectedConversation?.id === conversation.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={otherUser?.avatar || 'https://via.placeholder.com/48'}
                                                    alt={otherUser?.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-black text-gray-900 dark:text-white truncate">{otherUser?.name}</p>
                                                    {conversation.product && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate font-medium">
                                                            {conversation.product.title}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                                                        {conversation.lastMessage.content}
                                                    </p>
                                                </div>
                                                {conversation.unreadCount > 0 && (
                                                    <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
                                                        {conversation.unreadCount}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="lg:col-span-2 flex flex-col">
                            {selectedConversation ? (
                                <>
                                    {/* Header */}
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={selectedConversation.participants.find(p => p.id !== user.id)?.avatar || 'https://via.placeholder.com/48'}
                                                alt="User"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-black text-gray-900 dark:text-white">
                                                    {selectedConversation.participants.find(p => p.id !== user.id)?.name}
                                                </p>
                                                {selectedConversation.product && (
                                                    <Link href={`/marketplace/${selectedConversation.product.id}`}>
                                                        <p className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold">
                                                            {selectedConversation.product.title}
                                                        </p>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-6 overflow-y-auto max-h-[400px] space-y-4">
                                        {messages.map(message => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${message.senderId === user.id
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                                        }`}
                                                >
                                                    <p className="font-medium">{message.content}</p>
                                                    <p className={`text-xs mt-1 ${message.senderId === user.id ? 'text-indigo-100' : 'text-gray-500'
                                                        }`}>
                                                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newMessage.trim()}
                                                className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                <Send size={20} />
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <p className="font-medium">Select a conversation to start messaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
