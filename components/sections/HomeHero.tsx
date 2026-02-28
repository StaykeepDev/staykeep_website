'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import GradientMesh from '@/components/animations/GradientMesh';
import GlowOrbs from '@/components/animations/GlowOrbs';
import DashboardMockup from '@/components/animations/DashboardMockup';
import TiltCard from '@/components/animations/TiltCard';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HomeHero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-4 overflow-hidden">
            <GradientMesh />
            <GlowOrbs />

            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center mb-16"
                >
                    {/* Badge */}
                    <motion.div variants={item} className="mb-6">
                        <span
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                            style={{
                                background: 'rgba(233,69,96,0.1)',
                                border: '1px solid rgba(233,69,96,0.2)',
                                color: '#e94560',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e94560] animate-pulse" />
                            Now with Channel Manager & Website Builder
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={item}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight max-w-4xl mb-6"
                    >
                        The modern way to{' '}
                        <span className="gradient-text">manage & book</span>{' '}
                        stays
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={item}
                        className="text-lg sm:text-xl text-[#888888] max-w-2xl leading-relaxed mb-10"
                    >
                        One platform for guests to discover amazing properties and for hosts to run their business effortlessly.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link
                            href="/manage"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#e94560] text-white font-semibold text-base hover:bg-[#d43a55] transition-all"
                            style={{ boxShadow: '0 0 30px rgba(233,69,96,0.35)' }}
                        >
                            Start Managing Free <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#1a1a2e] text-white font-semibold text-base hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.03)] transition-all"
                        >
                            Book a Stay
                        </Link>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#555555]">
                        {['No credit card required', 'Free 14-day trial', '500+ properties'].map((text) => (
                            <span key={text} className="flex items-center gap-1.5">
                                <Check size={13} className="text-[#06d6a0]" /> {text}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <TiltCard maxTilt={5} glowColor="rgba(233,69,96,0.1)">
                        <DashboardMockup />
                    </TiltCard>
                </motion.div>
            </div>
        </section>
    );
}
