export interface PricingItem {
    id: string;
    name: string;
    price: number;
    unit: string;
    perProperty?: boolean;
    optional?: boolean;
}

export const PRICING_ITEMS: PricingItem[] = [
    { id: 'rooms', name: 'Rooms', price: 100, unit: 'per room/month' },
    { id: 'website', name: 'Website Builder', price: 500, unit: 'per property/month', optional: true, perProperty: true },
    { id: 'channels', name: 'Channel Manager', price: 800, unit: 'per property/month', optional: true, perProperty: true },
    { id: 'adcenter', name: 'Ad Center', price: 1500, unit: 'flat/month', optional: true },
    { id: 'sms', name: 'SMS Pack (500 messages)', price: 299, unit: 'per month', optional: true },
    { id: 'whatsapp', name: 'WhatsApp Pack (1000 messages)', price: 499, unit: 'per month', optional: true },
];

export const INCLUDED_FEATURES = [
    'Unlimited bookings',
    'Unlimited staff',
    'All 13 modules',
    'Reports & analytics',
    'Guest app listing',
    'Multi-property support',
    'Payment tracking',
    '14-day free trial',
];

export const FAQ_ITEMS = [
    {
        question: 'Is there a free trial?',
        answer: 'Yes, 14 days free with full access to all features. No credit card required to start.',
    },
    {
        question: 'Can I change my room count anytime?',
        answer: 'Yes, billing auto-adjusts. Add or remove rooms and your next invoice reflects the change pro-rata.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'UPI, credit/debit cards, net banking, and bank transfer via Razorpay.',
    },
    {
        question: 'Is there a contract or lock-in?',
        answer: 'No. Cancel anytime. Your data is retained for 30 days after cancellation.',
    },
    {
        question: 'Do you offer custom pricing for large chains?',
        answer: 'Yes. Contact us for volume discounts on 100+ rooms across multiple properties.',
    },
    {
        question: 'What happens after the trial?',
        answer: "You'll be prompted to add a payment method. No charge during the 14-day trial period.",
    },
];

export const GST_RATE = 0.18;
