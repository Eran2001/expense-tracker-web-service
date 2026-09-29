"use client";

import { useState } from "react";
import { TransactionList } from "@/components/shared";
import { transactionItems } from "./data";

export function CalendarView() {
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
