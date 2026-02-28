'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import BookingCardStack from '@/components/mockups/BookingCardStack';
import RoomGrid from '@/components/mockups/RoomGrid';
import ChannelOrbit from '@/components/mockups/ChannelOrbit';
import StarRating from '@/components/mockups/StarRating';
import ChatBubbles from '@/components/mockups/ChatBubbles';
import ChartAnimations from '@/components/mockups/ChartAnimations';
import { FEATURES } from '@/content/features';

const FEATURE_MOCKUPS: Record<string, React.ReactNode> = {
    bookings: <BookingCardStack />,
    rooms: <RoomGrid />,
    channels: <ChannelOrbit />,
    reviews: <StarRating />,
    messaging: <ChatBubbles />,
    reports: <ChartAnimations />,
    billing: <BillingCounter />,
    inventory: <InventoryBars />,
    staff: <StaffMockup />,
    'website-builder': <WebsiteMockup />,
};

function BillingCounter() {
    return (
        <div className="flex flex-col items-center gap-2 py-3">
            <div className="text-3xl font-mono font-bold text-[#f77f00]">₹45,200</div>
            <div className="flex gap-2 mt-1">
                {['💵', '📱', '💳'].map((icon, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.3 }}
                        className="text-lg"
                    >
                        {icon}
                    </motion.span>
                ))}
            </div>
            <div className="text-xs text-[#555555]">Today's collection</div>
        </div>
    );
}

function InventoryBars() {
    return (
        <div className="flex items-end gap-2 h-16 px-2">
            {[70, 30, 90, 15, 55, 80].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <motion.div
                        className="w-full rounded-t-sm"
                        style={{ background: val < 30 ? '#e94560' : '#06d6a0' }}
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    />
                </div>
            ))}
        </div>
    );
}

function StaffMockup() {
    const ROLES = ['Manager', 'Front Desk', 'Housekeeping'];
    const COLORS = ['#e94560', '#9b5de5', '#06d6a0'];
    return (
        <div className="flex flex-col gap-1.5 py-2">
            {ROLES.map((role, i) => (
                <motion.div
                    key={role}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="flex items-center gap-2 text-xs"
                >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: COLORS[i] }}>
                        {role[0]}
                    </div>
                    <span className="text-[#888888]">{role}</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-medium" style={{ background: `${COLORS[i]}20`, color: COLORS[i] }}>
                        Active
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

function WebsiteMockup() {
    return (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[rgba(255,255,255,0.03)]">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            {['Header', 'Hero Section', 'Rooms Grid', 'Footer'].map((section, i) => (
                <motion.div
                    key={section}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.4 }}
                    className="px-2 py-1 text-[10px] text-[#555555] border-t border-[rgba(255,255,255,0.04)]"
                    style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}
                >
                    {section}
                </motion.div>
            ))}
        </div>
    );
}

const DISPLAY_FEATURES = FEATURES.slice(0, 6);

export default function FeatureGrid() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <FadeInOnScroll className="text-center mb-16">
                    <div className="text-sm font-medium text-[#e94560] mb-4 uppercase tracking-wider">Platform Features</div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Everything you need</h2>
                    <p className="text-[#888888] text-lg max-w-xl mx-auto">
                        13 powerful modules to run your hospitality business end-to-end.
                    </p>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DISPLAY_FEATURES.map((feature, i) => (
                        <FadeInOnScroll key={feature.id} delay={i * 0.08}>
                            <Link href={`/features/${feature.slug}`}>
                                <motion.div
                                    whileHover={{ y: -4, boxShadow: `0 0 30px rgba(${feature.accentRgb},0.15)` }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="group rounded-2xl p-6 h-full flex flex-col cursor-pointer"
                                    style={{
                                        background: 'rgba(13,13,21,0.8)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    {/* Animated mockup area */}
                                    <div
                                        className="rounded-xl mb-5 overflow-hidden flex items-center justify-center"
                                        style={{
                                            background: `rgba(${feature.accentRgb},0.05)`,
                                            border: `1px solid rgba(${feature.accentRgb},0.1)`,
                                            minHeight: 120,
                                        }}
                                    >
                                        {FEATURE_MOCKUPS[feature.id] || (
                                            <span className="text-4xl py-6">{feature.icon}</span>
                                        )}
                                    </div>

                                    <div className="text-2xl mb-2">{feature.icon}</div>
                                    <h3 className="font-bold text-white text-lg mb-2">{feature.name}</h3>
                                    <p className="text-[#555555] text-sm leading-relaxed flex-1">{feature.description}</p>

                                    <div
                                        className="flex items-center gap-1 mt-4 text-sm font-medium group-hover:gap-2 transition-all"
                                        style={{ color: feature.color }}
                                    >
                                        Learn more <ArrowRight size={14} />
                                    </div>
                                </motion.div>
                            </Link>
                        </FadeInOnScroll>
                    ))}
                </div>

                <FadeInOnScroll className="text-center mt-10">
                    <Link
                        href="/features"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1a1a2e] text-[#888888] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all text-sm font-medium"
                    >
                        View all 13 features <ArrowRight size={14} />
                    </Link>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
