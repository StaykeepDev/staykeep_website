import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import GradientMesh from '@/components/animations/GradientMesh';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

const POSTS: Record<string, {
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string[];
    color: string;
}> = {
    '5-ways-increase-direct-bookings': {
        title: '5 Ways to Increase Direct Bookings for Your Homestay',
        category: 'Hospitality Tips',
        date: 'Feb 15, 2024',
        readTime: '5 min read',
        color: '#e94560',
        content: [
            'If you\'re running a homestay or boutique property in India, OTA commissions can eat up 15-25% of your revenue. The good news? There are proven strategies to reduce your dependency on these platforms while still filling your rooms.',
            '**1. Build Your Own Website with a Booking Widget**',
            'Your property deserves its own digital home. With StayKeep\'s Website Builder, you can create a professional property website in minutes — with a built-in booking widget that allows guests to book directly, commission-free.',
            '**2. Collect Regular Guest Contact Info**',
            'Make a habit of recording guest email addresses and phone numbers during check-in. These guests already trust you — they\'re your best source of repeat bookings and referrals.',
            '**3. Run Return Guest Incentives**',
            '"Book direct next time and get 10% off" is a simple but powerful incentive. Mention it at checkout, add it to your receipt, and follow up via WhatsApp.',
            '**4. Optimize Your Google Business Profile**',
            'A complete, photo-rich Google Business Profile with regular reviews drives significant organic discovery — for free. Many travelers now search directly on Google Maps for accommodation.',
            '**5. Leverage Social Media for Direct Inquiry**',
            'Instagram and WhatsApp Business are powerful for direct-to-guest communication, especially for higher-end experiences. Share behind-the-scenes content and add your direct booking link prominently.',
        ],
    },
    'dynamic-pricing-boost-revenue': {
        title: 'How Dynamic Pricing Can Boost Your Revenue by 30%',
        category: 'Hospitality Tips',
        date: 'Jan 10, 2024',
        readTime: '7 min read',
        color: '#06d6a0',
        content: [
            'Most independent hotel and homestay owners in India use the same rate year-round — or make occasional manual adjustments during obvious peak seasons. This leaves significant revenue on the table.',
            '**What is Dynamic Pricing?**',
            'Dynamic pricing means adjusting your rates automatically based on demand signals: time of year, day of week, how far in advance the booking is, local events, and occupancy levels.',
            '**The Revenue Impact**',
            'Properties that implement even basic dynamic pricing rules see 20-35% revenue increases without adding a single room. The key is charging more when demand is high, and filling vacant rooms with competitive pricing when demand is low.',
            '**Three Rules to Start With**',
            '1. Weekend premium: Add 20% to Friday and Saturday nights. 2. Last-minute discount: Offer 15% off for bookings within 72 hours of check-in to fill gaps. 3. Peak season: Identify your top 3 peak months and increase rates 30-50%.',
            '**Setting Up in StayKeep**',
            'StayKeep\'s Bookings module lets you create pricing rules by date range, day of week, or booking lead time. Set it once, and your rates adjust automatically.',
        ],
    },
    'staykeep-manage-whats-new-2024': {
        title: "StayKeep Manage: What's New in 2024",
        category: 'Product Updates',
        date: 'Jan 28, 2024',
        readTime: '4 min read',
        color: '#9b5de5',
        content: [
            "2024 was a big year for StayKeep Manage. We shipped 3 major modules and dozens of improvements based on feedback from our growing community of hosts across India.",
            '**Channel Manager — Now Live**',
            'After months in beta, our Channel Manager is now available for all properties. Connect Airbnb, Booking.com, and MakeMyTrip with two-way sync for rates, availability, and bookings. Say goodbye to double bookings forever.',
            '**Website Builder**',
            "Every StayKeep Manage account now comes with our drag-and-drop Website Builder. Create a professional property website with your own booking widget in under 10 minutes. No coding required.",
            '**Inventory Management**',
            'Track minibar items, room service products, and supplies. Set cost and selling prices, track stock levels, and sell directly to guests — items auto-add to their booking bill at checkout.',
            "**What's Coming Next**",
            "We're working on WhatsApp integration for unified messaging, Aadhaar-based ID verification, and advanced analytics with Rev PAR tracking. Stay tuned.",
        ],
    },
    'complete-guide-managing-ota-channels': {
        title: 'The Complete Guide to Managing OTA Channels',
        category: 'How-To Guides',
        date: 'Dec 22, 2023',
        readTime: '10 min read',
        color: '#f77f00',
        content: [
            "If you're listed on Airbnb, Booking.com, and MakeMyTrip simultaneously, you know the pain: updating rates on three different platforms, risking double bookings, and juggling three separate inboxes.",
            '**The OTA Landscape in India**',
            "Airbnb dominates for international and premium domestic travelers. Booking.com is strong for business travelers and urban properties. MakeMyTrip and Goibibo lead for domestic leisure travel — especially tier-2 and tier-3 cities.",
            '**The Double Booking Problem**',
            'Without a channel manager, a booking on Airbnb won\'t automatically close your Booking.com availability. This leads to double bookings — one of the most damaging situations for a host\'s reviews and reputation.',
            '**Using a Channel Manager**',
            'A channel manager like the one built into StayKeep Manage maintains a single inventory pool. When a room is booked on any channel, availability is updated everywhere within seconds.',
            '**Rate Parity vs. Channel-Specific Pricing**',
            'Rate parity means showing the same price across all channels. Channel-specific pricing means adjusting rates to account for each OTA\'s commission (Airbnb: 3%, Booking.com: 15%). StayKeep lets you set both strategies.',
        ],
    },
};

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = POSTS[slug];
    if (!post) return {};
    return { title: `${post.title} — StayKeep Blog`, description: post.content[0]?.slice(0, 160) };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = POSTS[slug];
    if (!post) notFound();

    return (
        <>
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0" style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${post.color}12 0%, transparent 60%)`,
                }} />
                <div className="relative max-w-3xl mx-auto">
                    <FadeInOnScroll>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors mb-8">
                            <ArrowLeft size={14} /> Back to Blog
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${post.color}20`, color: post.color }}>
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-[#444455]"><Clock size={11} /> {post.readTime}</span>
                            <span className="text-xs text-[#444455]">{post.date}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight leading-tight">{post.title}</h1>
                    </FadeInOnScroll>
                </div>
            </section>

            <section className="py-8 px-4 pb-32">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-invert max-w-none space-y-5">
                        {post.content.map((para, i) => (
                            <FadeInOnScroll key={i} delay={i * 0.06}>
                                {para.startsWith('**') ? (
                                    <h2 className="text-xl font-bold text-white mt-8 mb-3">
                                        {para.replace(/\*\*/g, '')}
                                    </h2>
                                ) : (
                                    <p className="text-[#888888] leading-relaxed">{para}</p>
                                )}
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
