"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { getUserListings, getUserStats } from '@/lib/api/users';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [listings, setListings] = useState<Product[]>([]);
    const [stats, setStats] = useState({
        totalListings: 0,
        activeListings: 0,
        soldItems: 0,
        totalEarnings: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        loadDashboardData();
    }, [user, router]);

    const loadDashboardData = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const [listingsResponse, statsResponse] = await Promise.all([
                getUserListings(user.id),
                getUserStats(user.id)
            ]);

            if (listingsResponse.data) {
                setListings(listingsResponse.data);
            }
            if (statsResponse.data) {
                setStats(statsResponse.data);
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
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
                    <div className="flex items-center justify-between h-20">
                        <Link href="/marketplace" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
                            <ArrowLeft size={20} />
                            Back to Marketplace
                        </Link>
                        <Link href="/sell">
                            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
                                + New Listing
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">Seller Dashboard</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                        Welcome back, {user.name}!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                                <Package size={24} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Total Listings</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.totalListings}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                                <Eye size={24} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Active</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.activeListings}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                                <Package size={24} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Sold</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.soldItems}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
                                <DollarSign size={24} className="text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Earnings</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">₦{stats.totalEarnings.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Listings */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Your Listings</h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                        </div>
                    ) : listings.length > 0 ? (
                        <div className="space-y-4">
                            {listings.map(listing => (
                                <div key={listing.id} className="flex items-center gap-6 p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                                    <img
                                        src={listing.images[0]}
                                        alt={listing.title}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">{listing.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">{listing.category.replace('-', ' ')}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Eye size={14} />
                                                {listing.views} views
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${listing.status === 'available' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                listing.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                                                    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                }`}>
                                                {listing.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mb-2">₦{listing.price.toLocaleString()}</p>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full transition-colors">
                                                <Edit size={18} className="text-indigo-600 dark:text-indigo-400" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                                                <Trash2 size={18} className="text-red-500 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">You haven't listed any items yet</p>
                            <Link href="/sell">
                                <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
                                    Create Your First Listing
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
