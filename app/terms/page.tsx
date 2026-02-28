import type { Metadata } from 'next';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

export const metadata: Metadata = {
    title: 'Terms of Service — StayKeep',
};

const SECTIONS = [
    { title: 'Acceptance of Terms', content: 'By accessing or using StayKeep, you agree to these Terms of Service. If you disagree with any part, you may not access the service.' },
    { title: 'Services Description', content: 'StayKeep provides a property management platform ("StayKeep Manage") and a guest booking service. Features may change with reasonable notice.' },
    { title: 'User Accounts', content: 'You are responsible for maintaining the security of your account credentials. Notify us immediately at security@staykeep.com of any unauthorized access.' },
    { title: 'Booking & Cancellation', content: 'Cancellation policies are set by individual properties. StayKeep facilitates but is not liable for cancellation disputes between hosts and guests.' },
    { title: 'Payment Terms', content: 'Subscriptions are billed monthly or annually. Prices exclude GST. Failed payments may result in service suspension after 7 days notice.' },
    { title: 'Host Responsibilities', content: 'Hosts are responsible for accurate property listings, compliance with local laws, tax obligations, and providing the experience described to guests.' },
    { title: 'Limitation of Liability', content: 'StayKeep is not liable for indirect damages, loss of revenue, or data loss beyond the amount paid in the preceding month. Maximum liability is capped at 3 months subscription value.' },
    { title: 'Contact', content: 'For legal matters, contact legal@staykeep.com or StayKeep Technologies, Bangalore, Karnataka 560001.' },
];

export default function TermsPage() {
    return (
        <section className="pt-32 pb-32 px-4">
            <div className="max-w-3xl mx-auto">
                <FadeInOnScroll>
                    <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
                    <p className="text-[#555555] text-sm mb-12">Last updated: January 1, 2024</p>
                    <div className="space-y-10">
                        {SECTIONS.map((section) => (
                            <div key={section.title}>
                                <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                                <p className="text-[#888888] leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
