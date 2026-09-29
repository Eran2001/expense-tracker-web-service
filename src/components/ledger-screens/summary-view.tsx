import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metric, MetricStrip } from "@/components/shared";
import { expenseCategories } from "./data";
import { screenSectionClassName, sectionHeadingClassName } from "./styles";

export function SummaryView() {
  return (
    <div className="screen-stack grid min-w-0 content-start gap-4.5">
      <MetricStrip>
        <Metric label="Income" value="Rs. 413,775" tone="income-text" />
        <Metric label="Expenses" value="Rs. 225,614" tone="expense-text" />
        <Metric label="Net" value="Rs. 188,160" />
      </MetricStrip>
      <section className={screenSectionClassName}>
        <div className={sectionHeadingClassName}>
          <h2 className="t-heading">Spending split</h2>
          <span className="t-small-mute">September</span>
        </div>
        <div className="split-row">
          <span>Cash & bank</span>
          <span className="split-track">
            <i style={{ width: "62%" }} />
          </span>
          <strong>62%</strong>
        </div>
        <div className="split-row">
          <span>Credit card</span>
          <span className="split-track">
            <i className="split-card" style={{ width: "38%" }} />
          </span>
          <strong>38%</strong>
        </div>
      </section>
      <section className={screenSectionClassName}>
        <div className={sectionHeadingClassName}>
          <h2 className="t-heading">Top categories</h2>
          <Link className="text-link t-small" href="/stats">
            View stats <ArrowRight size={14} />
          </Link>
        </div>
        {expenseCategories.slice(0, 4).map((category) => (
          <div className="simple-row" key={category.name}>
            <span>{category.emoji}</span>
            <strong className="t-body">{category.name}</strong>
            <span className="t-small-mute">{category.percent}%</span>
            <strong className="t-small-bold">{category.spent}</strong>
          </div>
        ))}
      </section>
      <section className={screenSectionClassName}>
        <div className={sectionHeadingClassName}>
          <h2 className="t-heading">Transfers</h2>
          <span className="t-body">Rs. 18,450.00</span>
        </div>
        <p className="t-body-mute">3 transfers this month</p>
      </section>
    </div>
  );
}
