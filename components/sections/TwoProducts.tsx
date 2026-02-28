'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

const PRODUCTS = [
    {
        id: 'guest',
        icon: '🏖️',
        title: 'StayKeep',
        subtitle: 'For Guests',
        description: 'Discover unique stays. Search by location, dates, and amenities. Book instantly.',
        features: [
            'Search nearby properties',
            'Instant booking',
            'Wishlist & save stays',
            'Reviews & ratings',
            'Chat with hosts',
            'ID verification',
        ],
        cta: 'Book a Stay',
        href: '/',
        color: '#06d6a0',
        accentRgb: '6,214,160',
    },
    {
        id: 'host',
        icon: '🏢',
        title: 'StayKeep Manage',
        subtitle: 'For Hosts',
        description: 'Run your property like a pro. Bookings, rooms, staff, billing — all from one dashboard.',
        features: [
            'Booking management',
            'Room & housekeeping',
            'Staff roles & access',
            'Billing & invoicing',
            'Channel manager',
            'Inventory tracking',
        ],
        cta: 'Start Managing →',
        href: '/manage',
        color: '#e94560',
        accentRgb: '233,69,96',
    },
];

export default function TwoProducts() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <FadeInOnScroll className="text-center mb-14">
                    <div className="text-sm font-medium text-[#e94560] mb-4 uppercase tracking-wider">Two Products</div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">One platform, two apps</h2>
                    <p className="text-[#888888] text-lg max-w-xl mx-auto">
                        Whether you&apos;re a guest or a host, StayKeep has everything you need.
                    </p>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PRODUCTS.map((product, i) => (
                        <FadeInOnScroll key={product.id} delay={i * 0.15} direction={i === 0 ? 'left' : 'right'}>
                            <motion.div
                                whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(${product.accentRgb},0.1)` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="rounded-2xl p-8 h-full flex flex-col"
                                style={{
                                    background: 'rgba(13,13,21,0.8)',
                                    border: `1px solid rgba(${product.accentRgb},0.12)`,
                                }}
                            >
                                <div className="text-4xl mb-4">{product.icon}</div>
                                <div className="mb-1">
                                    <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                                    <p className="text-sm" style={{ color: product.color }}>{product.subtitle}</p>
                                </div>
                                <p className="text-[#888888] leading-relaxed mt-3 mb-6">{product.description}</p>

                                <ul className="space-y-2.5 mb-8 flex-1">
                                    {product.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2.5 text-sm text-[#888888]">
                                            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]" style={{ background: `${product.color}20`, color: product.color }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={product.href}
                                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                                    style={{
                                        background: `linear-gradient(135deg, ${product.color}dd, ${product.color}99)`,
                                        boxShadow: `0 0 20px rgba(${product.accentRgb},0.25)`,
                                    }}
                                >
                                    {product.cta} <ArrowRight size={15} />
                                </Link>
                            </motion.div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
