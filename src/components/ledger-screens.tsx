"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  ChevronRight,
  CloudDownload,
  CreditCard,
  Download,
  FileSpreadsheet,
  FileUp,
  Filter,
  Landmark,
  LockKeyhole,
  Pencil,
  Plus,
  Repeat2,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  Trash2,
  Upload,
  Wallet,
  X,
} from "lucide-react";
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

const transactionItems = [
  {
    id: "tx-01",
    day: "28",
    weekday: "Mon",
    emoji: "🍛",
    title: "Tea & buns",
    category: "Food",
    account: "Wallet",
    amount: "Rs. 280.00",
    type: "expense",
    note: "",
  },
  {
    id: "tx-02",
    day: "27",
    weekday: "Sun",
    emoji: "🛵",
    title: "Petrol bike",
    category: "Transport",
    account: "Wallet",
    amount: "Rs. 2,500.00",
    type: "expense",
    note: "",
  },
  {
    id: "tx-03",
    day: "27",
    weekday: "Sun",
    emoji: "🍛",
    title: "Lunch - rice & curry",
    category: "Food",
    account: "Wallet",
    amount: "Rs. 650.00",
    type: "expense",
    note: "",
  },
  {
    id: "tx-04",
    day: "27",
    weekday: "Sun",
    emoji: "🤝",
    title: "From akka",
    category: "Other",
    account: "People's",
    amount: "Rs. 15,000.00",
    type: "income",
    note: "Trip to Ella",
  },
  {
    id: "tx-05",
    day: "27",
    weekday: "Sun",
    emoji: "⇄",
    title: "People's to Credit Card",
    category: "Card payment",
    account: "Transfer",
    amount: "Rs. 18,450.00",
    type: "transfer",
    note: "",
  },
  {
    id: "tx-06",
    day: "26",
    weekday: "Sat",
    emoji: "🎓",
    title: "Master dev course",
    category: "Career",
    account: "Commercial",
    amount: "Rs. 54,034.80",
    type: "expense",
    note: "Annual subscription",
  },
  {
    id: "tx-07",
    day: "26",
    weekday: "Sat",
    emoji: "🥂",
    title: "Kasun's wedding gift",
    category: "Social Life",
    account: "Wallet",
    amount: "Rs. 10,000.00",
    type: "expense",
    note: "",
  },
  {
    id: "tx-08",
    day: "25",
    weekday: "Fri",
    emoji: "💼",
    title: "September salary",
    category: "Salary",
    account: "Commercial",
    amount: "Rs. 285,000.00",
    type: "income",
    note: "",
  },
  {
    id: "tx-09",
    day: "25",
    weekday: "Fri",
    emoji: "🍛",
    title: "Keells groceries",
    category: "Food",
    account: "Credit Card",
    amount: "Rs. 4,862.40",
    type: "expense",
    note: "",
  },
];

const accountItems = [
  {
    id: "wallet",
    name: "Wallet",
    detail: "Cash in hand",
    balance: "Rs. 8,420.50",
    type: "cash",
    icon: Wallet,
  },
  {
    id: "commercial",
    name: "Commercial",
    detail: "Savings · •• 2381",
    balance: "Rs. 246,902.33",
    type: "bank",
    icon: Landmark,
  },
  {
    id: "peoples",
    name: "People's",
    detail: "Savings · •• 0932",
    balance: "Rs. 37,215.45",
    type: "bank",
    icon: Landmark,
  },
  {
    id: "boc",
    name: "BOC",
    detail: "ධනයෝජන · •• 5520",
    balance: "Rs. 60,810.00",
    type: "bank",
    icon: Landmark,
  },
  {
    id: "credit-card",
    name: "People's Credit Card",
    detail: "•• 6184 · Due Oct 15",
    balance: "- Rs. 18,000.00",
    type: "credit_card",
    icon: CreditCard,
  },
];

const expenseCategories = [
  {
    name: "Food",
    emoji: "🍛",
    spent: "Rs. 48,620",
    budget: "Rs. 60,000",
    percent: 81,
    color: "#e96b58",
  },
  {
    name: "Transport",
    emoji: "🛵",
    spent: "Rs. 22,450",
    budget: "Rs. 35,000",
    percent: 64,
    color: "#4c8dff",
  },
  {
    name: "Bills",
    emoji: "🧾",
    spent: "Rs. 18,900",
    budget: "Rs. 25,000",
    percent: 76,
    color: "#f5a524",
  },
  {
    name: "Career",
    emoji: "🎓",
    spent: "Rs. 54,035",
    budget: "Rs. 60,000",
    percent: 90,
    color: "#a78bfa",
  },
  {
    name: "Social Life",
    emoji: "🥂",
    spent: "Rs. 21,500",
    budget: "Rs. 30,000",
    percent: 72,
    color: "#3fb97f",
  },
  {
    name: "Other",
    emoji: "📦",
    spent: "Rs. 9,840",
    budget: "Rs. 20,000",
    percent: 49,
    color: "#e7a7c2",
  },
];

