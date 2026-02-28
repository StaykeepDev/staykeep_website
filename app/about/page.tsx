'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';
import CTABanner from '@/components/sections/CTABanner';

const TEAM = [
    { name: 'Kiran Patel', role: 'Co-founder & CEO', color: '#e94560' },
    { name: 'Meera Rao', role: 'Co-founder & CTO', color: '#9b5de5' },
    { name: 'Arjun Singh', role: 'Head of Product', color: '#06d6a0' },
    { name: 'Priya Menon', role: 'Head of Design', color: '#f77f00' },
    { name: 'Rohit Sharma', role: 'Head of Engineering', color: '#00b4d8' },
    { name: 'Divya Nair', role: 'Head of Operations', color: '#ffd60a' },
];

const VALUES = [
    { icon: '🎯', title: 'Mission', body: 'Empower every independent hospitality business in India with world-class software.' },
    { icon: '🌍', title: 'Vision', body: 'Every property, online. Every host, empowered. Every guest, delighted.' },
    { icon: '💎', title: 'Values', body: 'Simple, honest, reliable software built for real hospitality businesses.' },
];

export default function AboutPage() {
    return (
        <>
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-3xl mx-auto">
                    <FadeInOnScroll>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">About StayKeep</h1>
                        <p className="text-[#888888] text-xl leading-relaxed">
                            We&apos;re building the operating system for independent hospitality businesses in India.
                        </p>
                    </FadeInOnScroll>
                </div>
            </section>

            {/* Story */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <FadeInOnScroll>
                        <div className="space-y-6 text-[#888888] leading-relaxed text-lg">
                            <p>
                                StayKeep started with a simple observation: independent hoteliers and homestay hosts in India were managing their properties with WhatsApp, Excel sheets, and notebook ledgers — while struggling with outdated, expensive software designed for large hotel chains.
                            </p>
                            <p>
                                We set out to build something different. A property management system that feels as intuitive as a consumer app, is priced fairly for smaller properties, and actually understands the Indian hospitality context — ₹ pricing, UPI payments, GST billing, Aadhaar verification, and local OTA integrations.
                            </p>
                            <p>
                                Today, StayKeep serves hundreds of properties across India — from beachside homestays in Goa to heritage havelis in Rajasthan, boutique city hotels, and mountain retreats. We&apos;re just getting started.
                            </p>
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>

            {/* Mission/Vision/Values */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {VALUES.map((v, i) => (
                            <FadeInOnScroll key={v.title} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl p-7 text-center h-full"
                                    style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                                >
                                    <motion.div
                                        className="text-4xl mb-4"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                                    >
                                        {v.icon}
                                    </motion.div>
                                    <h3 className="font-bold text-white text-xl mb-3">{v.title}</h3>
                                    <p className="text-[#555555] text-sm leading-relaxed">{v.body}</p>
                                </motion.div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 px-4" style={{ background: 'rgba(13,13,21,0.5)' }}>
                <div className="max-w-5xl mx-auto">
                    <FadeInOnScroll className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Meet the team</h2>
                    </FadeInOnScroll>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {TEAM.map((member, i) => (
                            <FadeInOnScroll key={member.name} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-3 transition-shadow"
                                        style={{
                                            background: `linear-gradient(135deg, ${member.color}30, ${member.color}60)`,
                                            border: `1px solid ${member.color}30`,
                                        }}
                                    >
                                        {member.name.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <div className="text-sm font-semibold text-white">{member.name}</div>
                                    <div className="text-xs text-[#555555] mt-0.5">{member.role}</div>
                                </motion.div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner />
        </>
    );
}
