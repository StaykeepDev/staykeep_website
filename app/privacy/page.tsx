import type { Metadata } from 'next';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

export const metadata: Metadata = {
    title: 'Privacy Policy — StayKeep',
    description: 'StayKeep privacy policy — how we collect, use, and protect your data.',
};

const SECTIONS = [
    {
        title: 'Information We Collect',
        content: 'We collect information you provide when creating an account, managing properties, or using our services. This includes name, email, phone number, property details, booking data, and payment information.',
    },
    {
        title: 'How We Use Your Information',
        content: 'We use your data to provide and improve our services, process bookings and payments, send operational notifications, and generate analytics to help you run your property better.',
    },
    {
        title: 'Data Storage & Security',
        content: 'Your data is stored on secure servers in India. We use industry-standard encryption (TLS/SSL) for data in transit and at rest. We conduct regular security audits and follow best practices for data protection.',
    },
    {
        title: 'Third-Party Services',
        content: 'We integrate with third-party services including Razorpay (payments), Airbnb, Booking.com (channel manager), and analytics tools. These services have their own privacy policies that govern their data handling.',
    },
    {
        title: 'Your Rights',
        content: 'You have the right to access, correct, or delete your personal data. You can request data export or account deletion at any time by contacting us at privacy@staykeep.com. We comply with applicable Indian data protection regulations.',
    },
    {
        title: 'Contact Us',
        content: 'For privacy-related questions or requests, contact our Data Protection Officer at privacy@staykeep.com or write to StayKeep Technologies, Bangalore, Karnataka 560001.',
    },
];

export default function PrivacyPage() {
    return (
        <section className="pt-32 pb-32 px-4">
            <div className="max-w-3xl mx-auto">
                <FadeInOnScroll>
                    <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
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
