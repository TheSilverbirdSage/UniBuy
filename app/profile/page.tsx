"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Building2, MapPin, Calendar, Edit, Camera, Verified } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const { user } = useAuth();

    // This would ideally be fetched from an API/updates
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        university: '',
        bio: 'Student at University of Lagos. Love tech and reading!',
        phone: '+234 812 345 6789'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        setFormData(prev => ({
            ...prev,
            name: user.name,
            email: user.email,
            university: user.university
        }));
    }, [user, router]);

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call to update profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setIsEditing(false);
    };

    if (!user) return null;

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
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl dark:shadow-none dark:border dark:border-gray-800 overflow-hidden border border-gray-100">
                    {/* Header Cover */}
                    <div className="h-48 bg-linear-to-r from-indigo-600 to-blue-500 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-8 md:px-12 pb-12 relative">
                        {/* Avatar */}
                        <div className="relative -mt-20 mb-6 inline-block">
                            <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={user.avatar || 'https://via.placeholder.com/160'}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>

                        {/* Title & Edit Button */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    {user.name}
                                    {user.verified && <Verified className="text-blue-500 w-6 h-6" />}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">{user.university}</p>
                            </div>

                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                >
                                    <Edit size={18} /> Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Email</label>
                                        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-200 font-medium bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                                            <Mail size={20} className="text-gray-400 dark:text-gray-500" />
                                            {formData.email}
                                            <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-bold">Verified</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">University</label>
                                        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-200 font-medium bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                                            <Building2 size={20} className="text-gray-400 dark:text-gray-500" />
                                            {formData.university}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Join Date</label>
                                        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-200 font-medium bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                                            <Calendar size={20} className="text-gray-400 dark:text-gray-500" />
                                            {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio & Details */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
                                    Profile Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl font-medium text-gray-900 dark:text-gray-100 transition-all outline-none resize-none"
                                                rows={4}
                                            />
                                        ) : (
                                            <p className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                                                {formData.bio}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Contact Phone (Private)</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-xl font-medium text-gray-900 dark:text-white transition-all outline-none"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 text-gray-900 dark:text-gray-200 font-medium bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                                                <MapPin size={20} className="text-gray-400 dark:text-gray-500" />
                                                {formData.phone}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Area */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl text-center">
                                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{user.rating?.toFixed(1) || '0.0'}</div>
                                <div className="text-xs font-bold text-indigo-400 dark:text-indigo-300 uppercase tracking-widest">Rating</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl text-center">
                                <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">{user.reviewCount || 0}</div>
                                <div className="text-xs font-bold text-purple-400 dark:text-purple-300 uppercase tracking-widest">Reviews</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center">
                                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">0</div>
                                <div className="text-xs font-bold text-blue-400 dark:text-blue-300 uppercase tracking-widest">Sales</div>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl text-center">
                                <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-1">2025</div>
                                <div className="text-xs font-bold text-orange-400 dark:text-orange-300 uppercase tracking-widest">Grad Year</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
