"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import {
  ShoppingCart,
  Users,
  MapPin,
  BookOpen,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Repeat,
  ShieldCheck,
  Zap,
  Coffee
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

// --- Types ---
interface FeatureItem {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// --- Data ---
const features: FeatureItem[] = [
  {
    title: 'Verify Your Edu',
    items: ['Sign up with your university email to access the marketplace.'],
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: 'List in Seconds',
    items: ['Snap a photo of your old textbook or mini-fridge and set a price.'],
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Safe Meetups',
    items: ['Coordinate exchanges at designated on-campus safe zones.'],
    icon: <MapPin className="w-6 h-6" />
  },
  {
    title: 'Sustainable Cycle',
    items: ['Keep campus goods in use and reduce student waste.'],
    icon: <Repeat className="w-6 h-6" />
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="shrink-0 flex items-center gap-2"
          >
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-500 tracking-tight">
              CampusCart
            </span>
          </motion.div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/marketplace" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-colors">
              Shop
            </Link>
            <Link href="/sell" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-colors">
              Sell
            </Link>
            <ThemeToggle />
            <Link href="/auth/login">
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95">
                Student Login
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {['Shop', 'Sell', 'Campus Safety', 'Textbooks'].map((item) => (
                <a key={item} href="#" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold py-2">
                  {item}
                </a>
              ))}
              <Link href="/auth/login">
                <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all mt-4">
                  Student Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center lg:text-left z-10"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black mb-6 tracking-widest uppercase"
            >
              Exclusive to Verified Students
            </motion.span>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
              Upgrade Your <br />
              <span className="text-indigo-600">Campus Life.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              The safest marketplace to buy, sell, and trade with fellow students.
              Turn your old gear into cash and find deals on everything you need for the semester.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/marketplace">
                <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-indigo-100 active:scale-95">
                  Start Shopping <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/sell">
                <button className="px-8 py-4 rounded-2xl font-black border-2 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95">
                  List an Item
                </button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[12, 15, 18, 22].map(i => (
                  <img
                    key={i}
                    className="w-11 h-11 rounded-full border-4 border-white object-cover"
                    src={`https://images.unsplash.com/photo-1744320911030-1ab998d994d7?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    alt="student"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                <span className="text-indigo-600">50,000+</span> students trading locally
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1760111085279-6c4b6d831acc?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students on Campus"
                className="w-full h-150 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Listing Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-8 right-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200" className="object-cover h-full w-full" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">New Listing</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">Organic Chemistry Vol. 2</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Listed by <span className="text-gray-900 dark:text-gray-200 font-bold underline">Alex P.</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-indigo-600">₦3,500</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">MSRP ₦15,000</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-bold">
                    <MapPin size={14} /> On-Campus Pickup
                  </div>
                  <button className="text-xs font-black bg-indigo-600 text-white px-4 py-2 rounded-xl">Message Seller</button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureGrid = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white border-b-[6px] border-indigo-600 pb-2 inline-block tracking-tight">
              Built for Students
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-semibold leading-relaxed mt-6">
              Skip the shipping fees and strangers. Buy and sell within your own university community.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="group p-10 rounded-[2.5rem] bg-white dark:bg-gray-900 hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none transition-all duration-500 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h3>
              <div className="space-y-2">
                {feature.items.map((item, i) => (
                  <p key={i} className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-bold">
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Categories = () => (
  <section className="py-24 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Popular on Campus</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">What your peers are trading right now.</p>
        </div>
        <button className="text-indigo-600 dark:text-indigo-400 font-black flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest">
          View All Listings <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Textbooks', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400', icon: <BookOpen /> },
          { name: 'Dorm Gear', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', icon: <Coffee /> },
          { name: 'Tech & Gadgets', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400', icon: <Zap /> }
        ].map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl"
          >
            <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="mb-3 p-2 bg-white/20 backdrop-blur-md rounded-xl inline-block">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black">{cat.name}</h3>
              <p className="text-sm font-bold text-white/70">800+ Items</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24 px-4 bg-white dark:bg-black">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl"
    >
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <ShoppingCart size={300} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
          Turn your clutter <br className="hidden md:block" /> into tuition cash.
        </h2>
        <p className="text-indigo-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
          Join your university's private marketplace. Sign up with your .edu email and start trading within minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/auth/signup">
            <button className="bg-white text-indigo-600 px-12 py-5 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              Register with .EDU
            </button>
          </Link>
          <Link href="/marketplace">
            <button className="bg-indigo-700 text-white border-2 border-indigo-500/50 px-12 py-5 rounded-3xl font-black text-xl hover:bg-indigo-800 transition-all">
              Browse Locally
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-white dark:bg-black pt-24 pb-12 border-t border-gray-100 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <ShoppingCart className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">UniBuy</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-bold leading-relaxed text-sm">
            The exclusive student-to-student marketplace. Safer, faster, and better for the planet.
          </p>
        </div>
        <div>
          <h4 className="font-black text-gray-900 dark:text-gray-200 mb-8 uppercase tracking-widest text-[10px]">Marketplace</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-bold text-sm">
            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Textbooks</a></li>
            <li><a href="#" className="hover:text-indigo-600">Dorm Essentials</a></li>
            <li><a href="#" className="hover:text-indigo-600">Electronics</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-gray-900 dark:text-gray-200 mb-8 uppercase tracking-widest text-[10px]">Support</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-bold text-sm">
            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Safe Zone Map</a></li>
            <li><a href="#" className="hover:text-indigo-600">Verification Help</a></li>
            <li><a href="#" className="hover:text-indigo-600">Scam Protection</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-gray-900 dark:text-gray-200 mb-8 uppercase tracking-widest text-[10px]">Campus Trust</h4>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 transition-all">
              <ShieldCheck />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 transition-all">
              <Users />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-50 dark:border-gray-800 pt-10 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} UniBuy Marketplace • Student verified since 2024
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100 selection:bg-indigo-100 selection:text-indigo-900 antialiased">
      <Navbar />
      <main>
        <Hero />

        {/* Verification Banner */}
        <div className="py-6 bg-indigo-50 dark:bg-indigo-900/30 border-y border-indigo-100/50 dark:border-indigo-800/50 overflow-hidden relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 items-center"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest flex items-center gap-3">
                <CheckCircle size={16} /> Verified .EDU Access Only
              </span>
            ))}
          </motion.div>
        </div>

        <FeatureGrid />
        <Categories />

        {/* Safety Section */}
        <section className="py-24 bg-gray-900 dark:bg-gray-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                  Trade with <br />
                  <span className="text-indigo-400">Total Peace of Mind.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Every user is verified via University single sign-on (SSO).",
                    "Designated On-Campus 'Safe Trade' zones for handoffs.",
                    "In-app messaging protects your personal phone number."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1 text-indigo-400">
                        <CheckCircle size={24} />
                      </div>
                      <p className="text-xl font-bold text-gray-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mt-12 lg:mt-0">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[120px] opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1708578200684-3aa944b73237?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Student Safe Zone"
                  className="relative rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}