import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface TransactionListItem {
  id: string;
  day: string;
  weekday: string;
  emoji: string;
  title: string;
  category: string;
  account: string;
  amount: string;
  type: "expense" | "income" | "transfer";
  note: string;
}

export function TransactionList({ items }: { items: TransactionListItem[] }) {
  return (
    <div className="screen-list grid">
      {items.map((item) => (
        <Link
          className="screen-transaction-row grid min-h-16.5 grid-cols-[38px_minmax(0,1fr)_auto_16px] items-center gap-2.75 px-1 py-2 max-md:min-h-16 max-md:grid-cols-[36px_minmax(0,1fr)_auto] max-md:gap-2.25 max-phone-lg:grid-cols-[33px_minmax(0,1fr)_auto] max-phone-lg:gap-1.75 max-phone-lg:px-0"
          href={`/transactions/${item.id}`}
          key={item.id}
        >
          <span className="screen-emoji">{item.emoji}</span>
          <span className="screen-row-main">
            <strong className="t-body">{item.title}</strong>
            <span className="t-meta">
              {item.category} · {item.account} · {item.day} Sep
            </span>
            {item.note && <span className="t-caption-mute">{item.note}</span>}
          </span>
          <strong
            className={`screen-row-amount t-small-bold ${item.type === "income" ? "income-text" : item.type === "expense" ? "expense-text" : ""}`}
          >
            {item.type === "income"
              ? "+ "
              : item.type === "expense"
                ? "− "
                : ""}
            {item.amount}
          </strong>
          <ArrowRight
            aria-hidden="true"
            className="screen-row-arrow max-md:hidden"
            size={16}
          />
        </Link>
      ))}
    </div>
  );
}
