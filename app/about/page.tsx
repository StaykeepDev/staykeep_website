'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';
import CTABanner from '@/components/sections/CTABanner';



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



            <CTABanner />
        </>
    );
}
