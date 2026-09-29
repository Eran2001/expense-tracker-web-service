import { Pencil, Trash2 } from "lucide-react";
import { ActionButton, PageHeading } from "@/components/shared";
import { transactionItems } from "./data";
import { screenBodyClassName } from "./styles";

export function TransactionDetailScreen({ id }: { id: string }) {
  const item =
    transactionItems.find((transaction) => transaction.id === id) ??
    transactionItems[0];
  return (
    <div className={screenBodyClassName}>
      <PageHeading
        eyebrow="Transaction · September 28, 2026"
        parent={{ label: "Transactions", href: "/transactions" }}
        title={item.title}
      >
        <ActionButton secondary>
          <Pencil size={16} />
          Edit
        </ActionButton>
        <ActionButton secondary>
          <Trash2 size={16} />
          Delete
        </ActionButton>
      </PageHeading>
      <section className="transaction-detail">
        <span className="screen-emoji detail-emoji">{item.emoji}</span>
        <strong
          className={`t-display-soft ${item.type === "income" ? "income-text" : item.type === "expense" ? "expense-text" : ""}`}
        >
          {item.type === "income" ? "+ " : item.type === "expense" ? "− " : ""}
          {item.amount}
        </strong>
        <span className="t-body-mute">
          {item.type} · {item.category}
        </span>
      </section>
      <div className="detail-fields">
        <div>
          <span className="t-meta">Account</span>
          <strong className="t-body">{item.account}</strong>
        </div>
        <div>
          <span className="t-meta">Date and time</span>
          <strong className="t-body">Sep {item.day}, 2026 · 10:42 AM</strong>
        </div>
        <div>
          <span className="t-meta">Category</span>
          <strong className="t-body">
            {item.emoji} {item.category}
          </strong>
        </div>
        <div>
          <span className="t-meta">Note</span>
          <strong className="t-body">{item.note || "—"}</strong>
        </div>
      </div>
    </div>
  );
}
