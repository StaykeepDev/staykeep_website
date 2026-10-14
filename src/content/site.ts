/**
 * Site-wide constants: URLs, contact details and shared copy fragments.
 * One place to change a link or a number instead of hunting through pages.
 */

export const SITE_URL = 'https://staykeep.com';
export const SITE_NAME = 'StayKeep';
export const SITE_TITLE_SUFFIX = ' | StayKeep';

/** The guest web app. Search page takes `q`, `checkIn`, `checkOut`, `guests` - verified against staykeep_booking_web/src/core/search/search-filters.ts. */
export const APP_URL = 'https://app.staykeep.com';
export const APP_STAYS_URL = APP_URL;

/** The owner app: OTP login, then property setup. */
export const MANAGE_URL = 'https://manage.staykeep.com';

/** One-click demo of StayKeep Manage with sample data (phase 59 D3). */
export const DEMO_URL = 'https://manage.staykeep.com/demo';

/** Legal entity and registered office (docs/OPERATIONS.md, owner 2026-10-12). One constant, used by the footer, legal pages, contact page and JSON-LD. */
export const LEGAL_NAME = 'STAYKEEP (OPC) PRIVATE LIMITED';
export const LEGAL_NAME_DISPLAY = 'StayKeep (OPC) Private Limited';
export const CIN = 'U79900KL2025OPC097111';
export const REGISTERED_ADDRESS =
  'C/O Kalayamthanath (H), Varambetta, Padinhara Thara, Vythiri, Wayanad - 673575, Kerala, India';
export const ADDRESS_PARTS = {
  streetAddress: 'C/O Kalayamthanath (H), Varambetta, Padinhara Thara',
  addressLocality: 'Vythiri',
  addressRegion: 'Kerala',
  postalCode: '673575',
  addressCountry: 'IN',
  district: 'Wayanad',
};

export const PLAY_GUEST_URL = 'https://play.google.com/store/apps/details?id=com.staykeep.app';
export const PLAY_MANAGE_URL = 'https://play.google.com/store/apps/details?id=com.staykeep.manage';

export const CONTACT_EMAIL = 'hello@staykeep.com';
export const CONTACT_PHONE_DISPLAY = '+91 99807 83609';
export const CONTACT_PHONE_TEL = 'tel:+919980783609';

/** Meta Business (WhatsApp) domain verification - must appear on every page. */
export const FB_DOMAIN_VERIFICATION = 'fuh2r4qjmoh1x6e0x04ophie21p16g';

/** Disclosure for the illustrative 15% booking-commission example. */
export const FEE_FOOTNOTE =
  'Illustrative comparison using a 15% platform commission. Actual fees vary by platform, location and plan. StayKeep booking commission is 0%. Figures exclude taxes, payment charges and any StayKeep plan cost.';

export const DEFAULT_OG_DESCRIPTION =
  'Book homestays and hotels directly, with no guest booking fee. Run your property with StayKeep Manage and keep more from every booking. Zero commission, always.';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Find a stay', href: APP_STAYS_URL, external: true },
  { label: 'For property owners', href: '/owners' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  guests: [
    { label: 'Find a stay', href: APP_STAYS_URL, external: true },
    { label: 'Sign in / My trips', href: `${APP_URL}/trips`, external: true },
  ],
  owners: [
    { label: 'For property owners', href: '/owners' },
    { label: 'Owner sign in', href: MANAGE_URL, external: true },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
    { label: 'Refund policy', href: '/refund' },
  ],
} satisfies Record<string, NavLink[]>;
