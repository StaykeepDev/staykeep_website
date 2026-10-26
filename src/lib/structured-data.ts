import {
  SITE_URL,
  SITE_NAME,
  APP_URL,
  MANAGE_URL,
  LEGAL_NAME,
  CIN,
  ADDRESS_PARTS,
  CONTACT_EMAIL,
  PLAY_GUEST_URL,
  PLAY_MANAGE_URL,
} from '../content/site';
import type { FaqItem } from '../content/faq';

export type PageType = 'home' | 'about' | 'contact' | 'page';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Readable names for the breadcrumb trail, keyed by path. */
const CRUMB_NAMES: Record<string, string> = {
  '/owners': 'For property owners',
  '/homestay-software': 'Homestay software',
  '/about': 'About',
  '/contact': 'Contact',
  '/privacy': 'Privacy policy',
  '/terms': 'Terms of service',
  '/refund': 'Refund policy',
};

export function buildGraph(opts: {
  path: string;
  url: string;
  title: string;
  description: string;
  pageType?: PageType;
  faq?: FaqItem[];
}): Record<string, unknown> {
  const { path, url, title, description, faq } = opts;
  const pageType = opts.pageType ?? (path === '/' ? 'home' : 'page');
  const logo = new URL('/icon-512.png', SITE_URL).toString();

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      identifier: CIN,
      url: SITE_URL,
      logo,
      email: CONTACT_EMAIL,
      telephone: '+91-99807-83609',
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS_PARTS.streetAddress,
        addressLocality: ADDRESS_PARTS.addressLocality,
        addressRegion: ADDRESS_PARTS.addressRegion,
        postalCode: ADDRESS_PARTS.postalCode,
        addressCountry: ADDRESS_PARTS.addressCountry,
      },
      areaServed: 'IN',
      sameAs: [PLAY_GUEST_URL, PLAY_MANAGE_URL],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-99807-83609',
          email: CONTACT_EMAIL,
          contactType: 'customer service',
          areaServed: 'IN',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${APP_URL}/stays?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app-guest`,
      name: 'StayKeep',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Android, Web',
      url: APP_URL,
      downloadUrl: PLAY_GUEST_URL,
      publisher: { '@id': ORG_ID },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app-manage`,
      name: 'StayKeep Manage',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, Web',
      url: MANAGE_URL,
      downloadUrl: PLAY_MANAGE_URL,
      publisher: { '@id': ORG_ID },
    },
  ];

  if (pageType === 'about' || pageType === 'contact') {
    graph.push({
      '@type': pageType === 'about' ? 'AboutPage' : 'ContactPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
    });
  }

  if (faq && faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  if (path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: CRUMB_NAMES[path] ?? title.replace(/ \| StayKeep$/, ''),
          item: url,
        },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
