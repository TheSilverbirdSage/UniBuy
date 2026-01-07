"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ShieldCheck, MessageSquare, ShoppingCart, Heart, Eye, Share2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { getProductById, getRelatedProducts } from '@/lib/api/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const { user } = useAuth();
    const { addItem, isInCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        setLoading(true);
        try {
            const [productResponse, relatedResponse] = await Promise.all([
                getProductById(id),
                getRelatedProducts(id)
            ]);

            if (productResponse.data) {
                setProduct(productResponse.data);
            }
            if (relatedResponse.data) {
                setRelatedProducts(relatedResponse.data);
            }
        } catch (error) {
            console.error('Failed to load product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addItem(product);
        }
    };

    const handleMessageSeller = () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        router.push(`/messages?product=${id}&seller=${product?.sellerId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-gray-200 mb-4">Product Not Found</h1>
                    <Link href="/marketplace">
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold">
                            Back to Marketplace
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const conditionColors = {
        'new': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        'like-new': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        'good': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        'fair': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        'poor': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Navigation */}
            <nav className="border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-20">
                        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
                            <ArrowLeft size={20} />
                            Back
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        <div className="relative rounded-3xl overflow-hidden bg-gray-100 mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-[500px] object-cover"
                            />

                            {/* Action Buttons */}
                            <div className="absolute top-6 right-6 flex gap-3">
                                <button
                                    onClick={() => setSaved(!saved)}
                                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full hover:bg-white dark:hover:bg-black transition-all shadow-lg"
                                >
                                    <Heart size={24} className={saved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'} />
                                </button>
                                <button className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full hover:bg-white dark:hover:bg-black transition-all shadow-lg">
                                    <Share2 size={24} className="text-gray-600 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-2xl overflow-hidden border-4 transition-all ${selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-24 object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category & Condition */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                {product.category.replace('-', ' ')}
                            </span>
                            <span className={`${conditionColors[product.condition]} px-3 py-1.5 rounded-full text-xs font-bold capitalize`}>
                                {product.condition.replace('-', ' ')}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{product.title}</h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">₦{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-black">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 mb-3">Description</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{product.description}</p>
                        </div>

                        {/* Location */}
                        <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 mb-3">Pickup Location</h3>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <MapPin size={20} className="text-green-600 dark:text-green-400" />
                                <span className="font-bold">{product.location}, {product.campus}</span>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 mb-4">Seller Information</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.sellerAvatar || 'https://via.placeholder.com/60'}
                                    alt={product.sellerName}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <p className="text-lg font-bold text-gray-900 dark:text-gray-200">{product.sellerName}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <ShieldCheck size={16} className="text-green-600 dark:text-green-400" />
                                        <span className="font-bold">Verified Student</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 mb-8 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Eye size={20} />
                                <span className="font-bold">{product.views} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart size={20} />
                                <span className="font-bold">{product.saved} saved</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isInCart(product.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg transition-all ${isInCart(product.id)
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none'
                                    }`}
                            >
                                <ShoppingCart size={24} />
                                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleMessageSeller}
                                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:border-indigo-600 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                            >
                                <MessageSquare size={24} />
                                Message Seller
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Similar Items</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(relatedProduct => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
