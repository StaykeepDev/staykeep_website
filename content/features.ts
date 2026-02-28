export interface Feature {
    id: string;
    slug: string;
    name: string;
    headline: string;
    description: string;
    icon: string;
    color: string;
    accentRgb: string;
}

export const FEATURES: Feature[] = [
    {
        id: 'bookings',
        slug: 'bookings',
        name: 'Bookings',
        headline: 'Every booking, one unified system',
        description: 'Manage every reservation from any source — direct, OTA, walk-in — from one powerful inbox.',
        icon: '📅',
        color: '#e94560',
        accentRgb: '233,69,96',
    },
    {
        id: 'rooms',
        slug: 'rooms',
        name: 'Rooms',
        headline: 'Real-time room control',
        description: 'Visual room grid with live status. See available, occupied, cleaning, maintenance at a glance.',
        icon: '🛏️',
        color: '#06d6a0',
        accentRgb: '6,214,160',
    },
    {
        id: 'channels',
        slug: 'channels',
        name: 'Channel Manager',
        headline: 'Sync once, sell everywhere',
        description: 'Connect Airbnb, Booking.com, MakeMyTrip and more. Auto-sync availability, rates, and bookings.',
        icon: '🔄',
        color: '#9b5de5',
        accentRgb: '155,93,229',
    },
    {
        id: 'billing',
        slug: 'billing',
        name: 'Billing & Payments',
        headline: 'Track every rupee',
        description: 'Multi-payment tracking, split bills, receipt generation, daily collection reports.',
        icon: '💳',
        color: '#f77f00',
        accentRgb: '247,127,0',
    },
    {
        id: 'inventory',
        slug: 'inventory',
        name: 'Inventory',
        headline: 'Track, sell, restock',
        description: 'Minibar, food, supplies — track stock, sell to guests, auto-add to booking bill.',
        icon: '📦',
        color: '#00b4d8',
        accentRgb: '0,180,216',
    },
    {
        id: 'reviews',
        slug: 'reviews',
        name: 'Reviews & Ratings',
        headline: 'Build trust, both ways',
        description: 'Two-way reviews. Guests rate your property; you rate your guests. Build reputation.',
        icon: '⭐',
        color: '#ffd60a',
        accentRgb: '255,214,10',
    },
    {
        id: 'messaging',
        slug: 'messaging',
        name: 'Guest Messaging',
        headline: 'Every conversation, one inbox',
        description: 'In-app chat, Airbnb messages, WhatsApp — unified inbox with internal staff notes.',
        icon: '💬',
        color: '#06d6a0',
        accentRgb: '6,214,160',
    },
    {
        id: 'website-builder',
        slug: 'website-builder',
        name: 'Website Builder',
        headline: 'Your property deserves its own website',
        description: 'No-code builder. Custom domain. Booking widget. SEO ready. Live in minutes.',
        icon: '🌐',
        color: '#e94560',
        accentRgb: '233,69,96',
    },
    {
        id: 'reports',
        slug: 'reports',
        name: 'Reports & Analytics',
        headline: 'Data-driven hospitality',
        description: 'Revenue, occupancy, ADR, RevPAR, source breakdown, expense tracking, P&L reports.',
        icon: '📊',
        color: '#9b5de5',
        accentRgb: '155,93,229',
    },
    {
        id: 'staff',
        slug: 'staff',
        name: 'Staff & Roles',
        headline: 'Right access for the right people',
        description: 'Invite staff, assign per-property roles, set granular permissions. Audit everything.',
        icon: '👥',
        color: '#f77f00',
        accentRgb: '247,127,0',
    },
];