const trendData = [
  { month: "Oct", income: 320, expense: 210, net: 80 },
  { month: "Nov", income: 325, expense: 235, net: 90 },
  { month: "Dec", income: 410, expense: 260, net: 130 },
  { month: "Jan", income: 330, expense: 205, net: 105 },
  { month: "Feb", income: 330, expense: 220, net: 115 },
  { month: "Mar", income: 338, expense: 225, net: 113 },
  { month: "Apr", income: 350, expense: 240, net: 110 },
  { month: "May", income: 360, expense: 230, net: 130 },
  { month: "Jun", income: 355, expense: 260, net: 95 },
  { month: "Jul", income: 390, expense: 240, net: 150 },
  { month: "Aug", income: 380, expense: 270, net: 110 },
  { month: "Sep", income: 414, expense: 226, net: 188 },
];

const recurringItems = [
  {
    name: "Mobile data",
    detail: "Bills · Wallet · Due Oct 05",
    amount: "Rs. 300.00",
    status: "Active",
  },
  {
    name: "Netflix",
    detail: "Bills · Credit Card · Due Oct 12",
    amount: "Rs. 2,990.00",
    status: "Due today",
  },
  {
    name: "Loan installment",
    detail: "Family · Commercial · Due Oct 25",
    amount: "Rs. 15,000.00",
    status: "Active",
  },
  {
    name: "Salary",
    detail: "Salary · Commercial · Due Oct 25",
    amount: "Rs. 285,000.00",
    status: "Active",
  },
];

const settingsItems = [
  {
    key: "categories",
    title: "Categories",
    description: "Income and expense groups",
    icon: Settings2,
  },
  {
    key: "accounts",
    title: "Accounts",
    description: "Manage accounts and card settings",
    icon: Wallet,
  },
  {
    key: "templates",
    title: "Templates",
    description: "Saved transaction shortcuts",
    icon: FileSpreadsheet,
  },
  {
    key: "security",
    title: "Security",
    description: "PIN, passkeys, and auto-lock",
    icon: ShieldCheck,
  },
  {
    key: "backup",
    title: "Backup",
    description: "Export and restore your ledger",
    icon: CloudDownload,
  },
  {
    key: "import",
    title: "Import",
    description: "Bring in a CSV or Excel file",
    icon: FileUp,
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Theme, dates, and defaults",
    icon: Sun,
  },
];

const screenBodyClassName = [
  "screen-body mx-auto w-full max-w-[1380px] pt-6.25 pb-15",
  "max-md:pt-4.5 max-md:pb-2 max-phone-lg:pt-3.5",
  "max-h-700:pt-3.25 max-h-700:pb-7.5 max-h-700:max-md:pb-1",
  "max-h-700:max-phone-lg:pt-3.25",
].join(" ");

const chartTitleClassName =
  "absolute top-0 left-0 z-1 flex w-full items-center justify-between gap-3 px-4 py-3.5 max-md:items-start max-md:flex-col max-md:gap-1.25 max-md:px-2.5 max-md:py-3";
const accountScreenRowLayoutClassName =
  "grid min-h-16.5 grid-cols-[38px_minmax(0,1fr)_auto_18px] items-center gap-2.75 px-1 py-1.75 max-md:grid-cols-[36px_minmax(0,1fr)_auto_14px] max-md:gap-2 max-phone-lg:grid-cols-[32px_minmax(0,1fr)_auto] max-phone-lg:gap-2.75 max-phone-lg:[&>svg:last-child]:hidden";
const settingsRowLayoutClassName =
  "grid min-h-18 w-full grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-2.75 px-1 py-1.75 max-md:min-h-17";
const sectionHeadingClassName =
  "section-heading flex items-center justify-between gap-3 [&_h2]:m-0";
const screenSectionClassName = "screen-section grid gap-3.25 pt-2 pb-4.25";

function PageHeading({
  title,
  eyebrow,
  children,
  parent,
  rootHref,
}: {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  parent?: { label: string; href: string };
  rootHref?: string | null;
}) {
  return (
    <div className="screen-heading mb-5.5 flex min-h-14.5 items-center justify-between gap-4.5 max-md:mb-4 max-md:items-start max-phone-lg:gap-2">
      <div className="min-w-0">
        <Breadcrumbs current={title} parent={parent} rootHref={rootHref} />
        {eyebrow && (
          <span className="section-label t-caption-bold">{eyebrow}</span>
        )}
        <h1 className="t-heading-xl mt-0.75">{title}</h1>
      </div>
      {children && (
        <div className="screen-heading-actions flex items-center gap-2 max-md:flex-wrap max-md:justify-end max-phone-lg:gap-1.25 [&>.screen-action]:inline-flex max-md:[&>.screen-action]:min-h-8.5 max-md:[&>.screen-action]:px-2.25 max-phone-lg:[&>.screen-action]:gap-1.25 max-phone-lg:[&>.screen-action]:px-1.75">
          {children}
        </div>
      )}
    </div>
  );
}

