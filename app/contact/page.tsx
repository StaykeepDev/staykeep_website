'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Check, AlertCircle } from 'lucide-react';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';

const SUBJECTS = ['General Inquiry', 'Sales', 'Support', 'Partnership', 'Custom Pricing'];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <>
            <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
                <GradientMesh />
                <div className="relative max-w-2xl mx-auto">
                    <FadeInOnScroll>
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">Get in touch</h1>
                        <p className="text-[#888888] text-xl">We&apos;d love to hear from you. Our team typically responds within 24 hours.</p>
                    </FadeInOnScroll>
                </div>
            </section>

            <section className="py-16 px-4 pb-32">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Form */}
                    <div className="md:col-span-3">
                        <FadeInOnScroll direction="left">
                            <div className="rounded-2xl p-8" style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-[rgba(6,214,160,0.15)] flex items-center justify-center mb-4">
                                            <Check size={28} className="text-[#06d6a0]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                                        <p className="text-[#888888] text-sm">We&apos;ll get back to you within 24 hours.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-[#888888] mb-1.5">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    placeholder="Arjun Sharma"
                                                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#444455] text-sm focus:outline-none focus:border-[rgba(233,69,96,0.4)] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-[#888888] mb-1.5">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    placeholder="you@example.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#444455] text-sm focus:outline-none focus:border-[rgba(233,69,96,0.4)] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-[#888888] mb-1.5">Phone</label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#444455] text-sm focus:outline-none focus:border-[rgba(233,69,96,0.4)] transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-[#888888] mb-1.5">Subject</label>
                                            <select
                                                required
                                                value={form.subject}
                                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-sm focus:outline-none focus:border-[rgba(233,69,96,0.4)] transition-colors appearance-none"
                                                style={{ background: 'rgba(13,13,21,0.95)' }}
                                            >
                                                <option value="" className="bg-[#0d0d15]">Select a subject</option>
                                                {SUBJECTS.map((s) => <option key={s} value={s} className="bg-[#0d0d15]">{s}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-[#888888] mb-1.5">Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                                placeholder="Tell us how we can help..."
                                                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#444455] text-sm focus:outline-none focus:border-[rgba(233,69,96,0.4)] transition-colors resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#d43a55] transition-all disabled:opacity-60"
                                            style={{ boxShadow: '0 0 20px rgba(233,69,96,0.3)' }}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </FadeInOnScroll>
                    </div>

                    {/* Contact info */}
                    <div className="md:col-span-2">
                        <FadeInOnScroll direction="right">
                            <div className="space-y-6">
                                <div className="rounded-2xl p-6" style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <h3 className="font-bold text-white mb-5">Contact Details</h3>
                                    <div className="space-y-4">
                                        {[
                                            { icon: Mail, text: 'hello@staykeep.com', href: 'mailto:hello@staykeep.com', color: '#e94560' },
                                            { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210', color: '#06d6a0' },
                                            { icon: MapPin, text: 'Bangalore, Karnataka, India', href: '#', color: '#9b5de5' },
                                        ].map(({ icon: Icon, text, href, color }) => (
                                            <a key={text} href={href} className="flex items-center gap-3 text-sm text-[#888888] hover:text-white transition-colors">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                                                    <Icon size={14} style={{ color }} />
                                                </div>
                                                {text}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl p-6" style={{ background: 'rgba(13,13,21,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <h3 className="font-bold text-white mb-3">Business Hours</h3>
                                    <div className="text-sm text-[#888888] space-y-1">
                                        <div>Mon–Fri: 9am–6pm IST</div>
                                        <div>Sat: 10am–2pm IST</div>
                                        <div>Sun: Closed</div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </div>
            </section>
        </>
    );
}
