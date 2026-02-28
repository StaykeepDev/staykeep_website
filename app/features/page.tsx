import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';
import CTABanner from '@/components/sections/CTABanner';
import { FEATURES } from '@/content/features';

export const metadata: Metadata = {
    title: 'Features — StayKeep',
    description: 'Explore all 10 powerful features of StayKeep for property management.',
};

export default function FeaturesPage() {
    return (
        <>
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-3xl mx-auto">
                    <FadeInOnScroll>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">
                            Everything you need to run your{' '}
                            <span className="gradient-text">hospitality business</span>
                        </h1>
                        <p className="text-[#888888] text-xl">
                            10 powerful modules. One platform. Zero compromises.
                        </p>
                    </FadeInOnScroll>
                </div>
            </section>

            <section className="py-12 px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map((feature, i) => (
                            <FadeInOnScroll key={feature.id} delay={i * 0.06}>
                                <Link href={`/features/${feature.slug}`}>
                                    <div
                                        className="rounded-2xl p-7 h-full flex flex-col group cursor-pointer hover:border-opacity-50 transition-all"
                                        style={{
                                            background: 'rgba(13,13,21,0.8)',
                                            border: `1px solid rgba(${feature.accentRgb},0.1)`,
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                                            style={{ background: `rgba(${feature.accentRgb},0.1)`, border: `1px solid rgba(${feature.accentRgb},0.15)` }}
                                        >
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>
                                        <div className="text-sm font-medium mb-3" style={{ color: feature.color }}>{feature.headline}</div>
                                        <p className="text-[#555555] text-sm leading-relaxed flex-1">{feature.description}</p>
                                        <div
                                            className="flex items-center gap-1 mt-5 text-sm font-medium group-hover:gap-2 transition-all"
                                            style={{ color: feature.color }}
                                        >
                                            Learn more <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </Link>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner />
        </>
    );
}