function Breadcrumbs({
  current,
  parent,
  rootHref = "/overview",
}: {
  current: string;
  parent?: { label: string; href: string };
  rootHref?: string | null;
}) {
  const items = [
    { label: "Ledger", href: rootHref ?? undefined },
    ...(parent ? [parent] : []),
    { label: current },
  ];

  return (
    <nav aria-label="Breadcrumb" className="screen-breadcrumbs mb-1 min-w-0">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              className="inline-flex min-w-0 items-center gap-1 wrap-break-word"
              key={`${item.label}-${index}`}
            >
              {index > 0 && <ChevronRight aria-hidden="true" size={13} />}
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="screen-metric grid min-w-0 gap-1.5">
      <span className="t-small-mute">{label}</span>
      <strong className={`t-kpi ${tone ?? ""}`}>{value}</strong>
    </div>
  );
}

function MetricStrip({
  children,
  className = "grid grid-cols-3 gap-3.75 pt-0.75 pb-5 max-md:gap-2 max-md:pb-3.75",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`screen-metrics ${className}`}>{children}</div>;
}

function ActionButton({
  children,
  onClick,
  secondary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={`screen-action ${secondary ? "is-secondary" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function TransactionList({
  items = transactionItems,
}: {
  items?: typeof transactionItems;
}) {
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

function DailyTransactions() {
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

function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(28);
  const cells = Array.from({ length: 35 }, (_, index) => index - 1);
  return (
    <>
      <div className="calendar-weekdays">
        {"SMTWTFS".split("").map((day, index) => (
          <span className="t-caption-bold" key={`${day}-${index}`}>
            {day}
          </span>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => (
          <button
            aria-pressed={day === selectedDay}
            className={`calendar-cell ${day < 1 || day > 30 ? "is-outside" : ""} ${day === selectedDay ? "is-selected" : ""}`}
            key={index}
            onClick={() => day > 0 && day <= 30 && setSelectedDay(day)}
            type="button"
          >
            <span className="t-small">
              {day < 1 ? 31 + day : day > 30 ? day - 30 : day}
            </span>
            {[3, 8, 15, 21, 25, 27, 28].includes(day) && (
              <span className="calendar-dot" />
            )}
          </button>
        ))}
      </div>
      <div className="calendar-selection">
        <div className="screen-day-heading flex min-h-8.5 items-center justify-between gap-3 pb-2 max-phone-lg:gap-1.75">
          <strong className="t-heading">September {selectedDay}</strong>
          <span className="t-small-mute">Daily activity</span>
        </div>
        <TransactionList
          items={transactionItems
            .filter((item) => Number(item.day) === selectedDay)
            .slice(0, 4)}
        />
      </div>
    </>
  );
}

function MonthlyView() {
  const [expanded, setExpanded] = useState("September");
  return (
    <div className="month-list">
      {[
        "September",
        "August",
        "July",
        "June",
        "May",
        "April",
        "March",
        "February",
        "January",
        "December",
        "November",
        "October",
      ].map((month, index) => (
        <section className="month-list-item" key={month}>
          <button
            aria-expanded={expanded === month}
            className="month-list-trigger"
            onClick={() => setExpanded(expanded === month ? "" : month)}
            type="button"
          >
            <span className="month-list-name">
              <strong className="t-body">{month} 2026</strong>
              <span className="t-meta">
                {index === 0 ? "Current period" : `${30 - index} transactions`}
              </span>
            </span>
            <span className="month-list-amounts">
              <strong className="income-text t-small-bold">
                + Rs. {index === 0 ? "413,775" : "332,500"}
              </strong>
              <strong className="expense-text t-small-bold">
                − Rs. {index === 0 ? "225,614" : "214,270"}
              </strong>
            </span>
            <ChevronRight
              aria-hidden="true"
              className={expanded === month ? "is-open" : ""}
              size={17}
            />
          </button>
          {expanded === month && (
            <div className="week-list">
              {[
                "Week 1 · 1–6",
                "Week 2 · 7–13",
                "Week 3 · 14–20",
                "Week 4 · 21–27",
                "Week 5 · 28–30",
              ].map((week, weekIndex) => (
                <div className="week-list-row t-small" key={week}>
                  <span>{week}</span>
                  <span>{weekIndex === 4 ? "Rs. 48,280" : "Rs. 56,430"}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function SummaryView() {
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

function NotesView() {
  const notes = ["Trip to Ella", "Annual subscription", "Rent and utilities"];
  return (
    <div className="screen-stack grid min-w-0 content-start gap-4.5">
      {notes.map((note, index) => (
        <section className="note-group" key={note}>
          <div className="note-group-heading">
            <div>
              <h2 className="t-heading">{note}</h2>
              <span className="t-meta">
                {index === 0 ? "2 transactions" : "1 transaction"}
              </span>
            </div>
            <strong className="t-small-bold">
              {index === 0 ? "Rs. 18,200.00" : "Rs. 54,034.80"}
            </strong>
          </div>
          <TransactionList
            items={transactionItems.filter((item) => item.note === note)}
          />
        </section>
      ))}
    </div>
  );
}

function OverviewScreen() {
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

function TransactionsScreen() {
  const [tab, setTab] = useState("Daily");
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Transactions" />
      <div
        className="transaction-tabs flex h-13.25 items-stretch gap-6 border-b max-md:h-11.5 max-md:gap-4.75 max-md:overflow-x-auto"
        role="tablist"
        aria-label="Transaction views"
      >
        {["Daily", "Calendar", "Monthly", "Summary", "Notes"].map((item) => (
          <button
            aria-selected={tab === item}
            className={`${tab === item ? "is-selected " : ""}t-nav relative shrink-0`}
            key={item}
            onClick={() => setTab(item)}
            role="tab"
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="screen-content-grid grid grid-cols-[minmax(0,1fr)_300px] items-start gap-7 pt-5 max-lg:grid-cols-[minmax(0,1fr)_260px] max-lg:gap-5 max-md:grid-cols-[minmax(0,1fr)] max-md:pt-3.5">
        <section className="screen-primary grid min-w-0 content-start gap-4.5 max-phone-lg:gap-3.5">
          <MetricStrip className="grid grid-cols-3 gap-3.75 p-0 pb-0.75 max-md:gap-2">
            <Metric label="Income" value="Rs. 413,775" tone="income-text" />
            <Metric label="Expenses" value="Rs. 225,614" tone="expense-text" />
            <Metric label="Net" value="Rs. 188,160" />
          </MetricStrip>
          {tab === "Daily" && (
            <div className="due-reminder grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.75 p-3.25 max-md:grid-cols-[32px_minmax(0,1fr)_auto] max-md:gap-2 max-md:p-2.5">
              <span className="reminder-icon">
                <Repeat2 size={18} />
              </span>
              <div className="grid gap-0.75">
                <span className="section-label t-caption-bold">Due today</span>
                <strong className="t-body">Netflix</strong>
                <span className="t-meta">Bills · Credit Card · Monthly</span>
              </div>
              <strong className="expense-text t-small-bold">
                Rs. 2,990.00
              </strong>
              <div className="reminder-actions col-[2/-1] flex justify-end gap-1.75 [&>.screen-action]:min-h-7.5 [&>.screen-action]:px-2.75">
                <ActionButton secondary>Skip</ActionButton>
                <ActionButton>Confirm</ActionButton>
              </div>
            </div>
          )}
          {tab === "Daily" && <DailyTransactions />}
          {tab === "Calendar" && <CalendarView />}
          {tab === "Monthly" && <MonthlyView />}
          {tab === "Summary" && <SummaryView />}
          {tab === "Notes" && <NotesView />}
        </section>
        <aside className="screen-aside grid min-w-0 content-start gap-4.5 max-lg:gap-3 max-md:grid-cols-2 max-phone-lg:grid-cols-1">
          <section className="overview-panel grid min-w-0 gap-3 p-4">
            <span className="section-label t-caption-bold">Net worth</span>
            <strong className="t-kpi-lg">Rs. 335,348.28</strong>
            <div
              className="mini-bars"
              aria-label="Net worth rising over the last year"
            >
              {[38, 48, 44, 60, 53, 72, 66, 84, 77, 92, 80, 100].map(
                (height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ),
              )}
            </div>
            <div className="aside-foot t-caption-mute">
              <span>Jan</span>
              <span>Today</span>
            </div>
          </section>
          <section className="overview-panel grid min-w-0 gap-3 p-4">
            <div className={sectionHeadingClassName}>
              <h2 className="t-title">Accounts</h2>
              <Link
                aria-label="View all accounts"
                className="icon-link"
                href="/accounts"
              >
                <ArrowRight size={16} />
              </Link>
            </div>
            {accountItems
              .slice(0, 3)
              .map(({ id, name, balance, icon: Icon }) => (
                <Link
                  className="aside-account-row"
                  href={`/accounts/${id}`}
                  key={id}
                >
                  <Icon size={17} />
                  <span className="t-small">{name}</span>
                  <strong className="t-caption-bold">{balance}</strong>
                </Link>
              ))}
          </section>
        </aside>
      </div>
    </div>
  );
}

function StatsScreen() {
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

function AccountsScreen({
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

function AccountDetailScreen({ id }: { id: string }) {
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

function SearchScreen() {
  const [query, setQuery] = useState("");
  const filtered = transactionItems.filter((item) =>
    `${item.title} ${item.category} ${item.note}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Search" />
      <div className="search-field">
        <Search size={19} />
        <input
          aria-label="Search transactions"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transactions"
          value={query}
        />
        <button aria-label="Search filters" className="icon-link" type="button">
          <Filter size={18} />
        </button>
      </div>
      <div className="filter-chips">
        <button className="filter-chip is-active" type="button">
          All dates <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          All types <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          All accounts <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          Amount <ChevronRight size={13} />
        </button>
      </div>
      <div
        className={`${sectionHeadingClassName} search-result-heading mt-3 mb-1`}
      >
        <h2 className="t-heading">
          {query ? `${filtered.length} results` : "Recent transactions"}
        </h2>
        {query && (
          <span className="t-small-mute">
            Matching title, category, or note
          </span>
        )}
      </div>
      <TransactionList items={filtered} />
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={24} />
          <strong className="t-title">No matches</strong>
          <span className="t-body-mute">Try a different search.</span>
        </div>
      )}
    </div>
  );
}

