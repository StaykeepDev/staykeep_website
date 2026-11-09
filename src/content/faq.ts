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

/** /host (the ad landing page, a PMS page): short, owner-first answers. */
export const FAQ_HOMESTAY_SOFTWARE: FaqItem[] = [
  {
    question: 'What is StayKeep?',
    answer:
      'StayKeep is a property management system (PMS) for homestays, hotels and hostels: reservations, front desk, room calendar, guest register with ID check-in, housekeeping, billing with GST, reports and your own booking engine. It runs as an Android app and in the browser, on a phone or a computer.',
  },
  { question: PRICING_FAQ_QUESTION, answer: PRICING_FAQ_ANSWER },
  {
    question: 'What counts as a listing?',
    answer:
      'Each room, cottage or whole villa you rent out is one listing. The price is per property: a property with 3 listings pays the 3-listing price.',
  },
  {
    question: 'Is the booking website extra?',
    answer:
      'No. Your own booking website at yourname.staykeep.com is free with every plan, with your photos, listings and prices. Guests book and pay you directly.',
  },
  {
    question: 'Is there a commission on my bookings?',
    answer:
      'No. StayKeep takes 0% commission on your bookings, whatever their size. You pay only the monthly or yearly plan.',
  },
  {
    question: 'How do I pay, and can I stop?',
    answer:
      'Pay monthly or yearly by UPI or card, from Billing in StayKeep Manage. You can cancel at any time, and your plan runs to the end of the period you paid for.',
  },
  {
    question: 'What does setup include?',
    answer:
      'Send us your Google Maps link on WhatsApp. Our team adds your property and rooms, and sets up your own booking website. Then we walk you through it on a call, and you start.',
  },
  {
    question: 'I am on Booking.com, Airbnb or other OTAs. Does it work with them?',
    answer:
      'Yes. Add the channel manager (₹1,000 a month for up to 15 listings, ₹2,500 a month for more) and your availability and prices stay in sync with booking sites like Booking.com, Agoda, Airbnb and MakeMyTrip, and their bookings come straight into StayKeep. Without it, forward the booking emails that OTAs send you: those bookings show up in the same list, and you close a room on the OTA yourself when it is booked elsewhere.',
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
