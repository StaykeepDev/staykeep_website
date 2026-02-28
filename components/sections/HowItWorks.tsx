'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

const STEPS = [
    {
        num: '①',
        title: 'List Your Property',
        desc: 'Add your rooms, set rates, connect your OTA accounts. Live in under 5 minutes.',
        icon: '🏠',
        color: '#e94560',
        animation: 'house',
    },
    {
        num: '②',
        title: 'Get Bookings',
        desc: 'Receive bookings from multiple sources in one unified inbox.',
        icon: '📅',
        color: '#9b5de5',
        animation: 'bookings',
    },
    {
        num: '③',
        title: 'Grow Your Business',
        desc: 'Track revenue, manage reviews, and make data-driven decisions.',
        icon: '📈',
        color: '#06d6a0',
        animation: 'growth',
    },
];

export default function HowItWorks() {
    const [lineProgress, setLineProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const step = () => {
                        start = Math.min(start + 0.02, 1);
                        setLineProgress(start);
                        if (start < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <FadeInOnScroll className="text-center mb-16">
                    <div className="text-sm font-medium text-[#e94560] mb-4 uppercase tracking-wider">How It Works</div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Up and running in minutes</h2>
                    <p className="text-[#888888] text-lg max-w-xl mx-auto">
                        Three simple steps to transform your hospitality business.
                    </p>
                </FadeInOnScroll>

                <div className="relative">
                    {/* Connecting line (desktop) */}
                    <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px" style={{ background: '#1a1a2e' }}>
                        <div
                            className="h-full"
                            style={{
                                background: 'linear-gradient(to right, #e94560, #9b5de5, #06d6a0)',
                                width: `${lineProgress * 100}%`,
                                transition: 'width 0.1s linear',
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((step, i) => (
                            <FadeInOnScroll key={step.num} delay={i * 0.2}>
                                <div className="flex flex-col items-center text-center">
                                    {/* Icon circle */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 300 }}
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 relative z-10"
                                        style={{
                                            background: `${step.color}15`,
                                            border: `2px solid ${step.color}40`,
                                            boxShadow: `0 0 20px ${step.color}20`,
                                        }}
                                    >
                                        {step.icon}
                                    </motion.div>

                                    <div className="text-lg font-bold text-white mb-2">{step.title}</div>
                                    <p className="text-[#555555] text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
