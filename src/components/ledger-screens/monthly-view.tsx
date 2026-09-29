"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function MonthlyView() {
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
