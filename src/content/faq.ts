import { PRICING_FAQ_QUESTION, PRICING_FAQ_ANSWER } from './pricing';

export interface FaqItem {
  question: string;
  answer: string;
}

const IS_ZERO_COMMISSION_REAL: FaqItem = {
  question: 'Is StayKeep really 0% commission?',
  answer:
    'Yes. StayKeep charges 0% commission on bookings, and guests pay no StayKeep booking fee. Property charges and taxes still apply. Any StayKeep plan cost is separate from booking commission.',
};

const PRICING_FAQ: FaqItem = {
  question: PRICING_FAQ_QUESTION,
  answer: PRICING_FAQ_ANSWER,
};

const LANGUAGES_FAQ: FaqItem = {
  question: 'What languages does StayKeep support?',
  answer: 'English, Malayalam and Arabic — for guests booking on the web, and for owners running their property on Manage.',
};

const WHATS_NEXT_FAQ: FaqItem = {
  question: 'What else is coming?',
  answer:
    "We're working on host-side add-ons and discounts during a stay, adding or changing rooms mid-stay, and per-room checkout. Coming soon.",
};

const GUESTS_NEED_APP_FAQ: FaqItem = {
  question: 'Do guests need to install an app to book?',
  answer:
    'No. Guests can search and book entirely on the web at app.staykeep.com — no app, no account needed to browse.',
};

const DURING_STAY_FAQ: FaqItem = {
  question: 'What can guests do once they’ve booked?',
  answer:
    'Everything for the trip lives in "My stay": room details, directions, the host’s number and address, one conversation with the host for chat, voice messages and requests like extra towels or a cab, and the bill and invoice whenever they need it.',
};

const MULTIPLE_PROPERTIES_FAQ: FaqItem = {
  question: 'Can I list more than one property?',
  answer: 'Yes. The Manage app supports multiple properties from the same account, on Android and on the web.',
};

const OWN_WEBSITE_FAQ: FaqItem = {
  question: 'Do I need my own website already?',
  answer:
    'No. Every StayKeep owner can set one up free at yourname.staykeep.com — drag-and-drop sections, your own photos and colours, and a booking widget that sends bookings straight to you at 0% commission. You can also just use your Manage-app tools without one.',
};

const CHECK_IN_OUT_FAQ: FaqItem = {
  question: 'What happens at check-in and check-out?',
  answer:
    'At check-in, your team verifies guest ID and StayKeep keeps a digital guest register automatically. At check-out, StayKeep creates a cleaning task for that room so housekeeping knows what’s next.',
};

const STAFF_FAQ: FaqItem = {
  question: 'Can my team use StayKeep too?',
  answer:
    'Yes. Add staff roles for reception, housekeeping and the rest of your team, and route tasks and service requests to the right person.',
};

export const FAQ_HOME: FaqItem[] = [
  IS_ZERO_COMMISSION_REAL,
  PRICING_FAQ,
  GUESTS_NEED_APP_FAQ,
  DURING_STAY_FAQ,
  LANGUAGES_FAQ,
  WHATS_NEXT_FAQ,
];

export const FAQ_OWNERS: FaqItem[] = [
  IS_ZERO_COMMISSION_REAL,
  PRICING_FAQ,
  MULTIPLE_PROPERTIES_FAQ,
  OWN_WEBSITE_FAQ,
  CHECK_IN_OUT_FAQ,
  STAFF_FAQ,
  LANGUAGES_FAQ,
  WHATS_NEXT_FAQ,
];
