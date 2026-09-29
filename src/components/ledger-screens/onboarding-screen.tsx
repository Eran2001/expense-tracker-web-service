"use client";

import { useState } from "react";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import { ActionButton, PageHeading } from "@/components/shared";
import { accountItems, expenseCategories } from "./data";

export function OnboardingScreen() {
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
