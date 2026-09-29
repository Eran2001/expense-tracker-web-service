"use client";

import { useState } from "react";
import { Check, Download, Pencil, Plus } from "lucide-react";
import { ActionButton, PageHeading } from "@/components/shared";
import { expenseCategories } from "./data";
import { screenBodyClassName } from "./styles";

export function BudgetsScreen() {
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
