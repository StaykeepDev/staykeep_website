'use client';

import { useRef, useEffect, useState } from 'react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

const STATS = [
    { label: 'Properties', value: 500, suffix: '+', color: '#e94560' },
    { label: 'Bookings managed', value: 10000, suffix: '+', color: '#9b5de5' },
    { label: 'Happy guests', value: 50000, suffix: '+', color: '#06d6a0' },
    { label: 'Average rating', value: 48, suffix: '', prefix: '', special: '4.8★', color: '#ffd60a' },
];

export default function Stats() {
    return (
        <section className="py-20 px-4" style={{ background: 'rgba(13,13,21,0.5)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, i) => (
                        <FadeInOnScroll key={stat.label} delay={i * 0.1}>
                            <div
                                className="rounded-2xl p-6 text-center"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div
                                    className="text-4xl sm:text-5xl font-extrabold mb-2"
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: stat.color,
                                    }}
                                >
                                    {stat.special ? (
                                        stat.special
                                    ) : (
                                        <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                                    )}
                                </div>
                                <div className="text-[#555555] text-sm">{stat.label}</div>

                                {/* Mini sparkline */}
                                <div className="flex items-end justify-center gap-0.5 mt-3 h-8">
                                    {[20, 35, 25, 50, 35, 65, 45, 80, 60, 95].map((h, j) => (
                                        <div
                                            key={j}
                                            className="w-1 rounded-sm opacity-30"
                                            style={{
                                                height: `${h}%`,
                                                background: stat.color,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
