import { ArrowLeftRight, Filter, Pencil } from "lucide-react";
import { ActionButton, Metric, MetricStrip, PageHeading, TransactionList } from "@/components/shared";
import { accountItems, transactionItems } from "./data";
import {
  screenBodyClassName,
  screenSectionClassName,
  sectionHeadingClassName,
} from "./styles";

export function AccountDetailScreen({ id }: { id: string }) {
  const account =
    accountItems.find((item) => item.id === id) ?? accountItems[0];
  return (
    <div className={screenBodyClassName}>
      <PageHeading
        eyebrow={account.detail}
        parent={{ label: "Accounts", href: "/accounts" }}
        title={account.name}
      >
        <ActionButton secondary>
          <Pencil size={16} />
          Edit
        </ActionButton>
        <ActionButton>
          <ArrowLeftRight size={16} />
          Transfer
        </ActionButton>
      </PageHeading>
      <MetricStrip>
        <Metric
          label={
            account.type === "credit_card" ? "Amount owed" : "Current balance"
          }
          value={account.balance}
          tone={account.type === "credit_card" ? "expense-text" : undefined}
        />
        <Metric
          label="Money in · September"
          value="Rs. 285,000.00"
          tone="income-text"
        />
        <Metric
          label="Money out · September"
          value="Rs. 41,820.50"
          tone="expense-text"
        />
      </MetricStrip>
      {account.type === "credit_card" && (
        <section className="card-summary detail-card-summary">
          <div className={sectionHeadingClassName}>
            <h2 className="t-heading">Card cycle</h2>
            <span className="t-small-mute">Closes Oct 20 · Due Nov 15</span>
          </div>
          <div className="card-summary-grid">
            <div>
              <span className="t-small-mute">Statement balance</span>
              <strong className="t-title">Rs. 18,450.00</strong>
            </div>
            <div>
              <span className="t-small-mute">Amount due</span>
              <strong className="t-title">Rs. 18,450.00</strong>
            </div>
            <div>
              <span className="t-small-mute">Current cycle</span>
              <strong className="t-title">Rs. 4,862.40</strong>
            </div>
          </div>
          <div className="progress-track">
            <i style={{ width: "12%" }} />
          </div>
          <span className="t-caption-mute">
            Rs. 132,000 available of Rs. 150,000
          </span>
        </section>
      )}
      <section className={`${screenSectionClassName} detail-transactions mt-6`}>
        <div className={sectionHeadingClassName}>
          <h2 className="t-heading">Recent transactions</h2>
          <button
            className="icon-link"
            aria-label="Filter transactions"
            type="button"
          >
            <Filter size={17} />
          </button>
        </div>
        <TransactionList items={transactionItems.slice(0, 5)} />
      </section>
    </div>
  );
}
