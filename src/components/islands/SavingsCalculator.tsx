import { useId, useMemo, useState } from 'react';

/**
 * The savings calculator — the one place on the site that needs real
 * interactivity, so it is the one React island (hydrated with
 * `client:visible` from `CalculatorSection.astro`).
 *
 * Astro pre-renders this to static HTML at build time using the default
 * props below, so the ₹5,000 x 20-bookings figures are already correct in
 * the page's initial HTML before any JavaScript runs — only the ability to
 * change the numbers depends on hydration.
 */

const AMOUNT_MIN = 1000;
const AMOUNT_MAX = 50000;
const AMOUNT_STEP = 500;
const FEE_RATE = 0.3; // "up to 30%" — the ceiling the copy quotes throughout.

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function formatInr(value: number): string {
  return inrFormatter.format(Math.round(value));
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export interface SavingsCalculatorProps {
  defaultAmount?: number;
  defaultBookingsPerMonth?: number;
}

export default function SavingsCalculator({
  defaultAmount = 5000,
  defaultBookingsPerMonth = 20,
}: SavingsCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [bookingsPerMonth, setBookingsPerMonth] = useState(defaultBookingsPerMonth);

  const amountRangeId = useId();
  const amountNumberId = useId();
  const bookingsId = useId();

  const { feePerBooking, monthlySavings, yearlySavings } = useMemo(() => {
    const fee = amount * FEE_RATE;
    const monthly = fee * bookingsPerMonth;
    return {
      feePerBooking: fee,
      monthlySavings: monthly,
      yearlySavings: monthly * 12,
    };
  }, [amount, bookingsPerMonth]);

  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <div className="field">
          <label className="field-label" htmlFor={amountRangeId}>
            Booking amount
          </label>
          <input
            id={amountRangeId}
            type="range"
            className="range-input"
            min={AMOUNT_MIN}
            max={AMOUNT_MAX}
            step={AMOUNT_STEP}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            aria-describedby={amountNumberId}
          />
          <div className="calc-amount-row">
            <span aria-hidden="true" className="text-muted">
              {formatInr(AMOUNT_MIN)}
            </span>
            <label className="visually-hidden" htmlFor={amountNumberId}>
              Booking amount in rupees
            </label>
            <input
              id={amountNumberId}
              type="number"
              className="number-input calc-amount-number"
              min={AMOUNT_MIN}
              max={AMOUNT_MAX}
              step={100}
              value={amount}
              onChange={(event) =>
                setAmount(clamp(Number(event.target.value), AMOUNT_MIN, AMOUNT_MAX))
              }
            />
            <span aria-hidden="true" className="text-muted">
              {formatInr(AMOUNT_MAX)}
            </span>
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor={bookingsId}>
            Bookings per month
          </label>
          <input
            id={bookingsId}
            type="number"
            className="number-input"
            min={1}
            max={300}
            step={1}
            value={bookingsPerMonth}
            onChange={(event) => setBookingsPerMonth(clamp(Number(event.target.value), 1, 300))}
          />
        </div>
      </div>

      <div className="calc-results" aria-live="polite">
        <div className="calc-result-row">
          <span className="body-text">Fee at up to 30%, per booking</span>
          <span className="calc-result-value sk-tabular">{formatInr(feePerBooking)}</span>
        </div>
        <div className="calc-result-row">
          <span className="body-text">Your savings, per month</span>
          <span className="calc-result-value sk-tabular">{formatInr(monthlySavings)}</span>
        </div>
        <div className="calc-result-row calc-result-highlight">
          <span className="body-text">Your savings, per year</span>
          <span className="calc-result-value calc-result-value-lg sk-tabular">
            {formatInr(yearlySavings)}
          </span>
        </div>
      </div>
    </div>
  );
}
