"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, DollarSign, MapPin, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { ProductCategory, ProductCondition } from '@/lib/types';
import { createProduct } from '@/lib/api/products';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const categories: { value: ProductCategory; label: string }[] = [
    { value: 'textbooks', label: 'Textbooks' },
    { value: 'dorm-gear', label: 'Dorm Gear' },
    { value: 'tech', label: 'Tech & Gadgets' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'sports', label: 'Sports Equipment' },
    { value: 'other', label: 'Other' }
];

const conditions: { value: ProductCondition; label: string; description: string }[] = [
    { value: 'new', label: 'New', description: 'Never used, in original packaging' },
    { value: 'like-new', label: 'Like New', description: 'Barely used, excellent condition' },
    { value: 'good', label: 'Good', description: 'Used with minor wear, fully functional' },
    { value: 'fair', label: 'Fair', description: 'Visible wear but works well' },
    { value: 'poor', label: 'Poor', description: 'Significant wear, may have issues' }
];

export default function SellPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'textbooks' as ProductCategory,
        condition: 'good' as ProductCondition,
        imageUrl: '',
        location: 'Main Library',
        campus: 'Main Campus'
    });

    // Redirect if not logged in
    React.useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.title || !formData.description || !formData.price) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            setError('Price must be greater than 0');
            setLoading(false);
            return;
        }

        if (!user) {
            setError('You must be logged in to list a product');
            setLoading(false);
            return;
        }

        try {
            const productData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                category: formData.category,
                condition: formData.condition,
                images: formData.imageUrl ? [formData.imageUrl] : ['https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800'],
                sellerId: user.id,
                sellerName: user.name,
                sellerAvatar: user.avatar,
                location: formData.location,
                campus: formData.campus,
                status: 'available' as const
            };

            await createProduct(productData);
            setSuccess(true);

            // Redirect to marketplace after 2 seconds
            setTimeout(() => {
                router.push('/marketplace');
            }, 2000);
        } catch (err) {
            setError('Failed to create listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null; // Will redirect in useEffect
    }

    if (success) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="inline-block p-6 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                        <CheckCircle size={64} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Listing Created!</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Redirecting to marketplace...</p>
                </motion.div>
            </div>
        );
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">List Your Item</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                        Sell to verified students on your campus
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-900 rounded-2xl flex items-center gap-3 text-red-700 dark:text-red-300"
                    >
                        <AlertCircle size={20} />
                        <span className="font-bold">{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800">
                    <div className="space-y-8">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                Product Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Organic Chemistry Textbook 8th Edition"
                                required
                                className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the condition, any included accessories, and why you're selling..."
                                required
                                rows={5}
                                className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold resize-none"
                            />
                        </div>

                        {/* Category & Condition */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Category *
                                </label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold appearance-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Condition *
                                </label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                >
                                    {conditions.map(cond => (
                                        <option key={cond.value} value={cond.value}>
                                            {cond.label} - {cond.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Selling Price (₦) *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="5000"
                                        required
                                        min="0"
                                        step="100"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                    Original Price (₦) <span className="text-gray-400 dark:text-gray-500 normal-case">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        placeholder="15000"
                                        min="0"
                                        step="100"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                Image URL <span className="text-gray-400 dark:text-gray-500 normal-case">(Optional - paste image link)</span>
                            </label>
                            <div className="relative">
                                <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Tip: Upload your image to a service like Imgur and paste the link here
                            </p>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-widest">
                                Pickup Location *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., Main Library, Student Center"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none font-semibold"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                                ) : (
                                    'Create Listing'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
