export type CompareCell =
  | { kind: 'text'; value: string }
  | { kind: 'bool'; value: boolean; label?: string };

export interface CompareRow {
  label: string;
  typical: CompareCell;
  staykeep: CompareCell;
}

/** Worded generically and with "typically" — no competitor is named. */
export const COMPARISON_ROWS: CompareRow[] = [
  {
    label: 'Commission on bookings',
    typical: { kind: 'text', value: 'Typically 15–25%' },
    staykeep: { kind: 'text', value: '0%' },
  },
  {
    label: 'Guest booking fee',
    typical: { kind: 'text', value: 'Often added on top' },
    staykeep: { kind: 'text', value: 'None' },
  },
  {
    label: 'You own the guest relationship',
    typical: { kind: 'bool', value: false },
    staykeep: { kind: 'bool', value: true },
  },
  {
    label: 'Your own website',
    typical: { kind: 'bool', value: false },
    staykeep: { kind: 'bool', value: true, label: 'Free to set up' },
  },
  {
    label: 'Direct payment to you',
    typical: { kind: 'bool', value: false },
    staykeep: { kind: 'bool', value: true },
  },
];
