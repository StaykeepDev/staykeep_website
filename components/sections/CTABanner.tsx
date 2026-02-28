'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import GradientMesh from '@/components/animations/GradientMesh';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

export default function CTABanner() {
    return (
        <section className="relative py-28 px-4 overflow-hidden">
            <GradientMesh />

            {/* Floating shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute w-64 h-64 rounded-full"
                    style={{
                        top: -80,
                        right: '10%',
                        background: 'radial-gradient(circle, rgba(233,69,96,0.08) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'float 12s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute w-48 h-48 rounded-full"
                    style={{
                        bottom: -40,
                        left: '15%',
                        background: 'radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'floatReverse 15s ease-in-out infinite',
                    }}
                />
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                <FadeInOnScroll>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
                        style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)', color: '#e94560' }}
                    >
                        <Zap size={13} /> Limited time: Free 14-day trial
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Ready to transform your{' '}
                        <span className="gradient-text">hospitality business?</span>
                    </h2>
                    <p className="text-[#888888] text-lg mb-10 max-w-xl mx-auto">
                        Join 500+ properties already using StayKeep. Free 14-day trial. No credit card required.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/manage"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#d43a55] transition-all"
                            style={{ boxShadow: '0 0 40px rgba(233,69,96,0.35)' }}
                        >
                            Get Started Free <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#1a1a2e] text-white font-semibold hover:border-[rgba(255,255,255,0.2)] transition-all"
                        >
                            Talk to Sales
                        </Link>
                    </div>

                    <p className="text-[#444455] text-sm mt-6">Free 14-day trial · No credit card required · Cancel anytime</p>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
