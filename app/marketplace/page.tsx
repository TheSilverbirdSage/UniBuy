"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ShoppingCart, User, MessageSquare, LogOut } from 'lucide-react';
import { Product, ProductCategory, ProductCondition } from '@/lib/types';
import { getProducts } from '@/lib/api/products';
import ProductCard from '@/components/ProductCard';
import CartButton from '@/components/CartButton';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'textbooks', label: 'Textbooks' },
    { value: 'dorm-gear', label: 'Dorm Gear' },
    { value: 'tech', label: 'Tech & Gadgets' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' }
];

const conditions: { value: ProductCondition | 'all'; label: string }[] = [
    { value: 'all', label: 'Any Condition' },
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
];

export default function MarketplacePage() {
    const { user, logout } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
    const [selectedCondition, setSelectedCondition] = useState<ProductCondition | 'all'>('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());

    useEffect(() => {
        loadProducts();
    }, [selectedCategory, selectedCondition, priceRange, searchQuery]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const filters: any = {};

            if (selectedCategory !== 'all') filters.category = selectedCategory;
            if (selectedCondition !== 'all') filters.condition = selectedCondition;
            if (priceRange.min) filters.minPrice = parseFloat(priceRange.min);
            if (priceRange.max) filters.maxPrice = parseFloat(priceRange.max);
            if (searchQuery) filters.search = searchQuery;

            const response = await getProducts(filters);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProduct = (productId: string) => {
        setSavedProducts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <ShoppingCart className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 dark:text-white">CampusCart</span>
                        </Link>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <Link href="/messages">
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <MessageSquare size={24} className="text-gray-600" />
                                        </button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <User size={24} className="text-gray-600" />
                                        </button>
                                    </Link>
                                    <CartButton />
                                    <ThemeToggle />
                                    <button
                                        onClick={logout}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                    >
                                        <LogOut size={24} className="text-gray-600 dark:text-gray-300" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ThemeToggle />
                                    <Link href="/auth/login">
                                        <button className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">Student Marketplace</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                        Find great deals from verified students on campus
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for textbooks, furniture, tech..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-6 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold flex items-center gap-2 hover:border-indigo-600 dark:hover:border-indigo-600 transition-colors"
                    >
                        <SlidersHorizontal size={20} />
                        Filters
                    </button>

                    {/* Sell Button */}
                    <Link href="/sell">
                        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none">
                            + List Item
                        </button>
                    </Link>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-800"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Condition Filter */}
                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Condition
                                </label>
                                <select
                                    value={selectedCondition}
                                    onChange={(e) => setSelectedCondition(e.target.value as ProductCondition | 'all')}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                >
                                    {conditions.map(cond => (
                                        <option key={cond.value} value={cond.value}>{cond.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Price Range (₦)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="w-1/2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="w-1/2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSelectedCondition('all');
                                setPriceRange({ min: '', max: '' });
                                setSearchQuery('');
                            }}
                            className="mt-6 text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                            <X size={18} />
                            Clear All Filters
                        </button>
                    </motion.div>
                )}

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSave={handleSaveProduct}
                                isSaved={savedProducts.has(product.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl font-bold text-gray-400">No products found</p>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
                    </div>
                )}

                {/* Results Count */}
                {!loading && products.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">
                            Showing {products.length} {products.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
