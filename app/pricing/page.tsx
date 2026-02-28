'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Minus, Plus, Check, ChevronDown } from 'lucide-react';
import GradientMesh from '@/components/animations/GradientMesh';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import CTABanner from '@/components/sections/CTABanner';
import { PRICING_ITEMS, INCLUDED_FEATURES, FAQ_ITEMS, GST_RATE } from '@/content/pricing';

function PricingCalculator() {
    const [rooms, setRooms] = useState(10);
    const [addons, setAddons] = useState<Record<string, number>>({
        website: 0,
        channels: 0,
        adcenter: 0,
        sms: 0,
        whatsapp: 0,
    });
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        website: false,
        channels: false,
        adcenter: false,
        sms: false,
        whatsapp: false,
    });

    const roomCost = rooms * 100;
    const addonCost = PRICING_ITEMS.filter((p) => p.optional && enabled[p.id]).reduce((sum, item) => {
        if (item.perProperty) return sum + item.price * (addons[item.id] || 1);
        return sum + item.price;
    }, 0);
    const subtotal = roomCost + addonCost;
    const gst = Math.round(subtotal * GST_RATE);
    const total = subtotal + gst;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Controls */}
            <div
                className="rounded-2xl p-8"
                style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
                <h3 className="text-lg font-bold text-white mb-6">Configure your plan</h3>

                {/* Rooms slider */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-[#888888]">Total rooms</label>
                        <span className="text-2xl font-mono font-bold text-white">{rooms}</span>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={200}
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{ background: `linear-gradient(to right, #e94560 ${rooms / 2}%, rgba(255,255,255,0.1) ${rooms / 2}%)` }}
                    />
                    <div className="flex justify-between text-xs text-[#444455] mt-1">
                        <span>1</span><span>100</span><span>200</span>
                    </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-[#888888]">Add-ons</label>
                    {PRICING_ITEMS.filter((p) => p.optional).map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.04)]">
                            <button
                                onClick={() => setEnabled((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                style={{
                                    background: enabled[item.id] ? '#e94560' : 'rgba(255,255,255,0.06)',
                                    border: `1px solid ${enabled[item.id] ? '#e94560' : 'rgba(255,255,255,0.1)'}`,
                                }}
                            >
                                {enabled[item.id] && <Check size={10} strokeWidth={3} />}
                            </button>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-white">{item.name}</div>
                                <div className="text-xs text-[#555555]">₹{item.price.toLocaleString('en-IN')} {item.unit}</div>
                            </div>
                            {item.perProperty && enabled[item.id] && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setAddons((a) => ({ ...a, [item.id]: Math.max(1, (a[item.id] || 1) - 1) }))}
                                        className="w-6 h-6 rounded-lg border border-[#1a1a2e] text-[#888888] flex items-center justify-center hover:text-white transition-colors"
                                    >
                                        <Minus size={10} />
                                    </button>
                                    <span className="text-sm font-mono text-white w-4 text-center">{addons[item.id] || 1}</span>
                                    <button
                                        onClick={() => setAddons((a) => ({ ...a, [item.id]: (a[item.id] || 1) + 1 }))}
                                        className="w-6 h-6 rounded-lg border border-[#1a1a2e] text-[#888888] flex items-center justify-center hover:text-white transition-colors"
                                    >
                                        <Plus size={10} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div>
                <div
                    className="rounded-2xl p-8 sticky top-24"
                    style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <h3 className="text-lg font-bold text-white mb-6">Your estimate</h3>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#888888]">{rooms} rooms × ₹100</span>
                            <span className="text-white font-mono">₹{roomCost.toLocaleString('en-IN')}</span>
                        </div>
                        {PRICING_ITEMS.filter((p) => p.optional && enabled[p.id]).map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-[#888888]">
                                    {item.name}{item.perProperty ? ` × ${addons[item.id] || 1}` : ''}
                                </span>
                                <span className="text-white font-mono">
                                    ₹{(item.perProperty ? item.price * (addons[item.id] || 1) : item.price).toLocaleString('en-IN')}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-[#1a1a2e] pt-3 mt-3">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#888888]">Subtotal</span>
                                <span className="text-white font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#888888]">GST (18%)</span>
                                <span className="text-white font-mono">₹{gst.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                        <div className="border-t border-[#1a1a2e] pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Total / month</span>
                                <span className="text-2xl font-mono font-bold text-[#e94560]">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#d43a55] transition-all"
                        style={{ boxShadow: '0 0 20px rgba(233,69,96,0.3)' }}
                    >
                        Start 14-Day Free Trial
                    </a>
                    <p className="text-center text-xs text-[#444455] mt-3">No credit card required</p>
                </div>
            </div>
        </div>
    );
}

function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
                <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                    >
                        <span className="font-medium text-white">{faq.question}</span>
                        <ChevronDown
                            size={16}
                            className="text-[#555555] flex-shrink-0 ml-4 transition-transform"
                            style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                    </button>
                    {open === i && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 pb-5 text-sm text-[#888888] leading-relaxed"
                        >
                            {faq.answer}
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function PricingPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                            style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)', color: '#e94560' }}
                        >
                            💰 Simple, usage-based pricing
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">
                            Pay for what you use
                        </h1>
                        <p className="text-[#888888] text-xl">No tiers. No surprises. Just simple per-room pricing.</p>
                    </motion.div>
                </div>
            </section>

            {/* Calculator */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <PricingCalculator />
                </div>
            </section>

            {/* Included features */}
            <section className="py-20 px-4" style={{ background: 'rgba(13,13,21,0.5)' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <FadeInOnScroll>
                        <h2 className="text-3xl font-bold mb-10">Everything included</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {INCLUDED_FEATURES.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2.5 text-sm text-[#888888] text-left"
                                >
                                    <Check size={14} className="text-[#06d6a0] flex-shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <FadeInOnScroll className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
                        <p className="text-[#888888]">Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-[#e94560] hover:underline">Contact us</a>.</p>
                    </FadeInOnScroll>
                    <FAQ />
                </div>
            </section>

            <CTABanner />
        </>
    );
}
