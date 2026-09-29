import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Plus } from "lucide-react";
import { ActionButton, Metric, MetricStrip, PageHeading } from "@/components/shared";
import { accountItems } from "./data";
import {
  accountScreenRowLayoutClassName,
  screenBodyClassName,
  screenSectionClassName,
  sectionHeadingClassName,
} from "./styles";

export function AccountsScreen({
  parent,
}: {
  parent?: { label: string; href: string };
}) {
  const assets = accountItems.filter(
    (account) => account.type !== "credit_card",
  );
  const liabilities = accountItems.filter(
    (account) => account.type === "credit_card",
  );
  return (
    <div className={screenBodyClassName}>
      <PageHeading parent={parent} title="Accounts" />
      <MetricStrip>
        <Metric label="Assets" value="Rs. 353,348.28" />
        <Metric label="Liabilities" value="Rs. 18,000.00" tone="expense-text" />
        <Metric label="Net worth" value="Rs. 335,348.28" />
      </MetricStrip>
      <div className="accounts-columns grid grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] gap-10 pt-5 max-md:grid-cols-[minmax(0,1fr)] max-md:gap-5 max-md:pt-3.5">
        <section className={screenSectionClassName}>
          <div className={sectionHeadingClassName}>
            <div>
              <h2 className="t-heading">Cash and bank</h2>
              <span className="t-small-mute">4 accounts · Rs. 353,348.28</span>
            </div>
            <ActionButton>
              <Plus size={16} />
              Add account
            </ActionButton>
          </div>
          {assets.map(({ id, name, detail, balance, icon: Icon }) => (
            <Link
              className={`account-screen-row ${accountScreenRowLayoutClassName}`}
              href={`/accounts/${id}`}
              key={id}
            >
              <span className="account-screen-icon">
                <Icon size={19} />
              </span>
              <span className="screen-row-main">
                <strong className="t-body">{name}</strong>
                <span className="t-meta">{detail}</span>
              </span>
              <strong className="t-body">{balance}</strong>
              <ArrowRight className="screen-row-arrow" size={17} />
            </Link>
          ))}
        </section>
        <section className={screenSectionClassName}>
          <div className={sectionHeadingClassName}>
            <div>
              <h2 className="t-heading">Credit cards</h2>
              <span className="t-small-mute">Current amount owed</span>
            </div>
          </div>
          {liabilities.map(({ id, name, detail, balance, icon: Icon }) => (
            <Link
              className={`account-screen-row ${accountScreenRowLayoutClassName}`}
              href={`/accounts/${id}`}
              key={id}
            >
              <span className="account-screen-icon is-credit">
                <Icon size={19} />
              </span>
              <span className="screen-row-main">
                <strong className="t-body">{name}</strong>
                <span className="t-meta">{detail}</span>
              </span>
              <strong className="t-body expense-text">{balance}</strong>
              <ArrowRight className="screen-row-arrow" size={17} />
            </Link>
          ))}
          <div className="card-summary">
            <div className="card-summary-top">
              <span className="section-label t-caption-bold">
                Available credit
              </span>
              <strong className="t-kpi">Rs. 132,000.00</strong>
            </div>
            <div className="progress-track">
              <i style={{ width: "12%" }} />
            </div>
            <div className="progress-labels t-caption-mute">
              <span>12% utilization</span>
              <span>Limit Rs. 150,000</span>
            </div>
            <div className="card-due">
              <span className="t-small-mute">Statement due Oct 15</span>
              <ActionButton>
                <ArrowLeftRight size={16} />
                Pay card
              </ActionButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
