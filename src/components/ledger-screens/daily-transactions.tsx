import { TransactionList } from "@/components/shared";
import { transactionItems } from "./data";

export function DailyTransactions() {
  const days = [...new Set(transactionItems.map((item) => item.day))];
  return (
    <div className="screen-day-list grid gap-5">
      {days.map((day) => {
        const rows = transactionItems.filter((item) => item.day === day);
        return (
          <section className="screen-day" key={day}>
            <div className="screen-day-heading flex min-h-8.5 items-center justify-between gap-3 pb-2 max-phone-lg:gap-1.75">
              <strong className="t-heading">{day}</strong>
              <span className="t-small-mute">Sep 2026 · {rows[0].weekday}</span>
              <span className="screen-day-summary t-meta-bold">
                {rows.length}{" "}
                {rows.length === 1 ? "transaction" : "transactions"}
              </span>
            </div>
            <TransactionList items={rows} />
          </section>
        );
      })}
    </div>
  );
}
