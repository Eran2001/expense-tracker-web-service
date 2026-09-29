"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CloudDownload,
  Download,
  FileSpreadsheet,
  LockKeyhole,
  Pencil,
  Plus,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { ActionButton, PageHeading } from "@/components/shared";
import { expenseCategories, settingsItems } from "./data";
import {
  screenBodyClassName,
  screenSectionClassName,
  settingsRowLayoutClassName,
} from "./styles";
import { AccountsScreen } from "./accounts-screen";

export function SettingsScreen({ section }: { section: string }) {
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
