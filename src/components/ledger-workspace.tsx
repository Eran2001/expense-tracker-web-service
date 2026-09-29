"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  LayoutDashboard,
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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    label: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
    mobile: true,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
    mobile: true,
  },
  { label: "Stats", href: "/stats", icon: ChartNoAxesCombined, mobile: true },
  { label: "Accounts", href: "/accounts", icon: Wallet, mobile: true },
  { label: "Budgets", href: "/budgets", icon: ShieldCheck },
  { label: "Recurring", href: "/recurring", icon: Repeat2 },
  { label: "Search", href: "/search", icon: Search },
  { label: "More", href: "/more", icon: Settings2, mobile: true },
];

const accountSummary = [
  { label: "Wallet", balance: "8,420.50", icon: Wallet },
  { label: "Commercial", balance: "246,902.33", icon: Landmark },
  { label: "People's", balance: "37,215.45", icon: Landmark },
  { label: "BOC", balance: "60,810.00", icon: Landmark },
];

function routeIsActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== "/transactions" && pathname.startsWith(`${href}/`))
  );
}

function AddTransactionSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [kind, setKind] = useState("Expense");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  useEffect(() => {
    if (!open) {
      setSaved(false);
      return;
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="sheet-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        aria-labelledby="add-sheet-title"
        aria-modal="true"
        className="add-sheet"
        role="dialog"
      >
        <header className="sheet-heading">
          <div>
            <span className="section-label t-caption-bold">New entry</span>
            <h2 className="t-heading">Add transaction</h2>
          </div>
          <button
            aria-label="Close sheet"
            className="icon-link"
            onClick={onClose}
            type="button"
          >
            <X size={19} />
          </button>
        </header>
        <div className="segmented-control transaction-kind">
          {["Expense", "Income", "Transfer"].map((item) => (
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
        {saved ? (
          <div className="sheet-saved">
            <span className="success-mark">✓</span>
            <strong className="t-title">Ready to add</strong>
            <span className="t-body-mute">
              Transaction UI is connected after the API phase.
            </span>
            <Button onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form className="add-transaction-form" onSubmit={submit}>
            <label className="amount-field">
              <span className="t-small-mute">Amount</span>
              <span className="amount-input-wrap">
                <span>Rs.</span>
                <input
                  aria-label="Amount"
                  inputMode="decimal"
                  placeholder="0.00"
                  required
                />
              </span>
            </label>
            <div className="form-grid">
              <label className="form-field">
                <span className="t-small-bold">Category</span>
                <select defaultValue="Food">
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Bills</option>
                  <option>Career</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-field">
                <span className="t-small-bold">
                  {kind === "Transfer" ? "From account" : "Account"}
                </span>
                <select defaultValue="Wallet">
                  <option>Wallet</option>
                  <option>Commercial</option>
                  <option>People&apos;s</option>
                  <option>BOC</option>
                  <option>People&apos;s Credit Card</option>
                </select>
              </label>
              {kind === "Transfer" && (
                <label className="form-field">
                  <span className="t-small-bold">To account</span>
                  <select defaultValue="Commercial">
                    <option>Commercial</option>
                    <option>People&apos;s</option>
                    <option>BOC</option>
                    <option>People&apos;s Credit Card</option>
                  </select>
                </label>
              )}
              <label className="form-field">
                <span className="t-small-bold">Title</span>
                <input placeholder="What was this for?" required />
              </label>
              <label className="form-field">
                <span className="t-small-bold">Date</span>
                <input defaultValue="2026-09-29" type="date" />
              </label>
              <label className="form-field form-field-wide">
                <span className="t-small-bold">Note</span>
                <textarea placeholder="Add a note" rows={2} />
              </label>
            </div>
            <div className="sheet-footer">
              <Button onClick={onClose} type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">
                <Plus size={16} />
                Save transaction
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export function LedgerWorkspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof document === "undefined" ||
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );
  const [month, setMonth] = useState(() => new Date());
  const [addOpen, setAddOpen] = useState(false);
  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(month);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("ledger-theme", next);
  }

  function moveMonth(delta: number) {
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );
  }

  return (
    <div className="ledger-app block min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="ledger-sidebar sticky top-0 hidden h-screen flex-col gap-6 px-4 pt-6.25 pb-4.5 lg:flex max-h-640:h-svh max-h-640:overflow-y-auto max-h-640:gap-3.75 max-h-640:pt-3.5 max-h-640:pb-3">
        <Link
          className="brand-lockup flex items-center gap-2.5"
          href="/overview"
          aria-label="Ledger home"
        >
          <span className="brand-mark">L</span>
          <span>Ledger</span>
        </Link>
        <Button
          className="add-transaction w-full justify-start gap-2.5"
          onClick={() => setAddOpen(true)}
          size="lg"
        >
          <Plus aria-hidden="true" />
          <span>Add transaction</span>
          <kbd>N</kbd>
        </Button>
        <nav
          aria-label="Main navigation"
          className="side-navigation grid gap-0.75"
        >
          {navigation.map(({ label, href, icon: Icon }) => (
            <Link
              aria-current={routeIsActive(pathname, href) ? "page" : undefined}
              className={`nav-link flex min-h-9.75 items-center gap-2.75 px-2.5 ${routeIsActive(pathname, href) ? "is-active" : ""}`}
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <section className="sidebar-accounts mt-1.75 grid gap-3.25 max-h-640:gap-2.25">
          <div className="section-label t-caption-bold">Accounts</div>
          {accountSummary.map(({ label, balance, icon: Icon }) => (
            <Link
              className="sidebar-account flex min-w-0 items-center gap-2"
              href={`/accounts/${label.toLowerCase().replaceAll("'", "").replaceAll(" ", "-")}`}
              key={label}
            >
              <Icon aria-hidden="true" className="shrink-0" size={16} />
              <span className="min-w-0 truncate">{label}</span>
              <strong className="ml-auto min-w-0 truncate">{balance}</strong>
            </Link>
          ))}
          <div className="sidebar-net-worth mt-0.5 grid gap-1.25 pt-3.25">
            <span>Net worth</span>
            <strong>Rs. 335,348.28</strong>
          </div>
        </section>
        <div className="sidebar-footer mt-auto flex items-center gap-2">
          <span className="sync-indicator size-1.75" />
          <span>Sample data</span>
          <LockKeyhole aria-hidden="true" size={16} />
        </div>
      </aside>

      <main className="ledger-main mx-auto block w-full min-w-0 max-w-225 px-4 pb-25 min-[720px]:px-7 min-[720px]:pb-12 lg:max-w-[1600px] lg:px-6 lg:pb-14 min-[1200px]:px-9">
        <header className="topbar sticky top-0 z-30 flex h-16.75 items-center justify-between max-[719px]:h-14.25 max-h-480:h-12!">
          <div
            className="month-control flex items-center gap-1.25 max-[719px]:gap-px"
            aria-label="Selected month"
          >
            <Button
              aria-label="Previous month"
              className="size-8! max-[719px]:size-7.5!"
              onClick={() => moveMonth(-1)}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft size={17} />
            </Button>
            <span className="t-nav">{monthLabel}</span>
            <Button
              aria-label="Next month"
              className="size-8! max-[719px]:size-7.5!"
              onClick={() => moveMonth(1)}
              size="icon"
              variant="ghost"
            >
              <ChevronRight size={17} />
            </Button>
          </div>
          <div className="topbar-actions flex items-center gap-1">
            <Link
              aria-label="Search transactions"
              className="topbar-icon"
              href="/search"
            >
              <Search size={17} />
            </Link>
            <Button
              aria-label="Toggle color theme"
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
            >
              <Sun className="hidden dark:block" size={17} />
              <Moon className="dark:hidden" size={17} />
            </Button>
            <Link
              aria-label="More settings"
              className="topbar-icon"
              href="/more"
            >
              <Ellipsis size={17} />
            </Link>
          </div>
        </header>
        <div className="mobile-title flex items-center gap-2.5 px-0 pt-5 pb-2 lg:hidden max-[719px]:pt-4.25 max-[719px]:pb-2.75">
          <span className="brand-mark">L</span>
          <span>Ledger</span>
        </div>
        <div className="workspace-content mx-auto w-full max-w-[1380px] pt-6.25 pb-15 max-md:pt-4.5 max-md:pb-2 max-phone-lg:pt-3.5 max-h-700:pt-3.25 max-h-700:pb-7.5 max-h-700:max-md:pb-1 max-h-700:max-phone-lg:pt-3.25">
          {children}
        </div>
      </main>

      <nav
        className="mobile-tabbar fixed inset-x-0 bottom-0 z-10 grid h-15.5 grid-cols-5 pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px] lg:hidden max-h-480:h-13!"
        aria-label="Primary navigation"
      >
        {navigation
          .filter((item) => item.mobile)
          .map(({ label, href, icon: Icon }) => (
            <Link
              aria-current={routeIsActive(pathname, href) ? "page" : undefined}
              className={`grid content-center justify-items-center gap-1 ${routeIsActive(pathname, href) ? "is-active" : ""}`}
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          ))}
      </nav>
      <Button
        aria-label="Add transaction"
        className="mobile-fab fixed right-6 bottom-20 z-11 inline-flex size-12! lg:hidden max-h-480:bottom-16!"
        onClick={() => setAddOpen(true)}
        size="icon-lg"
      >
        <Plus aria-hidden="true" size={24} />
      </Button>
      <AddTransactionSheet onClose={() => setAddOpen(false)} open={addOpen} />
    </div>
  );
}
