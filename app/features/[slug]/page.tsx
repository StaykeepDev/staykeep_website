import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';
import CTABanner from '@/components/sections/CTABanner';
import { FEATURES, FEATURE_DETAILS } from '@/content/features';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const feature = FEATURES.find((f) => f.slug === slug);
    if (!feature) return {};
    return {
        title: `${feature.name} — StayKeep`,
        description: feature.description,
    };
}

export default async function FeaturePage({ params }: Props) {
    const { slug } = await params;
    const feature = FEATURES.find((f) => f.slug === slug);
    if (!feature) notFound();

    const details = FEATURE_DETAILS[slug];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0" style={{
                    background: `radial-gradient(ellipse at 50% 40%, rgba(${feature.accentRgb},0.12) 0%, transparent 60%)`
                }} />
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                <div className="relative max-w-3xl mx-auto">
                    <FadeInOnScroll>
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-6"
                            style={{
                                background: `rgba(${feature.accentRgb},0.1)`,
                                border: `1px solid rgba(${feature.accentRgb},0.25)`,
                                boxShadow: `0 0 30px rgba(${feature.accentRgb},0.15)`,
                            }}
                        >
                            {feature.icon}
                        </div>
                        <div className="text-sm font-medium mb-3 uppercase tracking-wider" style={{ color: feature.color }}>
                            Feature
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">{feature.headline}</h1>
                        <p className="text-[#888888] text-xl max-w-2xl mx-auto">{feature.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <Link
                                href="#trial"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold"
                                style={{ background: feature.color, boxShadow: `0 0 30px rgba(${feature.accentRgb},0.3)` }}
                            >
                                Start Free Trial <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="/features"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#1a1a2e] text-white font-semibold hover:border-[rgba(255,255,255,0.15)] transition-all"
                            >
                                See All Features
                            </Link>
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>

            {/* Key capabilities */}
            {details?.capabilities && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <FadeInOnScroll className="text-center mb-10">
                            <h2 className="text-3xl font-bold">Key capabilities</h2>
                        </FadeInOnScroll>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {details.capabilities.map((cap, i) => (
                                <FadeInOnScroll key={cap.title} delay={i * 0.08}>
                                    <div
                                        className="rounded-2xl p-6 text-center h-full"
                                        style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
                                    >
                                        <div className="text-3xl mb-3">{cap.icon}</div>
                                        <h3 className="font-bold text-white mb-2">{cap.title}</h3>
                                        <p className="text-[#555555] text-sm">{cap.desc}</p>
                                    </div>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Detailed sections */}
            {details?.sections && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto space-y-16">
                        {details.sections.map((section, i) => (
                            <FadeInOnScroll key={section.heading} delay={i * 0.05}>
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''}`}>
                                    {/* Text */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{section.heading}</h3>
                                        <p className="text-[#888888] leading-relaxed mb-6">{section.body}</p>
                                        {section.bullets && (
                                            <ul className="space-y-3">
                                                {section.bullets.map((bullet) => (
                                                    <li key={bullet} className="flex items-start gap-3 text-sm text-[#888888]">
                                                        <span
                                                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5"
                                                            style={{ background: `rgba(${feature.accentRgb},0.15)`, color: feature.color }}
                                                        >
                                                            ✓
                                                        </span>
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Visual panel */}
                                    <div
                                        className="rounded-2xl p-8 flex items-center justify-center"
                                        style={{
                                            background: `rgba(${feature.accentRgb},0.04)`,
                                            border: `1px solid rgba(${feature.accentRgb},0.12)`,
                                            minHeight: 200,
                                        }}
                                    >
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">{feature.icon}</div>
                                            <div className="text-sm font-medium" style={{ color: feature.color }}>{section.heading}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </section>
            )}

            <CTABanner />
        </>
    );
}
