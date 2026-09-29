import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeading } from "@/components/shared";
import { expenseCategories, trendData } from "./data";
import { chartTitleClassName, screenBodyClassName } from "./styles";

export function OverviewScreen() {
  return (
    <div className={screenBodyClassName}>
      <PageHeading eyebrow="Personal finance" title="Overview">
        <span className="overview-period t-small px-2.75 py-2">
          September 2026
        </span>
      </PageHeading>
      <div className="overview-kpis mb-4 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2.25">
        <section className="overview-kpi grid min-w-0 gap-1.75 p-3.5 max-md:gap-1.25 max-md:p-3">
          <span className="t-small-mute">Total balance</span>
          <strong className="overview-kpi-value">Rs. 335,348.28</strong>
          <span className="overview-kpi-note">Across 4 active accounts</span>
        </section>
        <section className="overview-kpi grid min-w-0 gap-1.75 p-3.5 max-md:gap-1.25 max-md:p-3">
          <span className="t-small-mute">Income</span>
          <strong className="overview-kpi-value income-text">
            Rs. 413,775
          </strong>
          <span className="overview-kpi-note">This month</span>
        </section>
        <section className="overview-kpi grid min-w-0 gap-1.75 p-3.5 max-md:gap-1.25 max-md:p-3">
          <span className="t-small-mute">Expenses</span>
          <strong className="overview-kpi-value expense-text">
            Rs. 225,614
          </strong>
          <span className="overview-kpi-note">This month</span>
        </section>
        <section className="overview-kpi grid min-w-0 gap-1.75 p-3.5 max-md:gap-1.25 max-md:p-3">
          <span className="t-small-mute">Net cash flow</span>
          <strong className="overview-kpi-value">Rs. 188,160</strong>
          <span className="overview-kpi-note">Income after expenses</span>
        </section>
      </div>
      <section
        aria-label="Monthly income and expenses"
        className="chart-panel chart-panel-wide overview-main-chart relative w-full min-w-0 mt-1.25 mb-4.5 h-85 max-md:h-75"
      >
        <div className={`chart-title ${chartTitleClassName}`}>
          <h2 className="t-heading m-0">Income vs expenses</h2>
          <div
            aria-label="Chart legend"
            className="overview-chart-legend flex items-center gap-3.5 max-md:gap-2.5"
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <i className="income-dot size-2 rounded-full" />
              Income
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <i className="expense-dot size-2 rounded-full" />
              Expenses
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 42, right: 14, left: 8, bottom: 4 }}
          >
            <CartesianGrid stroke="var(--divider)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tick={{ fill: "var(--text-3)", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "var(--text-3)", fontSize: 11 }}
              tickFormatter={(value: number) => `${value}k`}
              tickLine={false}
              width={42}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "var(--divider)",
                background: "var(--raised)",
                color: "var(--foreground)",
              }}
              formatter={(value) => [`Rs. ${Number(value).toFixed(0)}k`]}
            />
            <Line
              dataKey="income"
              dot={false}
              name="Income"
              stroke="var(--income)"
              strokeWidth={2.5}
              type="monotone"
            />
            <Line
              dataKey="expense"
              dot={false}
              name="Expenses"
              stroke="var(--expense)"
              strokeWidth={2.5}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
      <div className="overview-analytics-grid grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] gap-4 max-md:grid-cols-1 max-md:gap-3">
        <section
          aria-label="Monthly net cash flow"
          className="chart-panel overview-secondary-chart relative w-full min-w-0 h-75 max-md:h-67.5"
        >
          <div className={`chart-title ${chartTitleClassName}`}>
            <h2 className="t-heading">Net cash flow</h2>
            <span className="t-small-mute">Last 12 months · Rs. thousands</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 44, right: 12, left: 4, bottom: 2 }}
            >
              <CartesianGrid stroke="var(--divider)" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="month"
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                tickFormatter={(value: number) => `${value}k`}
                tickLine={false}
                width={38}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "var(--divider)",
                  background: "var(--raised)",
                  color: "var(--foreground)",
                }}
                formatter={(value) => [`Rs. ${Number(value).toFixed(0)}k`]}
              />
              <Line
                dataKey="net"
                dot={{ r: 2.5 }}
                name="Net cash flow"
                stroke="var(--accent)"
                strokeWidth={2.5}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section className="overview-category-panel grid content-start gap-4 rounded-[7px] p-4 max-md:gap-3.5">
          <div className="overview-section-heading flex min-w-0 items-center justify-between gap-2.5">
            <h2 className="t-heading m-0">Expenses by category</h2>
            <span className="t-small-mute">This month</span>
          </div>
          {expenseCategories.slice(0, 4).map((category) => (
            <div
              className="overview-category-row grid min-w-0 gap-2"
              key={category.name}
            >
              <div className="overview-category-label flex min-w-0 items-center justify-between gap-2.5">
                <strong className="t-body">{category.name}</strong>
                <span className="t-small-mute">{category.spent}</span>
              </div>
              <div className="progress-track h-1.25">
                <i
                  style={{
                    width: `${category.percent}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
