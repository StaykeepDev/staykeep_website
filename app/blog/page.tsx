import Link from 'next/link';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';

export const metadata: Metadata = {
    title: 'Blog — StayKeep',
    description: 'Hospitality tips, product updates, and industry insights from the StayKeep team.',
};

const POSTS = [
    {
        slug: '5-ways-increase-direct-bookings',
        title: '5 Ways to Increase Direct Bookings for Your Homestay',
        excerpt: 'Reduce your OTA dependency and keep more revenue with these proven strategies for driving direct bookings.',
        category: 'Hospitality Tips',
        date: 'Feb 15, 2024',
        readTime: '5 min read',
        color: '#e94560',
        gradient: 'from-[#e94560] to-[#9b5de5]',
    },
    {
        slug: 'staykeep-manage-whats-new-2024',
        title: 'StayKeep Manage: What\'s New in 2024',
        excerpt: 'Channel manager, website builder, and inventory management — we shipped a lot this year. Here\'s what\'s new.',
        category: 'Product Updates',
        date: 'Jan 28, 2024',
        readTime: '4 min read',
        color: '#9b5de5',
        gradient: 'from-[#9b5de5] to-[#06d6a0]',
    },
    {
        slug: 'dynamic-pricing-boost-revenue',
        title: 'How Dynamic Pricing Can Boost Your Revenue by 30%',
        excerpt: 'Seasonal rates, weekend pricing, and last-minute discounts — learn how to price your property to maximize revenue.',
        category: 'Hospitality Tips',
        date: 'Jan 10, 2024',
        readTime: '7 min read',
        color: '#06d6a0',
        gradient: 'from-[#06d6a0] to-[#f77f00]',
    },
    {
        slug: 'complete-guide-managing-ota-channels',
        title: 'The Complete Guide to Managing OTA Channels',
        excerpt: 'Airbnb, Booking.com, MakeMyTrip — how to manage multiple channels without double bookings or rate parity issues.',
        category: 'How-To Guides',
        date: 'Dec 22, 2023',
        readTime: '10 min read',
        color: '#f77f00',
        gradient: 'from-[#f77f00] to-[#e94560]',
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    'Hospitality Tips': '#e94560',
    'Product Updates': '#9b5de5',
    'How-To Guides': '#06d6a0',
    'Industry News': '#f77f00',
};

export default function BlogPage() {
    return (
        <>
            <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-2xl mx-auto">
                    <FadeInOnScroll>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">Blog</h1>
                        <p className="text-[#888888] text-xl">Hospitality insights, product updates, and how-to guides.</p>
                    </FadeInOnScroll>
                </div>
            </section>

            <section className="py-12 px-4 pb-32">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {POSTS.map((post, i) => (
                        <FadeInOnScroll key={post.slug} delay={i * 0.08}>
                            <Link href={`/blog/${post.slug}`}>
                                <div
                                    className="rounded-2xl overflow-hidden h-full group cursor-pointer hover:-translate-y-1 transition-transform"
                                    style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                                >
                                    {/* Gradient header (instead of image) */}
                                    <div
                                        className={`h-40 relative overflow-hidden bg-gradient-to-br ${post.gradient}`}
                                        style={{ opacity: 0.7 }}
                                    >
                                        {/* Animated pattern */}
                                        <div className="absolute inset-0 dot-grid opacity-30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-5xl opacity-20">{
                                                post.category === 'Hospitality Tips' ? '🏨' :
                                                    post.category === 'Product Updates' ? '🚀' :
                                                        post.category === 'How-To Guides' ? '📖' : '📰'
                                            }</div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className="text-xs font-medium px-2.5 py-1 rounded-full"
                                                style={{
                                                    background: `${CATEGORY_COLORS[post.category] || '#888'}20`,
                                                    color: CATEGORY_COLORS[post.category] || '#888',
                                                }}
                                            >
                                                {post.category}
                                            </span>
                                        </div>
                                        <h2 className="font-bold text-white text-lg mb-2 group-hover:text-[#e94560] transition-colors leading-snug">
                                            {post.title}
                                        </h2>
                                        <p className="text-[#555555] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-[#444455]">
                                            <span>{post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeInOnScroll>
                    ))}
                </div>
            </section>
        </>
    );
}
