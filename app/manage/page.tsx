'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Check } from 'lucide-react';
import GradientMesh from '@/components/animations/GradientMesh';
import GlowOrbs from '@/components/animations/GlowOrbs';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import TiltCard from '@/components/animations/TiltCard';
import { MODULES, PROPERTY_TYPES } from '@/content/modules';

// Animated phone mockup
const SCREENS = [
    { label: 'Dashboard', color: '#e94560' },
    { label: 'Bookings', color: '#9b5de5' },
    { label: 'Rooms', color: '#06d6a0' },
    { label: 'Reports', color: '#f77f00' },
];

function PhoneMockup() {
    const [activeScreen, setActiveScreen] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setActiveScreen((s) => (s + 1) % SCREENS.length), 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
            {/* Phone body */}
            <div
                className="absolute inset-0 rounded-[36px] border-2 border-[rgba(255,255,255,0.12)]"
                style={{ background: '#0a0a0f', boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(233,69,96,0.1)' }}
            >
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-10" />
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-7 pb-1">
                    <span className="text-[8px] text-[#555555]">9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-1.5 rounded-sm bg-[#06d6a0] opacity-60" />
                        <div className="w-1.5 h-1.5 rounded-full border border-[#555555]" />
                    </div>
                </div>

                {/* Screen content */}
                <div className="mx-2 mt-1 rounded-2xl overflow-hidden" style={{ height: 340 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeScreen}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="h-full p-3"
                            style={{ background: `${SCREENS[activeScreen].color}10` }}
                        >
                            <div className="text-xs font-bold text-white mb-3">{SCREENS[activeScreen].label}</div>
                            {/* Fake UI elements */}
                            <div className="space-y-2">
                                {[80, 60, 90, 45, 70].map((w, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="rounded-lg h-8 flex items-center px-2"
                                        style={{ background: 'rgba(255,255,255,0.04)', width: `${w}%` }}
                                    >
                                        <div className="w-4 h-4 rounded-full mr-2 flex-shrink-0" style={{ background: SCREENS[activeScreen].color, opacity: 0.4 }} />
                                        <div className="h-2 rounded-full flex-1" style={{ background: 'rgba(255,255,255,0.06)', maxWidth: '70%' }} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom nav */}
                <div className="flex justify-around py-2 mx-2 mt-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {['🏠', '📅', '🛏️', '💬'].map((icon, i) => (
                        <div
                            key={i}
                            className="text-sm"
                            style={{ opacity: i === activeScreen % 4 ? 1 : 0.3 }}
                        >
                            {icon}
                        </div>
                    ))}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center mt-2">
                    <div className="w-24 h-1 rounded-full bg-[rgba(255,255,255,0.15)]" />
                </div>
            </div>
        </div>
    );
}

export default function ManagePage() {
    return (
        <>
            {/* Hero */}
            <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-4 overflow-hidden">
                <GradientMesh />
                <GlowOrbs />
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                            style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)', color: '#e94560' }}
                        >
                            🏢 StayKeep Manage · Property Management App
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                            Everything you need to run your{' '}
                            <span className="gradient-text">property</span>{' '}
                            — in one app
                        </h1>
                        <p className="text-[#888888] text-lg leading-relaxed mb-8 max-w-lg">
                            The complete property management system for homestays, hotels, resorts, and villas. From bookings to billing, in your pocket.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/manage#download"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#d43a55] transition-all"
                                style={{ boxShadow: '0 0 30px rgba(233,69,96,0.35)' }}
                            >
                                <Download size={16} /> Download App
                            </Link>
                            <Link
                                href="#trial"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#1a1a2e] text-white font-semibold hover:border-[rgba(255,255,255,0.15)] transition-all"
                            >
                                Start Free Trial
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-[#555555]">
                            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#06d6a0]" /> iOS & Android</span>
                            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#06d6a0]" /> 14-day free trial</span>
                            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#06d6a0]" /> No credit card</span>
                        </div>
                    </motion.div>

                    {/* Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <TiltCard maxTilt={6} glowColor="rgba(233,69,96,0.08)">
                            <PhoneMockup />
                        </TiltCard>
                    </motion.div>
                </div>
            </section>

            {/* 13 Modules */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <FadeInOnScroll className="text-center mb-16">
                        <div className="text-sm font-medium text-[#e94560] mb-4 uppercase tracking-wider">13 Modules</div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Every tool you need</h2>
                        <p className="text-[#888888] text-lg max-w-xl mx-auto">
                            From check-in to checkout — every aspect of your property, covered.
                        </p>
                    </FadeInOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MODULES.map((module, i) => (
                            <FadeInOnScroll key={module.id} delay={i * 0.05}>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl p-6 h-full flex flex-col"
                                    style={{
                                        background: 'rgba(13,13,21,0.8)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                            style={{ background: `${module.color}15`, border: `1px solid ${module.color}25` }}
                                        >
                                            {module.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#555555] font-medium">Module {String(i + 1).padStart(2, '0')}</div>
                                            <h3 className="font-bold text-white">{module.name}</h3>
                                        </div>
                                    </div>
                                    <div
                                        className="text-xs font-semibold mb-2"
                                        style={{ color: module.color }}
                                    >
                                        {module.headline}
                                    </div>
                                    <p className="text-[#555555] text-sm leading-relaxed flex-1">{module.description}</p>
                                </motion.div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Property Types */}
            <section className="py-16 px-4" style={{ background: 'rgba(13,13,21,0.5)' }}>
                <div className="max-w-5xl mx-auto text-center">
                    <FadeInOnScroll>
                        <h2 className="text-2xl font-bold mb-8 text-[#888888]">Works for every property type</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {PROPERTY_TYPES.map((type) => (
                                <motion.div
                                    key={type.label}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                                >
                                    <span className="text-xl">{type.emoji}</span>
                                    <span className="text-sm font-medium text-[#888888]">{type.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>

            {/* Download / CTA */}
            <section id="download" className="relative py-28 px-4 overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-3xl mx-auto text-center">
                    <FadeInOnScroll>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Start managing your property today</h2>
                        <p className="text-[#888888] text-lg mb-10">Free 14-day trial. No credit card required. Set up in under 5 minutes.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="#"
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white"
                                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.12)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                                Download for iOS
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white"
                                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.12)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M3.18 23.76c.38.19.82.18 1.21-.04l11.3-6.52-2.46-2.46-10.05 9.02zM.1 1.18C.04 1.38 0 1.59 0 1.82v20.36c0 .23.04.44.1.64l.05.06L11.38 12l-.07-.04L.15 1.13l-.05.05zM20.45 9.31L17.5 7.61l-2.75 2.75 2.74 2.74 2.97-1.71c.85-.49.85-1.59 0-2.08h-.01zM4.39.28L15.69 6.8l-2.46 2.46L2.38.29c.38-.19.82-.19 1.21-.01H4.39z" /></svg>
                                Download for Android
                            </a>
                        </div>
                        <Link
                            href="#trial"
                            className="text-[#888888] hover:text-white text-sm transition-colors"
                        >
                            or Start Free Trial on Web →
                        </Link>
                    </FadeInOnScroll>
                </div>
            </section>
        </>
    );
}
