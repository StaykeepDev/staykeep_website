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
  answer: 'English, Malayalam and Arabic - for guests booking on the web, and for owners running their property on Manage.',
};

const WHATS_NEXT_FAQ: FaqItem = {
  question: 'What else is coming?',
  answer:
    "We're working on host-side add-ons and discounts during a stay, adding or changing rooms mid-stay, and per-room checkout. Coming soon.",
};

const GUESTS_NEED_APP_FAQ: FaqItem = {
  question: 'Do guests need to install an app to book?',
  answer:
    'No. Guests can search and book entirely on the web at app.staykeep.com - no app, no account needed to browse.',
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
    'No. Every StayKeep owner can set one up free at yourname.staykeep.com - drag-and-drop sections, your own photos and colours, and a booking widget that sends bookings straight to you at 0% commission. You can also just use your Manage-app tools without one.',
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

/** /homestay-software (the ad landing page): short, owner-first answers. */
export const FAQ_HOMESTAY_SOFTWARE: FaqItem[] = [
  {
    question: 'What does setup include?',
    answer:
      'Send us your Google Maps link on WhatsApp. Our team adds your property and rooms, and sets up your own booking website. Then we walk you through it on a call, and you start.',
  },
  {
    question: 'I am on Booking.com, Airbnb or other OTAs. Does it work with them?',
    answer:
      'Keep your OTA listings. Forward the booking emails that OTAs send you, and those bookings show up in the same StayKeep list as your phone, walk-in and website bookings. StayKeep does not sync availability with OTAs today, so close a room on the OTA yourself when it is booked elsewhere.',
  },
  {
    question: 'Do I need to fill Form C for foreign guests?',
    answer:
      'Yes, Form C is your duty for every foreign guest. StayKeep marks foreign guests at check-in and keeps a Form C list that shows which ones are still due, next to your digital guest register.',
  },
  {
    question: 'Does it work on Android?',
    answer:
      'Yes. StayKeep Manage is on Google Play for Android. It also runs in the browser at manage.staykeep.com, on a computer or any phone.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Your data is stored on secure servers in India and encrypted in transit and at rest. You can ask for an export or deletion of your data at any time.',
  },
];
