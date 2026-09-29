"use client";

import { useState } from "react";
import { Check, Pencil, Plus, Repeat2, X } from "lucide-react";
import { ActionButton, PageHeading } from "@/components/shared";
import { recurringItems } from "./data";
import { screenBodyClassName, screenSectionClassName, sectionHeadingClassName } from "./styles";

export function RecurringScreen() {
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
