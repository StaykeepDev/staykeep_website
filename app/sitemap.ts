import { MetadataRoute } from 'next';

const SITE_URL = 'https://staykeep.com';

const FEATURE_SLUGS = [
    'bookings', 'rooms', 'channels', 'billing', 'inventory',
    'reviews', 'messaging', 'website-builder', 'reports', 'staff'
];

const BLOG_SLUGS = [
    '5-ways-increase-direct-bookings',
    'dynamic-pricing-boost-revenue',
    'staykeep-manage-whats-new-2024',
    'complete-guide-managing-ota-channels',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        '', '/manage', '/pricing', '/features', '/about', '/contact',
        '/blog', '/privacy', '/terms', '/refund',
    ].map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1 : 0.8,
    }));

    const featurePages = FEATURE_SLUGS.map((slug) => ({
        url: `${SITE_URL}/features/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const blogPages = BLOG_SLUGS.map((slug) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...featurePages, ...blogPages];
}
