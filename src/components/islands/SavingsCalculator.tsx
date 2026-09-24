import { useId, useState } from "react";
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const clamp = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
export interface SavingsCalculatorProps {
  defaultAmount?: number;
  defaultBookingsPerMonth?: number;
}
export default function SavingsCalculator({
  defaultAmount = 5000,
  defaultBookingsPerMonth = 20,
}: SavingsCalculatorProps) {
  const id = useId();
  const [amountText, setAmountText] = useState(String(defaultAmount));
  const [bookingsText, setBookingsText] = useState(
    String(defaultBookingsPerMonth),
  );
  const [rateText, setRateText] = useState("15");
  const amount = clamp(Number(amountText), 0, 50000);
  const bookings = Math.round(clamp(Number(bookingsText), 0, 300));
  const rate = clamp(Number(rateText), 0, 40);
  const monthly = (amount * bookings * rate) / 100;
  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <div className="field">
          <label className="field-label" htmlFor={`${id}-amount`}>
            Average booking value (₹)
          </label>
          <input
            id={`${id}-amount`}
            type="number"
            className="number-input"
            min="1000"
            max="50000"
            step="100"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            onBlur={() => setAmountText(String(clamp(amount, 1000, 50000)))}
          />
          <label className="visually-hidden" htmlFor={`${id}-range`}>
            Adjust booking value
          </label>
          <input
            id={`${id}-range`}
            type="range"
            className="range-input"
            min="1000"
            max="50000"
            step="100"
            value={clamp(amount, 1000, 50000)}
            onChange={(e) => setAmountText(e.target.value)}
          />
        </div>
        <div className="calc-fields">
          <div className="field">
            <label className="field-label" htmlFor={`${id}-bookings`}>
              Bookings per month
            </label>
            <input
              id={`${id}-bookings`}
              type="number"
              className="number-input"
              min="1"
              max="300"
              step="1"
              value={bookingsText}
              onChange={(e) => setBookingsText(e.target.value)}
              onBlur={() => setBookingsText(String(clamp(bookings, 1, 300)))}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor={`${id}-rate`}>
              Platform commission (%)
            </label>
            <input
              id={`${id}-rate`}
              type="number"
              className="number-input"
              min="0"
              max="40"
              step="0.5"
              value={rateText}
              onChange={(e) => setRateText(e.target.value)}
              onBlur={() => setRateText(String(rate))}
            />
          </div>
        </div>
      </div>
      <div className="calc-results" aria-live="polite" aria-atomic="true">
        <div className="calc-result-row">
          <span className="body-text">Other platform / month</span>
          <span className="calc-result-value sk-tabular">
            {money.format(monthly)}
          </span>
        </div>
        <div className="calc-result-row">
          <span className="body-text">StayKeep commission</span>
          <span className="calc-result-value sk-tabular">₹0</span>
        </div>
        <div className="calc-result-row calc-result-highlight">
          <span className="body-text">Commission you could keep / year</span>
          <strong className="calc-result-value-lg sk-tabular">
            {money.format(monthly * 12)}
          </strong>
        </div>
      </div>
    </div>
  );
}
