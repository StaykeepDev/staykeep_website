import type { Metadata } from 'next';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

export const metadata: Metadata = {
    title: 'Refund Policy — StayKeep',
};

const SECTIONS = [
    {
        title: 'Subscription Refunds',
        content: 'Monthly subscriptions are non-refundable after the billing date. Annual subscriptions may be refunded on a pro-rata basis within 30 days of purchase. After 30 days, the remaining balance is non-refundable.',
    },
    {
        title: 'Free Trial',
        content: 'Your 14-day free trial incurs no charges. No refund is applicable as no payment is collected during the trial period.',
    },
    {
        title: 'Booking Cancellation Refunds',
        content: 'Booking cancellation refunds are governed by the individual property\'s cancellation policy as set in StayKeep. StayKeep is not responsible for disputes between hosts and guests regarding booking refunds.',
    },
    {
        title: 'How to Request a Refund',
        content: 'Submit your refund request to billing@staykeep.com within the eligible period. Include your account email, subscription details, and reason for the request. We process eligible refunds within 5-7 business days.',
    },
    {
        title: 'Contact for Disputes',
        content: 'For billing disputes, contact billing@staykeep.com or call +91 99807 83609 during business hours (Mon-Fri, 9am-6pm IST)',
    },
];

export default function RefundPage() {
    return (
        <section className="pt-32 pb-32 px-4">
            <div className="max-w-3xl mx-auto">
                <FadeInOnScroll>
                    <h1 className="text-4xl font-extrabold mb-2">Refund Policy</h1>
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
