"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    onSave?: (productId: string) => void;
    isSaved?: boolean;
}

export default function ProductCard({ product, onSave, isSaved = false }: ProductCardProps) {
    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const conditionColors = {
        'new': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        'like-new': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        'good': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        'fair': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        'poor': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-300 border border-gray-100 dark:border-gray-800"
        >
            <Link href={`/marketplace/${product.id}`}>
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-black">
                            {discountPercentage}% OFF
                        </div>
                    )}

                    {/* Condition Badge */}
                    <div className={`absolute top-4 right-4 ${conditionColors[product.condition]} px-3 py-1.5 rounded-full text-xs font-bold capitalize`}>
                        {product.condition.replace('-', ' ')}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSave?.(product.id);
                        }}
                        className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white dark:hover:bg-black transition-all shadow-lg"
                    >
                        <Heart
                            size={20}
                            className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}
                        />
                    </button>
                </div>
            </Link>

            <div className="p-6">
                <Link href={`/marketplace/${product.id}`}>
                    {/* Category */}
                    <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        {product.category.replace('-', ' ')}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₦{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <img
                            src={product.sellerAvatar || 'https://via.placeholder.com/40'}
                            alt={product.sellerName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{product.sellerName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Verified Student</p>
                        </div>
                    </div>

                    {/* Location & Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-green-600 dark:text-green-500" />
                            <span className="font-bold">{product.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Eye size={14} />
                                <span>{product.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart size={14} />
                                <span>{product.saved}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}
