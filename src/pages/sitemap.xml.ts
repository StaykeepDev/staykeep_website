import type { APIRoute } from 'astro';
import { SITE_URL } from '../content/site';

interface Entry {
  path: string;
  priority: string;
  changefreq: string;
}

const ENTRIES: Entry[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/owners', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = () => {
  const urls = ENTRIES.map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
