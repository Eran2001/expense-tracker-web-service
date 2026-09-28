"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Ellipsis,
  Landmark,
  LockKeyhole,
  Moon,
  Plus,
  ReceiptText,
  Repeat2,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const transactionRows = [
  {
    day: "28",
    weekday: "Mon",
    items: [
      {
        icon: "🍛",
        title: "Tea & buns",
        category: "Food",
        account: "Wallet",
        amount: "Rs. 280.00",
        type: "expense",
      },
    ],
  },
  {
    day: "27",
    weekday: "Sun",
    items: [
      {
        icon: "🛵",
        title: "Petrol bike",
        category: "Transport",
        account: "Wallet",
        amount: "Rs. 2,500.00",
        type: "expense",
      },
      {
        icon: "🍛",
        title: "Lunch - rice & curry",
        category: "Food",
        account: "Wallet",
        amount: "Rs. 650.00",
        type: "expense",
      },
      {
        icon: "🤝",
        title: "From akka",
        category: "Other",
        account: "People's",
        amount: "Rs. 15,000.00",
        type: "income",
      },
      {
        icon: "⇄",
        title: "People's to Credit Card",
        category: "Card payment",
        account: "Transfer",
        amount: "Rs. 18,450.00",
        type: "transfer",
      },
    ],
  },
  {
    day: "26",
    weekday: "Sat",
    items: [
      {
        icon: "🎓",
        title: "Master dev course",
        category: "Career",
        account: "Commercial",
        amount: "Rs. 54,034.80",
        type: "expense",
      },
      {
        icon: "🥂",
        title: "Kasun's wedding gift",
        category: "Social Life",
        account: "Wallet",
        amount: "Rs. 10,000.00",
        type: "expense",
      },
    ],
  },
  {
    day: "25",
    weekday: "Fri",
    items: [
      {
        icon: "💼",
        title: "September salary",
        category: "Salary",
        account: "Commercial",
        amount: "Rs. 285,000.00",
        type: "income",
      },
      {
        icon: "🍛",
        title: "Keells groceries",
        category: "Food",
        account: "Credit Card",
        amount: "Rs. 4,862.40",
        type: "expense",
      },
    ],
  },
];

const accounts = [
  {
    name: "Wallet",
    detail: "Cash in hand",
    balance: "Rs. 8,420.50",
    icon: Wallet,
  },
  {
    name: "Commercial",
    detail: "Savings · •• 2381",
    balance: "Rs. 246,902.33",
    icon: Landmark,
  },
  {
    name: "People's",
    detail: "Savings · •• 0932",
    balance: "Rs. 37,215.45",
    icon: Landmark,
  },
  {
    name: "BOC",
    detail: "ධනයෝජන · •• 5520",
    balance: "Rs. 60,810.00",
    icon: Landmark,
  },
];

const navigation = [
  { label: "Transactions", icon: ReceiptText, mobile: true },
  { label: "Stats", icon: ChartNoAxesCombined, mobile: true },
  { label: "Accounts", icon: Wallet, mobile: true },
  { label: "Budgets", icon: ShieldCheck },
  { label: "Recurring", icon: Repeat2 },
  { label: "Search", icon: Search },
  { label: "Settings", icon: Settings2 },
];

function setTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("ledger-theme", theme);
}

