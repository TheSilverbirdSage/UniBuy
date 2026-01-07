"use client"

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, AlertCircle, ShieldCheck, Zap, MapPin, Repeat } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const features = [
    {
        title: 'Verify Your Edu',
        description: 'Exclusive access for verified students only. No strangers.',
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        color: 'bg-indigo-500'
    },
    {
        title: 'List in Seconds',
        description: 'Snap a photo, set a price, and get paid. It\u2019s that easy.',
        icon: <Zap className="w-6 h-6 text-white" />,
        color: 'bg-violet-500'
    },
    {
        title: 'Safe Meetups',
        description: 'Trade safely on campus at designated safe zones.',
        icon: <MapPin className="w-6 h-6 text-white" />,
        color: 'bg-fuchsia-500'
    },
    {
        title: 'Sustainable',
        description: 'Reduce waste by trading locally within your community.',
        icon: <Repeat className="w-6 h-6 text-white" />,
        color: 'bg-emerald-500'
    }
];

export default function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
    const springRotate = useSpring(backgroundRotate, { stiffness: 100, damping: 30 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@') || !email.includes('.edu')) {
            setStatus('error');
            // Reset error after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            console.log('Registered email:', email);
            setEmail('');
        }, 1500);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-900 dark:text-white overflow-hidden relative selection:bg-indigo-500/30 selection:text-indigo-200">

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    style={{ y: springY, rotate: springRotate }}
                    className="absolute top-[-20%] left-[-20%] w-[140vw] h-[140vw] md:top-[-10%] md:left-[-10%] md:w-[50vw] md:h-[50vw] bg-indigo-500/20 rounded-full blur-[100px] md:blur-[128px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), x: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
                    className="absolute bottom-[-20%] right-[-20%] w-[140vw] h-[140vw] md:bottom-[-10%] md:right-[-10%] md:w-[60vw] md:h-[60vw] bg-violet-500/20 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[100vw] md:w-[40vw] md:h-[40vw] bg-fuchsia-500/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
            </div>

            <nav className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img src="/UniBuy.png" alt="UniBuy Logo" className="w-32 h-32 object-contain" />
                    <span className="text-xl font-bold tracking-tight">UniBuy</span>
                </div>
                <ThemeToggle />
            </nav>

            <main className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-4 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-10 shadow-sm hover:scale-105 transition-transform cursor-default"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                        Coming to your campus soon
                    </span>
                </motion.div>

                {/* Hero Text */}
                <div className="relative mb-8 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 leading-[0.95] drop-shadow-sm"
                    >
                        THE FUTURE OF <br />
                        <span className="text-indigo-600 dark:text-indigo-400">STUDENT TRADE</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                >
                    An exclusive, verified marketplace for students. <br className="hidden md:block" />
                    Buy, sell, and trade safely within your university community.
                </motion.p>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="w-full max-w-md mx-auto relative z-20"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 p-8 rounded-3xl flex flex-col items-center gap-4 text-green-700 dark:text-green-300 backdrop-blur-xl shadow-xl"
                            >
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                    className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30"
                                >
                                    <CheckCircle2 size={40} strokeWidth={3} />
                                </motion.div>
                                <div className="text-center">
                                    <p className="font-black text-2xl mb-1">You're on the list!</p>
                                    <p className="font-medium opacity-80">We'll notify you when we launch.</p>
                                </div>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 text-sm font-bold bg-white/50 dark:bg-black/20 px-4 py-2 rounded-xl hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
                                >
                                    Register another email
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative group">
                                <div className="absolute -inset-[2px] bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
                                <div className="relative flex flex-col sm:flex-row items-center bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 rounded-3xl p-2 shadow-2xl backdrop-blur-xl">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address..."
                                        className="w-full bg-transparent border-none outline-none px-6 py-4 text-lg text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 min-w-[160px]"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Join Waitlist</span>
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="absolute left-0 -bottom-12 w-full flex items-center justify-center gap-2 text-red-500 font-bold bg-red-50 dark:bg-red-900/20 py-2 rounded-xl border border-red-200 dark:border-red-800"
                                    >
                                        <AlertCircle size={16} />
                                        <span className="text-sm">Please enter a valid email address</span>
                                    </motion.div>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-12 flex items-center gap-4 px-6 py-3 bg-white/40 dark:bg-white/5 rounded-2xl backdrop-blur-sm border border-white/20"
                >
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => <Sparkles key={i} size={8} fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            <span className="text-slate-900 dark:text-white">500+</span> students waiting
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section className="relative z-10 py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">What we're building</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            We're reimagining how students buy and sell. <br />Safe, simple, and exclusively for you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className="bg-white/60 dark:bg-white/5 p-8 rounded-[2rem] border border-white/20 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-xl group"
                            >
                                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="w-full text-center py-8 text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10">
                © {new Date().getFullYear()} JUDAH Inc. • Made with ❤️ for Students
            </footer>
        </div>
    );
}
