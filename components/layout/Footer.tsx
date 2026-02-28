import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { FOOTER_LINKS, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

const SOCIAL_ICONS = {
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
};

const SOCIALS = [
    { icon: 'twitter', href: '#', label: 'Twitter' },
    { icon: 'instagram', href: '#', label: 'Instagram' },
    { icon: 'linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'youtube', href: '#', label: 'YouTube' },
] as const;

export default function Footer() {
    return (
        <footer className="bg-[#0d0d15] border-t border-[#1a1a2e] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#e94560] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10Z" fill="white" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg text-white">{SITE_NAME}</span>
                        </Link>
                        <p className="text-[#555555] text-sm mb-6 max-w-xs leading-relaxed">{SITE_TAGLINE}</p>
                        <div className="flex items-center gap-3">
                            {SOCIALS.map((s) => {
                                const Icon = SOCIAL_ICONS[s.icon];
                                return (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="w-8 h-8 rounded-lg border border-[#1a1a2e] flex items-center justify-center text-[#555555] hover:text-white hover:border-[rgba(255,255,255,0.12)] transition-all"
                                    >
                                        <Icon size={14} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.product.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-[#555555] hover:text-white text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Features</h4>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.features.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-[#555555] hover:text-white text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.company.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-[#555555] hover:text-white text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.legal.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-[#555555] hover:text-white text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1a1a2e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#555555] text-sm">
                        © {new Date().getFullYear()} StayKeep. All rights reserved.
                    </p>
                    <p className="text-[#555555] text-sm">
                        Made with ❤️ in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