export function LedgerShell() {
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2026);
  const [activeNavigation, setActiveNavigation] = useState("Transactions");

  useEffect(() => {
    const savedTheme = localStorage.getItem("ledger-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  function moveMonth(direction: number) {
    const next = new Date(year, month + direction, 1);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  }

  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  return (
    <div className="ledger-app min-h-screen">
      <aside className="ledger-sidebar hidden lg:flex">
        <Link className="brand-lockup" href="/" aria-label="Ledger home">
          <span className="brand-mark">L</span>
          <span>Ledger</span>
        </Link>
        <Button className="add-transaction" size="lg">
          <Plus aria-hidden="true" />
          <span>Add transaction</span>
          <kbd>N</kbd>
        </Button>
        <nav aria-label="Main navigation" className="side-navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              aria-current={activeNavigation === label ? "page" : undefined}
              className={`nav-link ${activeNavigation === label ? "is-active" : ""}`}
              key={label}
              onClick={() => setActiveNavigation(label)}
              type="button"
            >
              <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-accounts">
          <div className="section-label">Accounts</div>
          {accounts.map(({ name, balance, icon: Icon }) => (
            <div className="sidebar-account" key={name}>
              <Icon aria-hidden="true" size={16} />
              <span>{name}</span>
              <strong>{balance.replace("Rs. ", "")}</strong>
            </div>
          ))}
          <div className="sidebar-net-worth">
            <span>Net worth</span>
            <strong>Rs. 335,348.28</strong>
          </div>
        </div>
        <div className="sidebar-footer">
          <span className="sync-indicator" />
          <span>Ready to sync</span>
          <LockKeyhole aria-hidden="true" size={16} />
        </div>
      </aside>

      <main className="ledger-main">
        <header className="topbar">
          <div className="month-control" aria-label="Selected month">
            <Button
              aria-label="Previous month"
              onClick={() => moveMonth(-1)}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <span>{monthLabel}</span>
            <Button
              aria-label="Next month"
              onClick={() => moveMonth(1)}
              size="icon"
              variant="ghost"
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="topbar-actions">
            <Button
              aria-label="Search transactions"
              size="icon"
              variant="ghost"
            >
              <Search />
            </Button>
            <Button
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button aria-label="More options" size="icon" variant="ghost">
              <Ellipsis />
            </Button>
          </div>
        </header>

        <div className="mobile-title lg:hidden">
          <span className="brand-mark">L</span>
          <span>Ledger</span>
        </div>

        <div
          className="transaction-tabs"
          role="tablist"
          aria-label="Transaction views"
        >
          {["Daily", "Calendar", "Monthly", "Summary", "Notes"].map((tab) => (
            <button
              aria-selected={tab === "Daily"}
              className={tab === "Daily" ? "is-selected" : ""}
              key={tab}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="content-grid">
          <section
            aria-label="Transactions for selected month"
            className="transactions-column"
          >
            <div className="summary-strip">
              <div>
                <span>Income</span>
                <strong className="income-text">Rs. 413,775.00</strong>
              </div>
              <div>
                <span>Expenses</span>
                <strong className="expense-text">Rs. 225,614.69</strong>
              </div>
              <div>
                <span>Net</span>
                <strong>Rs. 188,160.31</strong>
              </div>
            </div>

            <article className="recurring-alert">
              <span className="recurring-icon">
                <Repeat2 aria-hidden="true" size={18} />
              </span>
              <div className="recurring-copy">
                <span className="section-label">Due today</span>
                <strong>Netflix</strong>
                <span>Bills · Credit Card · Monthly</span>
              </div>
              <strong className="expense-text recurring-amount">
                Rs. 2,990.00
              </strong>
              <div className="recurring-actions">
                <Button variant="secondary">Skip</Button>
                <Button>Confirm</Button>
              </div>
            </article>

            <div className="day-list">
              {transactionRows.map((day) => (
                <section
                  className="day-group"
                  key={`${year}-${month}-${day.day}`}
                >
                  <header className="day-header">
                    <strong className="day-number">{day.day}</strong>
                    <span
                      className={`weekday weekday-${day.weekday.toLowerCase()}`}
                    >
                      {day.weekday}
                    </span>
                    <span className="day-month">
                      {String(month + 1).padStart(2, "0")}.{year}
                    </span>
                    <span className="day-totals">
                      {day.items.some((item) => item.type === "income") && (
                        <span className="income-text">+ Rs. 15,000</span>
                      )}
                      {day.items.some((item) => item.type === "expense") && (
                        <span className="expense-text">- Rs. 67,184</span>
                      )}
                    </span>
                  </header>
                  <div className="day-transactions">
                    {day.items.map((item) => (
                      <button
                        className="transaction-row"
                        key={item.title}
                        type="button"
                      >
                        <span className={`transaction-icon type-${item.type}`}>
                          {item.icon}
                        </span>
                        <span className="transaction-description">
                          <strong>{item.title}</strong>
                          <span>
                            {item.category} · {item.account}
                          </span>
                        </span>
                        <span
                          className={`transaction-amount ${item.type}-text`}
                        >
                          {item.type === "income"
                            ? "+ "
                            : item.type === "expense"
                              ? "- "
                              : ""}
                          {item.amount}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="row-arrow"
                          size={15}
                        />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <aside className="overview-column" aria-label="Money overview">
            <section className="overview-panel net-worth-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Net worth</span>
                  <strong className="net-worth-value">Rs. 335,348.28</strong>
                </div>
                <span className="change-chip">
                  <ArrowUpRight aria-hidden="true" size={14} />
                  21.4%
                </span>
              </div>
              <div className="wealth-bars" aria-label="Net worth trend">
                {[38, 48, 44, 60, 53, 72, 66, 84, 77, 92, 80, 100].map(
                  (height, index) => (
                    <span
                      aria-hidden="true"
                      className={index === 11 ? "bar-current" : ""}
                      key={index}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <div className="chart-labels">
                <span>Jan</span>
                <span>Today</span>
              </div>
            </section>

            <section className="overview-panel account-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Your accounts</span>
                  <strong>
                    Assets <span>Rs. 353,348.28</span>
                  </strong>
                </div>
                <Button
                  aria-label="View accounts"
                  size="icon-sm"
                  variant="ghost"
                >
                  <ArrowRight />
                </Button>
              </div>
              <div className="account-list">
                {accounts.map(({ name, detail, balance, icon: Icon }) => (
                  <div className="account-row" key={name}>
                    <span className="account-icon">
                      <Icon aria-hidden="true" size={17} />
                    </span>
                    <span className="account-copy">
                      <strong>{name}</strong>
                      <span>{detail}</span>
                    </span>
                    <strong className="account-balance">{balance}</strong>
                  </div>
                ))}
              </div>
              <div className="credit-summary">
                <span className="account-icon credit-icon">
                  <CreditCard aria-hidden="true" size={17} />
                </span>
                <span className="account-copy">
                  <strong>People&apos;s Credit Card</strong>
                  <span>12% used · Due Oct 15</span>
                </span>
                <strong className="expense-text">- Rs. 18,000</strong>
              </div>
              <div className="credit-meter">
                <span />
              </div>
              <div className="credit-meter-label">
                <span>Rs. 150,000 limit</span>
                <span>Rs. 132,000 available</span>
              </div>
            </section>

            <section className="overview-panel budget-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Monthly budget</span>
                  <strong>
                    Rs. 225,614.69{" "}
                    <span className="muted-inline">of Rs. 270,000</span>
                  </strong>
                </div>
                <CalendarDays
                  aria-hidden="true"
                  className="muted-icon"
                  size={18}
                />
              </div>
              <div className="budget-meter">
                <span />
              </div>
              <div className="budget-foot">
                <span>Rs. 44,385.31 left</span>
                <span>84%</span>
              </div>
            </section>

            <div className="more-link">
              <CircleHelp aria-hidden="true" size={16} />
              More account details
              <ArrowRight aria-hidden="true" size={14} />
            </div>
          </aside>
        </div>
      </main>

      <nav className="mobile-tabbar lg:hidden" aria-label="Primary navigation">
        {navigation
          .filter((item) => item.mobile)
          .map(({ label, icon: Icon }) => (
            <button
              aria-current={activeNavigation === label ? "page" : undefined}
              className={activeNavigation === label ? "is-active" : ""}
              key={label}
              onClick={() => setActiveNavigation(label)}
              type="button"
            >
              <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        <button
          aria-label="More sections"
          onClick={() => setActiveNavigation("More")}
          type="button"
        >
          <Ellipsis aria-hidden="true" size={20} />
          <span>More</span>
        </button>
      </nav>

      <Button
        aria-label="Add transaction"
        className="mobile-fab lg:hidden"
        size="icon-lg"
      >
        <Plus aria-hidden="true" size={24} />
      </Button>
    </div>
  );
}
