"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CartPage() {
    const { items, total, removeItem, updateQuantity, itemCount } = useCart();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-20">
                        <Link href="/marketplace" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
                            <ArrowLeft size={20} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-12">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block p-8 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <ShoppingCart size={64} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-200 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-8">Start adding items to your cart!</p>
                        <Link href="/marketplace">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-colors">
                                Browse Marketplace
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <motion.div
                                    key={item.product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <Link href={`/marketplace/${item.product.id}`}>
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.title}
                                                className="w-32 h-32 rounded-2xl object-cover"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <Link href={`/marketplace/${item.product.id}`}>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                    {item.product.title}
                                                </h3>
                                            </Link>

                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-3">
                                                Sold by {item.product.sellerName}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                <MapPin size={16} className="text-green-600 dark:text-green-400" />
                                                <span className="font-bold">{item.product.location}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <Minus size={16} className="text-gray-700 dark:text-gray-200" />
                                                    </button>
                                                    <span className="text-lg font-black text-gray-900 dark:text-white w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus size={16} className="text-gray-700 dark:text-gray-200" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                                        ₦{(item.product.price * item.quantity).toLocaleString()}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            ₦{item.product.price.toLocaleString()} each
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-full transition-colors self-start"
                                        >
                                            <Trash2 size={20} className="text-red-500" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md border border-gray-100 dark:border-gray-800 sticky top-24">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span className="font-bold">Items ({itemCount})</span>
                                        <span className="font-black">₦{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span className="font-bold">Delivery</span>
                                        <span className="font-black text-green-600 dark:text-green-400">FREE (Campus Pickup)</span>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-8">
                                    <span className="text-xl font-black text-gray-900 dark:text-white">Total</span>
                                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">₦{total.toLocaleString()}</span>
                                </div>

                                {user ? (
                                    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mb-4">
                                        Proceed to Checkout
                                    </button>
                                ) : (
                                    <Link href="/auth/login">
                                        <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mb-4">
                                            Login to Checkout
                                        </button>
                                    </Link>
                                )}

                                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4">
                                    <p className="text-sm text-indigo-700 dark:text-indigo-300 font-bold text-center">
                                        🎓 All items are from verified students on your campus
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
