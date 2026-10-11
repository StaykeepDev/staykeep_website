import {
  SITE_URL,
  APP_URL,
  MANAGE_URL,
  PLAY_GUEST_URL,
  PLAY_MANAGE_URL,
  LEGAL_NAME,
  CIN,
  REGISTERED_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  FEE_FOOTNOTE,
} from '../content/site';
import { GUEST_FEATURES, OWNER_FEATURES } from '../content/features';
import { FAQ_OWNERS, FAQ_HOME } from '../content/faq';

const SUMMARY =
  'StayKeep connects guests and property owners directly: guests book homestays and hotels with no StayKeep booking fee, and owners run bookings, check-in, housekeeping, staff, guest chat and billing from one app at 0% booking commission.';

const LINKS = {
  site: [
    ['Home', `${SITE_URL}/`, 'What StayKeep is, for guests and owners'],
    ['For property owners', `${SITE_URL}/owners`, 'StayKeep Manage, direct bookings and your own website'],
    ['About', `${SITE_URL}/about`, 'Why StayKeep exists'],
    ['Contact', `${SITE_URL}/contact`, 'Email, phone and registered office'],
  ],
  apps: [
    ['Guest app (web)', APP_URL, 'Search and book stays, manage trips'],
    ['Owner app (web)', MANAGE_URL, 'StayKeep Manage for property owners'],
    ['StayKeep on Google Play', PLAY_GUEST_URL, 'Android app for guests'],
    ['StayKeep Manage on Google Play', PLAY_MANAGE_URL, 'Android app for property owners'],
  ],
  legal: [
    ['Privacy policy', `${SITE_URL}/privacy`, 'How data is collected, used and protected'],
    ['Terms of service', `${SITE_URL}/terms`, 'Terms of using StayKeep'],
    ['Refund policy', `${SITE_URL}/refund`, 'Refunds and cancellations'],
  ],
} as const;

const section = (title: string, rows: readonly (readonly string[])[]) =>
  `## ${title}\n\n${rows.map(([n, u, d]) => `- [${n}](${u}): ${d}`).join('\n')}\n`;

export function buildLlmsTxt(): string {
  return `# StayKeep

> ${SUMMARY}

Plans for property owners: there is no commission on bookings; contact us at ${CONTACT_EMAIL} to talk about plans.

${section('Site', LINKS.site)}
${section('Apps', LINKS.apps)}
${section('Legal', LINKS.legal)}
## Optional

- [Full description](${SITE_URL}/llms-full.txt): The same facts in full prose, with the FAQ
`;
}

const bullets = (items: { title: string; description: string }[]) =>
  items.map((f) => `- ${f.title}: ${f.description}`).join('\n');

const faqBlock = (items: { question: string; answer: string }[]) =>
  items.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n');

export function buildLlmsFullTxt(): string {
  const seen = new Set<string>();
  const faq = [...FAQ_HOME, ...FAQ_OWNERS].filter((f) => {
    if (seen.has(f.question)) return false;
    seen.add(f.question);
    return true;
  });
  return `# StayKeep

> ${SUMMARY}

## What StayKeep is

StayKeep is an Indian stay-booking and property-management platform. Guests find and book homestays and hotels directly with the people who run them. Property owners use StayKeep Manage to run their property. StayKeep charges 0% commission on bookings, and guests pay no StayKeep booking fee. Property charges and taxes still apply, and any StayKeep plan cost is separate from booking commission.

## For guests

Guests can search and book entirely on the web at ${APP_URL}, with no app and no account needed to browse. There is also an Android app: ${PLAY_GUEST_URL}

${bullets(GUEST_FEATURES)}

## For property owners

Owners use StayKeep Manage, on the web at ${MANAGE_URL} and on Android at ${PLAY_MANAGE_URL}. More at ${SITE_URL}/owners

${bullets(OWNER_FEATURES)}

## Pricing

${FEE_FOOTNOTE}

Plans for property owners: contact us at ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}. StayKeep has not published prices; there is never a commission on bookings.

## Languages

English, Malayalam and Arabic, for guests booking on the web and for owners running their property on Manage.

## Company and contact

- Legal name: ${LEGAL_NAME} (CIN ${CIN})
- Registered office: ${REGISTERED_ADDRESS}
- Email: ${CONTACT_EMAIL}
- Phone: ${CONTACT_PHONE_DISPLAY}
- Website: ${SITE_URL}/

## Links

${LINKS.site.concat(LINKS.apps as never, LINKS.legal as never).map(([n, u]) => `- [${n}](${u})`).join('\n')}

## Frequently asked questions

${faqBlock(faq)}
`;
}