export const FEATURE_DETAILS: Record<string, {
    capabilities: { title: string; desc: string; icon: string }[];
    sections: { heading: string; body: string; bullets?: string[] }[];
}> = {
    bookings: {
        capabilities: [
            { title: 'Multi-source Inbox', desc: 'Direct, OTA, walk-in — all in one place', icon: '🗂️' },
            { title: 'Calendar & List View', desc: 'Switch between calendar and list views', icon: '📆' },
            { title: 'Partial Payments', desc: 'Accept advance, balance, extras separately', icon: '💰' },
            { title: 'Status Lifecycle', desc: 'Pending → Confirmed → Checked-in → Out', icon: '✅' },
        ],
        sections: [
            {
                heading: 'Unified booking inbox',
                body: 'All sources in one place. Filter by status, date, source, room type. No more switching between apps.',
                bullets: ['Direct bookings from your website', 'OTA bookings from Airbnb, Booking.com', 'Walk-ins and phone bookings', 'Real-time availability sync'],
            },
            {
                heading: 'Smart pricing',
                body: 'Dynamic pricing rules: seasonal, weekend, last-minute, long-stay, channel-specific.',
                bullets: ['Seasonal rate adjustment', 'Weekend surcharge rules', 'Last-minute discounts', 'Length-of-stay pricing'],
            },
        ],
    },
    rooms: {
        capabilities: [
            { title: 'Room Categories', desc: 'Group rooms by type, amenities, floor', icon: '🏷️' },
            { title: 'Status Board', desc: 'Available, occupied, cleaning, maintenance', icon: '🟢' },
            { title: 'One-tap Assignment', desc: 'Assign or auto-assign rooms to bookings', icon: '🔀' },
            { title: 'Cleaning Queue', desc: 'Manage housekeeping workflow end-to-end', icon: '🧹' },
        ],
        sections: [
            {
                heading: 'Visual room grid',
                body: 'See every room\'s status at a glance. Color-coded: green (available), red (occupied), yellow (cleaning), gray (maintenance).',
                bullets: ['Real-time status updates', 'Filter by floor or category', 'Color-coded status indicators', 'Instant room details on tap'],
            },
            {
                heading: 'Housekeeping workflow',
                body: 'Cleaning checklists, assignment, duration tracking, inspection status.',
                bullets: ['Assign cleaners per room', 'Checklist-based cleaning tasks', 'Track time and performance', 'Inspection before check-in flag'],
            },
        ],
    },
    channels: {
        capabilities: [
            { title: 'Airbnb', desc: 'Full two-way sync with Airbnb', icon: '🏠' },
            { title: 'Booking.com', desc: 'Rates, availability, bookings synced', icon: '🌍' },
            { title: 'MakeMyTrip', desc: 'India\'s largest OTA integrated', icon: '✈️' },
            { title: 'More OTAs', desc: 'Agoda, Expedia, Goibibo and more', icon: '➕' },
        ],
        sections: [
            {
                heading: 'Two-way sync',
                body: 'Rates, availability, and bookings sync automatically. No double bookings. No manual updates.',
                bullets: ['Real-time availability push', 'Instant booking pull', 'Rate parity management', 'Blackout date sync'],
            },
            {
                heading: 'Channel-specific pricing',
                body: 'Set different rates per channel to account for commission differences and maximize revenue.',
                bullets: ['Per-channel rate rules', 'Commission-aware pricing', 'Markup/discount by channel', 'Bulk rate updates'],
            },
        ],
    },
    billing: {
        capabilities: [
            { title: 'Multi-payment', desc: 'Cash, UPI, card, bank transfer', icon: '💵' },
            { title: 'Split Bills', desc: 'Multiple payments per booking', icon: '🔀' },
            { title: 'Receipts', desc: 'Auto-generate GST receipts', icon: '🧾' },
            { title: 'Daily Reports', desc: 'End-of-day collection reports', icon: '📊' },
        ],
        sections: [
            {
                heading: 'Multiple payments per booking',
                body: 'Advance online, balance at check-in, extras during stay. All tracked.',
                bullets: ['Advance payment recording', 'Balance due tracking', 'Mid-stay extras billing', 'Full payment history'],
            },
            {
                heading: 'Three payment flows',
                body: 'Pay to host direct (cash/UPI), Pay online (Razorpay), Pay via OTA (Airbnb handles it).',
                bullets: ['Cash & UPI collection', 'Razorpay online integration', 'OTA payment tracking', 'GST calculation & receipt'],
            },
        ],
    },
    inventory: {
        capabilities: [
            { title: 'Item Catalog', desc: 'Add minibar, food, supplies with cost/price', icon: '📋' },
            { title: 'Stock Tracking', desc: 'Real-time quantity monitoring', icon: '📦' },
            { title: 'Sell to Guests', desc: 'One tap to add to booking bill', icon: '🛒' },
            { title: 'Auto-Bill', desc: 'Consumed items auto-added to checkout', icon: '⚡' },
        ],
        sections: [
            {
                heading: 'Minibar to room service',
                body: 'Everything guests consume is tracked and auto-added to their checkout bill.',
                bullets: ['Minibar stock tracking', 'Room service ordering', 'One-tap billing', 'Inventory deduction on sale'],
            },
            {
                heading: 'Stock alerts',
                body: 'Low stock notifications. Purchase logging. Full movement audit trail.',
                bullets: ['Low stock threshold alerts', 'Purchase order logging', 'Stock movement history', 'Wastage tracking'],
            },
        ],
    },
    reviews: {
        capabilities: [
            { title: 'Guest Reviews', desc: '6 sub-ratings: cleanliness, value, service...', icon: '🌟' },
            { title: 'Host Reviews', desc: 'Rate guests: cleanliness, rules, respect', icon: '👤' },
            { title: 'Public Responses', desc: 'Respond publicly to guest reviews', icon: '💬' },
            { title: 'Moderation', desc: 'Flag inappropriate reviews for review', icon: '🛡️' },
        ],
        sections: [
            {
                heading: 'Guest rates property',
                body: 'Overall + cleanliness, location, value, service, amenities, accuracy. 6 sub-ratings for detailed feedback.',
                bullets: ['Overall star rating', 'Cleanliness score', 'Location & amenities', 'Value for money'],
            },
            {
                heading: 'Host rates guest',
                body: 'Overall + cleanliness, communication, house rules, respect. Plus "would host again" flag.',
                bullets: ['Cleanliness score', 'Communication rating', 'Rules compliance', 'Would host again flag'],
            },
        ],
    },
    messaging: {
        capabilities: [
            { title: 'In-App Chat', desc: 'Direct messaging with guests', icon: '💬' },
            { title: 'OTA Messages', desc: 'Airbnb, Booking.com in one inbox', icon: '📨' },
            { title: 'WhatsApp', desc: 'WhatsApp integration for guest comms', icon: '📱' },
            { title: 'Internal Notes', desc: 'Private staff notes on conversations', icon: '📝' },
        ],
        sections: [
            {
                heading: 'Unified inbox',
                body: 'Airbnb messages, Booking.com, WhatsApp, in-app — all in one thread per guest.',
                bullets: ['All channels in one view', 'Per-booking conversation thread', 'Message status (read/unread)', 'Guest contact card'],
            },
            {
                heading: 'Internal notes',
                body: 'Staff can leave private notes on conversations that guests never see.',
                bullets: ['Private staff annotations', 'Flag important conversations', 'Assign conversations to staff', 'Auto-reply templates'],
            },
        ],
    },
    'website-builder': {
        capabilities: [
            { title: 'Templates', desc: 'Beautiful pre-built property templates', icon: '🎨' },
            { title: 'Custom Domain', desc: 'Your own domain or staykeep.app subdomain', icon: '🌐' },
            { title: 'Booking Widget', desc: 'Embedded widget for direct bookings', icon: '📅' },
            { title: 'SEO Ready', desc: 'Schema markup, sitemaps, fast loading', icon: '🔍' },
        ],
        sections: [
            {
                heading: 'No-code builder',
                body: 'Pick a template, customize colors, add your content. Live in minutes.',
                bullets: ['Drag-and-drop editor', 'Mobile-responsive by default', 'Custom color schemes', 'Media gallery upload'],
            },
            {
                heading: 'Direct bookings',
                body: 'Embedded booking widget lets guests book directly — no OTA commission.',
                bullets: ['Zero commission on direct bookings', 'Real-time availability widget', 'Customizable booking form', 'Instant confirmation emails'],
            },
        ],
    },
    reports: {
        capabilities: [
            { title: 'Revenue Reports', desc: 'Daily, weekly, monthly revenue breakdown', icon: '📈' },
            { title: 'Occupancy Analytics', desc: 'ADR, RevPAR, occupancy rate trends', icon: '🏷️' },
            { title: 'Source Breakdown', desc: 'Revenue by booking source', icon: '🔀' },
            { title: 'P&L Reports', desc: 'Income vs expenses, profit per property', icon: '💰' },
        ],
        sections: [
            {
                heading: 'Key metrics',
                body: 'ADR, RevPAR, occupancy rate, revenue per source, top-performing rooms.',
                bullets: ['Average Daily Rate (ADR)', 'Revenue Per Available Room (RevPAR)', 'Occupancy percentage trends', 'Source-wise revenue split'],
            },
            {
                heading: 'Expense tracking',
                body: 'Log operational costs. See profit & loss per property.',
                bullets: ['Expense categorization', 'Per-property P&L', 'Monthly reports export', 'Custom date range analysis'],
            },
        ],
    },
    staff: {
        capabilities: [
            { title: 'Per-Property Roles', desc: 'Assign roles specific to each property', icon: '🏷️' },
            { title: 'Custom Permissions', desc: 'Module-level access control', icon: '🔐' },
            { title: 'Multi-Property', desc: 'One staff member, multiple properties', icon: '🏢' },
            { title: 'Activity Log', desc: 'Audit trail of all staff actions', icon: '📋' },
        ],
        sections: [
            {
                heading: '6 built-in roles',
                body: 'Manager, Front Desk, Housekeeping, Accountant, F&B Manager, and Custom roles.',
                bullets: ['Manager: full access', 'Front Desk: bookings & check-in', 'Housekeeping: rooms & tasks', 'Accountant: billing & reports'],
            },
            {
                heading: 'Granular permissions',
                body: 'Custom roles with module-level access: { bookings: [view, create], finance: [view] }.',
                bullets: ['Module-level permissions', 'Read vs write access', 'Property-scoped roles', 'Permission inheritance'],
            },
        ],
    },
};
