"use client"

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                initial={false}
                animate={{ scale: theme === 'light' ? 1 : 0, rotate: theme === 'light' ? 0 : 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Sun size={20} className="text-orange-500" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{ scale: theme === 'dark' ? 1 : 0, rotate: theme === 'dark' ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
            >
                <Moon size={20} className="text-indigo-400" />
            </motion.div>

            {/* Invisible spacer to maintain size */}
            <div className="w-5 h-5 opacity-0"></div>
        </button>
    );
}
