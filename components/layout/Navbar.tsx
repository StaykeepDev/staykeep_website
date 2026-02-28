'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { NAV_LINKS, FEATURE_NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const pathname = usePathname();
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setFeaturesOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
                setFeaturesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-lg bg-[#e94560] opacity-20 group-hover:opacity-30 transition-opacity" />
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10Z" fill="#e94560" />
                                    <path d="M13 12H16L12 8L8 12H11V16H13V12Z" fill="white" opacity="0.7" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white">StayKeep</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                link.hasDropdown ? (
                                    <div key={link.label} ref={featuresRef} className="relative">
                                        <button
                                            onClick={() => setFeaturesOpen(!featuresOpen)}
                                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.startsWith('/features')
                                                    ? 'text-white'
                                                    : 'text-[#888888] hover:text-white'
                                                }`}
                                        >
                                            {link.label}
                                            <ChevronDown size={14} className={`transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {featuresOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-[#0d0d15] border border-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden"
                                                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                                                >
                                                    <div className="p-4">
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {FEATURE_NAV_ITEMS.map((item) => (
                                                                <Link
                                                                    key={item.href}
                                                                    href={item.href}
                                                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-colors group"
                                                                >
                                                                    <span className="text-xl mt-0.5">{item.icon}</span>
                                                                    <div>
                                                                        <div className="text-sm font-medium text-white group-hover:text-[#e94560] transition-colors">{item.label}</div>
                                                                        <div className="text-xs text-[#555555]">{item.desc}</div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <div className="mt-3 pt-3 border-t border-[#1a1a2e]">
                                                            <Link
                                                                href="/features"
                                                                className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors px-3 py-2"
                                                            >
                                                                Explore all features <ArrowRight size={14} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                                ? 'text-white'
                                                : 'text-[#888888] hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href="/manage"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1a1a2e] text-sm font-medium text-[#888888] hover:text-white hover:border-[rgba(255,255,255,0.12)] transition-all"
                            >
                                StayKeep Manage <ArrowRight size={13} />
                            </Link>
                            <Link
                                href="/"
                                className="px-4 py-2 rounded-lg bg-[#e94560] text-white text-sm font-medium hover:bg-[#d43a55] transition-all"
                                style={{ boxShadow: '0 0 20px rgba(233,69,96,0.3)' }}
                            >
                                Book a Stay
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-[#888888] hover:text-white transition-colors"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-[#0d0d15] border-l border-[#1a1a2e] p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" className="font-bold text-lg text-white" onClick={() => setMobileOpen(false)}>
                                    StayKeep
                                </Link>
                                <button onClick={() => setMobileOpen(false)} className="p-2 text-[#888888]">
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="space-y-1 mb-8">
                                {NAV_LINKS.map((link) => (
                                    <div key={link.label}>
                                        <Link
                                            href={link.hasDropdown ? '/features' : link.href}
                                            className="block px-3 py-2.5 rounded-lg text-[#888888] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                        {link.hasDropdown && (
                                            <div className="ml-4 mt-1 space-y-1">
                                                {FEATURE_NAV_ITEMS.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#555555] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                                                    >
                                                        <span>{item.icon}</span> {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            <div className="space-y-3">
                                <Link
                                    href="/manage"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#1a1a2e] text-sm font-medium text-white hover:border-[rgba(255,255,255,0.15)] transition-all"
                                >
                                    StayKeep Manage <ArrowRight size={14} />
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center w-full py-3 rounded-xl bg-[#e94560] text-white text-sm font-semibold"
                                    style={{ boxShadow: '0 0 20px rgba(233,69,96,0.3)' }}
                                >
                                    Book a Stay
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
