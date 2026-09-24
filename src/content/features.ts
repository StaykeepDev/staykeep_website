/**
 * Only real, shipped features. Nothing here may claim a channel manager, OTA
 * sync, reviews/ratings, ads, or anything not already live — check with the
 * PRD before adding a line.
 */
import type { IconName } from './icon-names';

export interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export const GUEST_FEATURES: FeatureItem[] = [
  {
    icon: 'search',
    title: 'Search and book directly',
    description: 'Find stays near you or by place, and book directly — no booking fee, ever.',
  },
  {
    icon: 'map-pin',
    title: 'Everything for your trip',
    description: 'Rooms, directions, the host’s number and the address, all in "My stay".',
  },
  {
    icon: 'chat',
    title: 'One conversation with your host',
    description: 'Chat, send voice messages, and request things like extra towels, food or a cab.',
  },
  {
    icon: 'receipt',
    title: 'Your bill, in the app',
    description: 'See your bill and invoice any time — no chasing the front desk for a copy.',
  },
  {
    icon: 'globe',
    title: 'On the web, in your language',
    description: 'Book from app.staykeep.com in English, Malayalam or Arabic.',
  },
];

export const OWNER_FEATURES: FeatureItem[] = [
  {
    icon: 'calendar',
    title: 'Bookings and live availability',
    description: 'A calendar and a rooms board that always show what is actually free.',
  },
  {
    icon: 'shield-check',
    title: 'Check-in with ID verification',
    description: 'Verify guest ID at the desk and keep a digital guest register automatically.',
  },
  {
    icon: 'sparkle',
    title: 'Housekeeping after check-out',
    description: 'Checking a guest out creates a cleaning task for that room automatically.',
  },
  {
    icon: 'users',
    title: 'Staff roles and task routing',
    description: 'Reception, housekeeping and the rest of your team, each with their own tasks.',
  },
  {
    icon: 'list',
    title: 'Your own service catalogue',
    description: 'Set up what guests can order — towels, food, a cab — and route requests to the right person.',
  },
  {
    icon: 'chat',
    title: 'Chat and voice messages',
    description: 'Talk to guests before, during and after their stay, from the same app.',
  },
  {
    icon: 'wallet',
    title: 'Bills, invoices and accounts',
    description: 'Add-ons, invoices, payments and refunds recorded — with accounts and P&L for your property.',
  },
  {
    icon: 'building',
    title: 'Multiple properties',
    description: 'Run more than one property from the same Manage app, on Android or on the web.',
  },
  {
    icon: 'palette',
    title: 'Your own website',
    description: 'Create your own booking website with photos, room details, nearby places and a blog. Free to set up at yourname.staykeep.com.',
  },
  {
    icon: 'globe',
    title: 'English, Malayalam and Arabic',
    description: 'Run your property and talk to guests in the language that works for you.',
  },
];
