"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartButton() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            >
                <ShoppingCart size={24} />

                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                        >
                            {itemCount}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </Link>
    );
}