function BudgetsScreen() {
  const [copied, setCopied] = useState(false);
  return (
    <div className={screenBodyClassName}>
      <PageHeading eyebrow="September 2026" title="Monthly budget">
        <ActionButton secondary onClick={() => setCopied(true)}>
          {copied ? <Check size={16} /> : <Download size={16} />}
          {copied ? "Copied" : "Copy last month"}
        </ActionButton>
        <ActionButton>
          <Plus size={16} />
          Add budget
        </ActionButton>
      </PageHeading>
      <section className="budget-overview">
        <div className="budget-overview-head">
          <div>
            <span className="section-label t-caption-bold">
              Total budget used
            </span>
            <strong className="t-kpi-lg">
              Rs. 225,614.69 <span className="t-body-mute">of Rs. 270,000</span>
            </strong>
          </div>
          <span className="budget-percent t-heading">84%</span>
        </div>
        <div className="budget-large-track">
          <i style={{ width: "84%" }} />
        </div>
        <div className="budget-overview-foot t-small-mute">
          <span>Rs. 44,385.31 remaining</span>
          <span>5 days left</span>
        </div>
      </section>
      <div className="budget-list">
        {expenseCategories.map((category) => (
          <section className="budget-row" key={category.name}>
            <div className="budget-row-top">
              <span className="screen-emoji">{category.emoji}</span>
              <span className="screen-row-main">
                <strong className="t-body">{category.name}</strong>
                <span className="t-meta">
                  {category.percent > 80 ? "Near limit" : "On track"}
                </span>
              </span>
              <strong className="t-small-bold">
                {category.spent}{" "}
                <span className="t-small-mute">of {category.budget}</span>
              </strong>
              <button
                aria-label={`Edit ${category.name} budget`}
                className="icon-link"
                type="button"
              >
                <Pencil size={15} />
              </button>
            </div>
            <div className="progress-track">
              <i
                className={category.percent >= 80 ? "is-warning" : ""}
                style={{ width: `${category.percent}%` }}
              />
            </div>
            <div className="budget-row-foot t-caption-mute">
              <span>{category.percent}% used</span>
              <span>
                {category.percent >= 80 ? "Rs. 5,965 left" : "Rs. 12,550 left"}
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function RecurringScreen() {
  const [statuses, setStatuses] = useState(
    recurringItems.map((item) => item.status),
  );
  const updateStatus = (index: number, status: string) =>
    setStatuses((current) =>
      current.map((value, itemIndex) => (itemIndex === index ? status : value)),
    );
  return (
    <div className={screenBodyClassName}>
      <PageHeading eyebrow="4 active rules" title="Recurring">
        <ActionButton>
          <Plus size={16} />
          Add rule
        </ActionButton>
      </PageHeading>
      <section className={screenSectionClassName}>
        <div className={sectionHeadingClassName}>
          <h2 className="t-heading">Upcoming</h2>
          <span className="t-small-mute">Next 30 days</span>
        </div>
        <div className="recurring-list">
          {recurringItems.map((item, index) => (
            <div className="recurring-row" key={item.name}>
              <span
                className={`recurring-row-icon ${statuses[index] === "Due today" ? "is-due" : ""}`}
              >
                <Repeat2 size={19} />
              </span>
              <span className="screen-row-main">
                <strong className="t-body">{item.name}</strong>
                <span className="t-meta">{item.detail}</span>
              </span>
              <span className="recurring-row-end">
                <strong className="t-small-bold">{item.amount}</strong>
                <span
                  className={`status-label t-caption-bold ${statuses[index] === "Due today" ? "is-warning" : ""}`}
                >
                  {statuses[index]}
                </span>
              </span>
              {statuses[index] === "Due today" ? (
                <span className="recurring-inline-actions">
                  <button
                    aria-label="Skip Netflix this time"
                    onClick={() => updateStatus(index, "Skipped")}
                    type="button"
                  >
                    <X size={16} />
                  </button>
                  <button
                    aria-label="Confirm Netflix"
                    onClick={() => updateStatus(index, "Confirmed")}
                    type="button"
                  >
                    <Check size={16} />
                  </button>
                </span>
              ) : (
                <button
                  aria-label={`Edit ${item.name}`}
                  className="icon-link"
                  type="button"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MoreScreen() {
  return (
    <div className={screenBodyClassName}>
      <PageHeading eyebrow="Ledger" title="More" />
      <div className="settings-list">
        {settingsItems.map(({ key, title, description, icon: Icon }) => (
          <Link
            className={`settings-row ${settingsRowLayoutClassName}`}
            href={`/more/${key}`}
            key={key}
          >
            <span className="settings-icon">
              <Icon size={19} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">{title}</strong>
              <span className="t-meta">{description}</span>
            </span>
            <ArrowRight size={17} />
          </Link>
        ))}
      </div>
      <button className="lock-now-row" type="button">
        <LockKeyhole size={18} />
        <span className="t-body">Lock Ledger</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function SettingsScreen({ section }: { section: string }) {
  const title =
    settingsItems.find((item) => item.key === section)?.title ?? "Settings";
  const [saved, setSaved] = useState(false);
  if (section === "import")
    return (
      <div className={screenBodyClassName}>
        <PageHeading
          eyebrow="More"
          parent={{ label: "More", href: "/more" }}
          title="Import data"
        />
        <div className="import-drop">
          <Upload size={28} />
          <strong className="t-title">Choose a CSV or Excel file</strong>
          <span className="t-body-mute">CSV or XLSX · up to 5 MB</span>
          <label className="screen-action is-secondary">
            Browse files
            <input
              accept=".csv,.xlsx,.xls"
              className="visually-hidden"
              type="file"
            />
          </label>
        </div>
        <section className={screenSectionClassName}>
          <h2 className="t-heading">Recent imports</h2>
          <p className="t-body-mute">No import history yet.</p>
        </section>
      </div>
    );
  if (section === "backup")
    return (
      <div className={screenBodyClassName}>
        <PageHeading
          eyebrow="More"
          parent={{ label: "More", href: "/more" }}
          title="Backup"
        />
        <section className="backup-status">
          <span className="backup-status-icon">
            <CloudDownload size={23} />
          </span>
          <div>
            <span className="section-label t-caption-bold">Last backup</span>
            <strong className="t-title">Not backed up yet</strong>
          </div>
          <ActionButton>
            <Download size={16} />
            Export backup
          </ActionButton>
        </section>
        <div className="settings-list">
          <button
            className={`settings-row ${settingsRowLayoutClassName}`}
            type="button"
          >
            <span className="settings-icon">
              <FileSpreadsheet size={18} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">Export transactions</strong>
              <span className="t-meta">Download as CSV or Excel</span>
            </span>
            <Download size={17} />
          </button>
          <button
            className={`settings-row ${settingsRowLayoutClassName}`}
            type="button"
          >
            <span className="settings-icon">
              <Upload size={18} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">Restore from backup</strong>
              <span className="t-meta">
                Replace ledger data from a JSON backup
              </span>
            </span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    );
  if (section === "security")
    return (
      <div className={screenBodyClassName}>
        <PageHeading
          eyebrow="More"
          parent={{ label: "More", href: "/more" }}
          title="Security"
        />
        <section className={screenSectionClassName}>
          <div className={`settings-row ${settingsRowLayoutClassName}`}>
            <span className="settings-icon">
              <LockKeyhole size={18} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">PIN lock</strong>
              <span className="t-meta">PIN has not been set up</span>
            </span>
            <ActionButton secondary>Set up</ActionButton>
          </div>
          <div className={`settings-row ${settingsRowLayoutClassName}`}>
            <span className="settings-icon">
              <ShieldCheck size={18} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">Passkeys</strong>
              <span className="t-meta">Use Face ID or fingerprint</span>
            </span>
            <ActionButton secondary>Add passkey</ActionButton>
          </div>
          <label className="preference-row">
            <span className="screen-row-main">
              <strong className="t-body">Auto-lock</strong>
              <span className="t-meta">Lock after inactivity</span>
            </span>
            <select className="screen-select" defaultValue="5">
              <option value="0">Immediately</option>
              <option value="1">1 minute</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
            </select>
          </label>
        </section>
      </div>
    );
  if (section === "categories")
    return (
      <div className={screenBodyClassName}>
        <PageHeading
          eyebrow="More"
          parent={{ label: "More", href: "/more" }}
          title="Categories"
        >
          <ActionButton>
            <Plus size={16} />
            Add category
          </ActionButton>
        </PageHeading>
        <div className="category-settings">
          <h2 className="t-heading">Expenses</h2>
          {expenseCategories.map((item) => (
            <div className="simple-row" key={item.name}>
              <span>{item.emoji}</span>
              <strong className="t-body">{item.name}</strong>
              <span className="simple-row-spacer" />
              <button
                aria-label={`Edit ${item.name}`}
                className="icon-link"
                type="button"
              >
                <Pencil size={16} />
              </button>
            </div>
          ))}
          <h2 className="t-heading income-heading">Income</h2>
          {["Salary", "Allowance", "Bonus", "Other"].map((name, index) => (
            <div className="simple-row" key={name}>
              <span>{["💼", "🎁", "🏆", "📦"][index]}</span>
              <strong className="t-body">{name}</strong>
              <span className="simple-row-spacer" />
              <button
                aria-label={`Edit ${name}`}
                className="icon-link"
                type="button"
              >
                <Pencil size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  if (section === "templates")
    return (
      <div className={screenBodyClassName}>
        <PageHeading
          eyebrow="More"
          parent={{ label: "More", href: "/more" }}
          title="Templates"
        >
          <ActionButton>
            <Plus size={16} />
            Add template
          </ActionButton>
        </PageHeading>
        <div className="settings-list">
          {[
            { name: "Morning tea", detail: "Expense · Food · Rs. 280" },
            { name: "Monthly salary", detail: "Income · Salary · Ask amount" },
            {
              name: "Pay credit card",
              detail: "Transfer · Commercial to card",
            },
          ].map((item) => (
            <div
              className={`settings-row ${settingsRowLayoutClassName}`}
              key={item.name}
            >
              <span className="settings-icon">
                <FileSpreadsheet size={18} />
              </span>
              <span className="screen-row-main">
                <strong className="t-body">{item.name}</strong>
                <span className="t-meta">{item.detail}</span>
              </span>
              <button
                aria-label={`Edit ${item.name}`}
                className="icon-link"
                type="button"
              >
                <Pencil size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  if (section === "accounts")
    return <AccountsScreen parent={{ label: "More", href: "/more" }} />;
  return (
    <div className={screenBodyClassName}>
      <PageHeading
        eyebrow="More"
        parent={{ label: "More", href: "/more" }}
        title={title}
      />
      <section className={`${screenSectionClassName} preference-settings`}>
        <label className="preference-row">
          <span className="screen-row-main">
            <strong className="t-body">Theme</strong>
            <span className="t-meta">Choose your preferred appearance</span>
          </span>
          <select className="screen-select" defaultValue="dark">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </label>
        <label className="preference-row">
          <span className="screen-row-main">
            <strong className="t-body">Month starts on</strong>
            <span className="t-meta">Budget and month views</span>
          </span>
          <select className="screen-select" defaultValue="1">
            {Array.from({ length: 28 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
                {index === 0 ? "st" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="preference-row">
          <span className="screen-row-main">
            <strong className="t-body">Week starts on</strong>
          </span>
          <select className="screen-select" defaultValue="sunday">
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
          </select>
        </label>
        <ActionButton onClick={() => setSaved(true)}>
          <Check size={16} />
          {saved ? "Saved" : "Save preferences"}
        </ActionButton>
      </section>
    </div>
  );
}

function TransactionDetailScreen({ id }: { id: string }) {
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

function CategoryDetailScreen({ id }: { id: string }) {
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

function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const steps = ["Accounts", "Categories", "Preferences"];
  return (
    <div className="onboarding-screen">
      <div className="onboarding-brand">
        <span className="brand-mark">L</span>
        <strong>Ledger</strong>
      </div>
      <div className="onboarding-progress">
        {steps.map((item, index) => (
          <div className={index <= step ? "is-current" : ""} key={item}>
            <span>{index < step ? <Check size={15} /> : index + 1}</span>
            <strong className="t-small">{item}</strong>
          </div>
        ))}
      </div>
      <PageHeading
        eyebrow={`Step ${step + 1} of ${steps.length}`}
        parent={{ label: "Setup", href: "/setup" }}
        rootHref={null}
        title={
          step === 0
            ? "Add your accounts"
            : step === 1
              ? "Choose categories"
              : "Set your preferences"
        }
      />
      {step === 0 ? (
        <div className="onboarding-section">
          <div className="suggestion-chips">
            {["Cash wallet", "Bank account", "Credit card"].map((item) => (
              <button className="filter-chip" key={item} type="button">
                <Plus size={14} />
                {item}
              </button>
            ))}
          </div>
          {accountItems.slice(0, 2).map((item) => (
            <div className="onboarding-account" key={item.name}>
              <span className="screen-row-main">
                <strong className="t-body">{item.name}</strong>
                <span className="t-meta">
                  {item.type === "cash" ? "Cash" : "Bank"}
                </span>
              </span>
              <label className="onboarding-balance">
                <span className="t-caption-mute">Starting balance</span>
                <input
                  aria-label={`${item.name} starting balance`}
                  defaultValue={item.balance.replace("Rs. ", "")}
                />
              </label>
              <button
                aria-label={`Remove ${item.name}`}
                className="icon-link"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <ActionButton secondary>
            <Plus size={16} />
            Add account
          </ActionButton>
        </div>
      ) : step === 1 ? (
        <div className="onboarding-section">
          <div className="onboarding-category-grid">
            {[
              ...expenseCategories,
              {
                name: "Salary",
                emoji: "💼",
                spent: "",
                budget: "",
                percent: 0,
                color: "#4c8dff",
              },
            ].map((item) => (
              <label className="category-check" key={item.name}>
                <input type="checkbox" defaultChecked />
                <span>{item.emoji}</span>
                <strong className="t-small">{item.name}</strong>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="onboarding-section preference-settings">
          <label className="preference-row">
            <span className="screen-row-main">
              <strong className="t-body">Month starts on</strong>
              <span className="t-meta">
                Used for monthly totals and budgets
              </span>
            </span>
            <select className="screen-select" defaultValue="1">
              <option value="1">1st</option>
              <option value="25">25th</option>
            </select>
          </label>
          <label className="preference-row">
            <span className="screen-row-main">
              <strong className="t-body">Default account</strong>
            </span>
            <select className="screen-select" defaultValue="wallet">
              <option value="wallet">Wallet</option>
              <option value="commercial">Commercial</option>
            </select>
          </label>
        </div>
      )}
      <div className="onboarding-footer">
        <button
          className="screen-action is-secondary"
          onClick={() => setStep(Math.max(0, step - 1))}
          type="button"
          disabled={step === 0}
        >
          Back
        </button>
        <button
          className="screen-action"
          onClick={() =>
            step === 2
              ? window.location.assign("/transactions")
              : setStep(step + 1)
          }
          type="button"
        >
          {step === 2 ? "Finish setup" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AuthScreen({ mode }: { mode: "lock" | "setup" }) {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const isSetup = mode === "setup";
  const appendPin = (digit: string) =>
    setPin((value) => (value.length < 6 ? `${value}${digit}` : value));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSetup && pin.length !== 6)
      return setMessage("Enter a 6-digit PIN to continue.");
    window.location.assign(isSetup ? "/onboarding" : "/transactions");
  };
  return (
    <div className="auth-screen">
      <Link className="auth-brand" href="/">
        <span className="brand-mark">L</span>
        <strong>Ledger</strong>
      </Link>
      <form className="auth-panel" onSubmit={submit}>
        <Breadcrumbs
          current={isSetup ? "Secure your ledger" : "Unlock Ledger"}
          rootHref={null}
        />
        <span className="auth-icon">
          <LockKeyhole size={22} />
        </span>
        <span className="section-label t-caption-bold">
          {isSetup ? "First-time setup" : "Welcome back"}
        </span>
        <h1 className="t-heading-xl">
          {isSetup ? "Secure your ledger" : "Unlock Ledger"}
        </h1>
        {isSetup && (
          <>
            <label className="form-field">
              <span className="t-small-bold">Your name</span>
              <input autoComplete="name" required />
            </label>
            <label className="form-field">
              <span className="t-small-bold">Email for backups</span>
              <input autoComplete="email" required type="email" />
            </label>
          </>
        )}
        <label className="form-field">
          <span className="t-small-bold">6-digit PIN</span>
          <input
            aria-label="6-digit PIN"
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            onChange={(event) =>
              setPin(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            required
            type="password"
            value={pin}
          />
        </label>
        {isSetup && (
          <label className="form-field">
            <span className="t-small-bold">Confirm PIN</span>
            <input
              autoComplete="new-password"
              inputMode="numeric"
              maxLength={6}
              required
              type="password"
            />
          </label>
        )}
        <div aria-label="PIN keypad" className="pin-pad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
            (digit, index) => (
              <button
                aria-label={
                  digit === "⌫" ? "Delete last digit" : digit || undefined
                }
                className="pin-key"
                disabled={!digit}
                key={index}
                onClick={() =>
                  digit === "⌫"
                    ? setPin((value) => value.slice(0, -1))
                    : appendPin(digit)
                }
                type="button"
              >
                {digit}
              </button>
            ),
          )}
        </div>
        {message && <p className="auth-message t-small">{message}</p>}
        <button className="screen-action auth-submit" type="submit">
          {isSetup ? "Create owner" : "Unlock"}
          <ArrowRight size={16} />
        </button>
        {!isSetup && (
          <button className="passkey-button" type="button">
            <ShieldCheck size={17} />
            Use passkey
          </button>
        )}
      </form>
    </div>
  );
}

export function LedgerScreen({
  section,
  id,
}: {
  section: string;
  id?: string;
}) {
  if (section === "overview") return <OverviewScreen />;
  if (section === "transactions")
    return id ? <TransactionDetailScreen id={id} /> : <TransactionsScreen />;
  if (section === "stats")
    return id ? <CategoryDetailScreen id={id} /> : <StatsScreen />;
  if (section === "accounts")
    return id ? <AccountDetailScreen id={id} /> : <AccountsScreen />;
  if (section === "search") return <SearchScreen />;
  if (section === "budgets") return <BudgetsScreen />;
  if (section === "recurring") return <RecurringScreen />;
  if (section === "more")
    return id ? <SettingsScreen section={id} /> : <MoreScreen />;
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Page not found" />
      <Link className="text-link t-body" href="/transactions">
        Back to transactions <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export function LedgerAuthScreen({ mode }: { mode: "lock" | "setup" }) {
  return <AuthScreen mode={mode} />;
}

export function LedgerOnboardingScreen() {
  return <OnboardingScreen />;
}
