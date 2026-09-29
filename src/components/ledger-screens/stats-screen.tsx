"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeading } from "@/components/shared";
import { expenseCategories, trendData } from "./data";
import { chartTitleClassName, screenBodyClassName } from "./styles";

export function StatsScreen() {
  const [view, setView] = useState("Categories");
  const [kind, setKind] = useState("Expense");
  const data =
    kind === "Expense"
      ? expenseCategories
      : [
          {
            name: "Salary",
            emoji: "💼",
            spent: "Rs. 385,000",
            budget: "",
            percent: 93,
            color: "#4c8dff",
          },
          {
            name: "Other",
            emoji: "🎁",
            spent: "Rs. 28,775",
            budget: "",
            percent: 7,
            color: "#3fb97f",
          },
        ];
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Stats" />
      <div className="screen-toolbar">
        <div className="segmented-control">
          {["Categories", "Trends"].map((item) => (
            <button
              aria-pressed={view === item}
              className={view === item ? "is-selected" : ""}
              key={item}
              onClick={() => setView(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <select
          aria-label="Stats period"
          className="screen-select"
          defaultValue="monthly"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Custom range</option>
        </select>
      </div>
      {view === "Categories" ? (
        <>
          <div className="screen-toolbar">
            <div className="segmented-control segmented-type">
              {["Expense", "Income"].map((item) => (
                <button
                  aria-pressed={kind === item}
                  className={kind === item ? "is-selected" : ""}
                  key={item}
                  onClick={() => setKind(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="t-small-mute">September 2026</span>
          </div>
          <div className="stats-category-layout grid grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)] items-center gap-7.5 max-md:grid-cols-[minmax(0,1fr)] max-md:gap-1.5">
            <section className="chart-panel relative w-full min-w-0 h-70 max-md:h-62.5">
              <div className="chart-center-label absolute inset-0 z-1 grid content-center justify-items-center gap-1.25 pointer-events-none">
                <span className="t-small-mute">
                  {kind === "Expense" ? "Total spent" : "Total income"}
                </span>
                <strong className="t-heading">
                  {kind === "Expense" ? "Rs. 225,614" : "Rs. 413,775"}
                </strong>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="percent"
                    nameKey="name"
                    innerRadius="63%"
                    outerRadius="88%"
                    paddingAngle={2}
                    stroke="none"
                  >
                    {data.map((entry) => (
                      <Cell fill={entry.color} key={entry.name} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      borderRadius: 8,
                      borderColor: "var(--divider)",
                      background: "var(--raised)",
                      color: "var(--foreground)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </section>
            <div className="category-stats-list grid content-center">
              {data.map((category) => (
                <Link
                  className="category-stat-row grid min-h-14.25 grid-cols-[38px_minmax(0,1fr)_auto_10px] items-center gap-2.5 max-md:min-h-15 max-phone-lg:grid-cols-[33px_minmax(0,1fr)_auto_8px] max-phone-lg:gap-1.75"
                  href={`/stats/category/${encodeURIComponent(category.name.toLowerCase().replaceAll(" ", "-"))}`}
                  key={category.name}
                >
                  <span className="screen-emoji">{category.emoji}</span>
                  <span className="screen-row-main">
                    <strong className="t-body">{category.name}</strong>
                    <span className="t-meta">
                      {category.percent}% of {kind.toLowerCase()}
                    </span>
                  </span>
                  <strong className="t-small-bold">{category.spent}</strong>
                  <span
                    className="category-swatch"
                    style={{ background: category.color }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="screen-stack grid min-w-0 content-start gap-4.5">
          <section className="chart-panel chart-panel-wide relative w-full min-w-0 mt-1.25 mb-4.5 h-72.5 max-md:h-65">
            <div className={`chart-title ${chartTitleClassName}`}>
              <h2 className="t-heading m-0">Income and expenses</h2>
              <span className="t-small-mute">
                Last 12 months · Rs. thousands
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
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
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "var(--divider)",
                    background: "var(--raised)",
                    color: "var(--foreground)",
                  }}
                />
                <Line
                  dataKey="income"
                  stroke="var(--income)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  dataKey="expense"
                  stroke="var(--expense)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
          <section className="chart-panel chart-panel-wide relative w-full min-w-0 mt-1.25 mb-4.5 h-72.5 max-md:h-65">
            <div className={`chart-title ${chartTitleClassName}`}>
              <h2 className="t-heading m-0">Net worth</h2>
              <span className="t-kpi">Rs. 335,348.28</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
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
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "var(--divider)",
                    background: "var(--raised)",
                    color: "var(--foreground)",
                  }}
                />
                <Line
                  dataKey="net"
                  stroke="var(--accent)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </div>
      )}
    </div>
  );
}
