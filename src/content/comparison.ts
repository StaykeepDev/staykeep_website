export type CompareCell =
  | { kind: "text"; value: string }
  | { kind: "bool"; value: boolean; label?: string };
export interface CompareRow {
  label: string;
  typical: CompareCell;
  staykeep: CompareCell;
}
export const COMPARISON_ROWS: CompareRow[] = [
  {
    label: "Commission on bookings",
    typical: { kind: "text", value: "Varies by platform" },
    staykeep: { kind: "text", value: "0% — always" },
  },
  {
    label: "Guest booking fee",
    typical: { kind: "text", value: "May apply" },
    staykeep: { kind: "text", value: "No booking fee" },
  },
  {
    label: "Guest communication",
    typical: { kind: "text", value: "Platform rules apply" },
    staykeep: { kind: "text", value: "Direct with your guest" },
  },
  {
    label: "Your own booking website",
    typical: { kind: "text", value: "Varies by provider" },
    staykeep: { kind: "text", value: "Free to set up" },
  },
  {
    label: "Property management",
    typical: { kind: "text", value: "Varies by provider" },
    staykeep: { kind: "text", value: "Bookings, staff & billing" },
  },
];
