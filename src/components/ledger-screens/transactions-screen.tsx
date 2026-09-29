"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Repeat2 } from "lucide-react";
import { ActionButton, Metric, MetricStrip, PageHeading } from "@/components/shared";
import { accountItems } from "./data";
import { screenBodyClassName, sectionHeadingClassName } from "./styles";
import { DailyTransactions } from "./daily-transactions";
import { CalendarView } from "./calendar-view";
import { MonthlyView } from "./monthly-view";
import { SummaryView } from "./summary-view";
import { NotesView } from "./notes-view";

export function TransactionsScreen() {
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
