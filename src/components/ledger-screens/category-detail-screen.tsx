import { Pencil } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ActionButton, Metric, MetricStrip, PageHeading, TransactionList } from "@/components/shared";
import { expenseCategories, transactionItems, trendData } from "./data";
import { chartTitleClassName, screenBodyClassName, screenSectionClassName } from "./styles";

export function CategoryDetailScreen({ id }: { id: string }) {
  const category =
    expenseCategories.find(
      (item) => item.name.toLowerCase().replaceAll(" ", "-") === id,
    ) ?? expenseCategories[0];
  return (
    <div className={screenBodyClassName}>
      <PageHeading
        eyebrow="Expense category"
        parent={{ label: "Stats", href: "/stats" }}
        title={`${category.emoji} ${category.name}`}
      >
        <ActionButton secondary>
          <Pencil size={16} />
          Edit category
        </ActionButton>
      </PageHeading>
      <MetricStrip>
        <Metric
          label="September total"
          value={category.spent}
          tone="expense-text"
        />
        <Metric label="Monthly average" value="Rs. 18,420" />
        <Metric label="Share of expenses" value={`${category.percent}%`} />
      </MetricStrip>
      <section className="chart-panel chart-panel-wide relative w-full min-w-0 mt-1.25 mb-4.5 h-72.5 max-md:h-65">
        <div className={`chart-title ${chartTitleClassName}`}>
          <h2 className="t-heading m-0">Last 6 months</h2>
          <span className="t-small-mute">Monthly spending</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData.slice(-6)}
            margin={{ top: 16, right: 8, left: -18, bottom: 2 }}
          >
            <CartesianGrid stroke="var(--divider)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-3)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-3)", fontSize: 11 }}
            />
            <Tooltip />
            <Line
              dataKey="expense"
              stroke={category.color}
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
      <section className={screenSectionClassName}>
        <h2 className="t-heading">Recent transactions</h2>
        <TransactionList
          items={transactionItems.filter(
            (item) => item.category === category.name,
          )}
        />
      </section>
    </div>
  );
}
