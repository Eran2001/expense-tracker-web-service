# Ledger: Personal Money Manager (Single-User PWA)

> **Purpose of this file:** This is the single source of truth for building Ledger. It is written so Claude Code (or any developer) can build the project phase by phase without guessing. Every technology, folder, table, endpoint, and flow is decided here. **If something is not in this file, ask before inventing it.**
>
> Ledger is a private app for ONE person (the owner). It tracks a cash wallet, 3 bank accounts, and 1 credit card in Sri Lankan Rupees. It is not a product for sale, so simplicity, reliability, speed, and $0 hosting matter more than scale.
>
> **100% manual. There is NO connection to any real bank, card, or payment service.** The owner creates every account by hand (just a name, a type, and a starting balance) and types in every income, expense, and transfer. Account names like "Commercial" or "People's" are only labels. Never add bank APIs, scraping, SMS reading, or anything that talks to a financial institution.

---

## 0. Instructions for Claude Code (read first)

1. Build **one phase at a time** (Section 16). Do not start the next phase until the current phase's "Done when" checklist passes.
2. **Do not change the tech decisions** in Section 2. No separate backend server: this is **one Next.js app** (UI + API) deployed to Vercel, with Neon Postgres.
3. **Money is always integer cents** (`bigint`, suffix `_cents`). Never floats. Display format: `Rs. 14,014.13`.
4. **Balances are never stored.** They are always computed from transactions (Section 7.1). This makes the data impossible to get "out of sync".
5. **Every date/time rule uses the owner's timezone** (`Asia/Colombo` by default, stored in settings). Store instants as `timestamptz` (UTC) plus a `local_date` column for grouping.
6. **Transaction ids are generated on the client** (UUID v7) so offline replays and double-taps are idempotent (`INSERT ... ON CONFLICT (id) DO NOTHING`).
7. Every API route and server action must call `requireUnlockedSession()` (Section 6) except the auth routes and cron routes (which use `CRON_SECRET`).
8. TypeScript strict mode. Validate all input with zod. No `any`.
9. Pure business logic (balances, credit card cycles, periods, recurrence, calculator, import parsing) lives in `src/lib/domain/` as pure functions with unit tests.
10. Never hardcode secrets. Everything comes from env vars (Section 14).
11. Copy Section 0 + Section 2 into `CLAUDE.md` at the repo root.

---

## 1. Product Overview

### 1.1 Accounts the owner has (created manually, labels only)
| Name | Type | Notes |
|---|---|---|
| Wallet | cash | |
| Commercial | bank | label only |
| People's | bank | label only |
| BOC | bank | label only |
| People's Credit Card | credit_card | limit, statement day, due day |

The account `type` only controls grouping and behavior in the app (cash and bank are assets; credit card is a liability with a statement cycle). Users can add more accounts later (e.g. savings like "ධනයෝජන"); nothing is hardcoded. Sinhala names must render correctly.

### 1.2 Features (MVP)
- PIN lock + passkey (Face ID / fingerprint) unlock, auto-lock after inactivity
- Transactions: income, expense, transfer (with optional fee), balance adjustment
- Fast add sheet: custom calculator keypad, recent categories, templates (favorites)
- Views: Daily, Calendar, Monthly (weeks inside months), Summary, Notes
- Stats: category donut (income/expense), category detail with 6-month bars, trends (income vs expense, net worth)
- Accounts: assets/liabilities/net worth, account detail with running balance, adjust balance (reconcile)
- Credit card: statement cycles, statement balance, amount due, due date, available credit, utilization, "Pay card"
- Budgets: overall + per category per month, copy from last month
- Recurring transactions: auto-post or "confirm/skip" reminders
- Search + filters
- Import from CSV/Excel (for data from the old Money Manager app) with column mapping
- Export to Excel/CSV, full JSON backup + restore, automatic weekly email backup
- Installable PWA with offline add (outbox) and instant loading from local cache
- Dark (default) and light theme

### 1.3 Out of scope (do NOT build)
- Multiple users / sharing
- Any bank/card connection, bank sync, open banking, SMS parsing, or scraping (everything is entered manually)
- Multi-currency
- Investments/stock tracking
- Native mobile apps

---

## 2. Tech Stack (fixed decisions)

| Layer | Choice |
|---|---|
| App | **Next.js 15 App Router + TypeScript** (one app: UI + Route Handlers for the API) |
| Hosting | **Vercel Hobby (free)**, Node.js runtime for all API routes, function region = Singapore (`sin1`) or the closest available to Sri Lanka |
| Database | **Neon Postgres (free plan)**, region AWS Singapore (`ap-southeast-1`), same region as the Vercel functions |
| ORM | **Drizzle ORM** + drizzle-kit migrations. Driver: `drizzle-orm/neon-serverless` (Pool over WebSocket, supports transactions) in production; `drizzle-orm/node-postgres` against local Docker Postgres in development/tests. Selected by `DB_DRIVER` env |
| UI | Tailwind CSS 4 + shadcn/ui + lucide-react + **vaul** (bottom sheet drawers) + sonner (toasts) |
| Charts | recharts |
| Client data | **TanStack Query v5** with `@tanstack/query-sync-storage-persister`/async IndexedDB persister (`idb-keyval`) so the app renders instantly from cache |
| Forms | react-hook-form + zod |
| Dates | date-fns + date-fns-tz |
| Auth | Custom single-user: PIN (argon2id via `@node-rs/argon2`) + passkeys via `@simplewebauthn/server` + `@simplewebauthn/browser`; session = signed + encrypted cookie via `iron-session` |
| PWA | `@serwist/next` (service worker, manifest, offline fallback) |
| Excel | `exceljs` (export + import of .xlsx), `papaparse` (CSV) |
| Email (backups) | Resend (free tier) via `resend` SDK |
| Receipt photos (optional, Phase 10) | Cloudflare R2 free tier via presigned PUT (`@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`). Photos compressed client-side to ≤ 300 KB WebP |
| Scheduled jobs | Vercel Cron (Hobby allows limited frequency; this app only needs daily and weekly jobs, check current Vercel docs for limits) |
| Testing | Vitest (domain logic + API with test DB), Playwright (E2E, mobile viewport) |
| Local dev | Docker Compose (Postgres 16 only) |

**Why this setup:** one person, low traffic → one deployable app, zero servers, $0/month. Neon suspends when idle; the persisted TanStack Query cache + optimistic updates hide the 1–3 second cold start on the first request.

---

## 3. Architecture

```
Phone / Desktop browser (installed PWA)
  ├─ Service worker (app shell cache, offline page)
  ├─ TanStack Query cache persisted to IndexedDB (instant open)
  └─ Outbox in IndexedDB (transactions created offline)
          │ HTTPS (same origin)
          ▼
Vercel (Next.js)
  ├─ App Router pages (client components for app screens)
  ├─ Route Handlers /api/*  → Drizzle → Neon Postgres (Singapore)
  └─ Vercel Cron → /api/cron/daily, /api/cron/weekly-backup
                     └─ Resend (email backup attachment)
```

### 3.1 Rules
- App screens are client components that fetch from `/api/*` with TanStack Query. The landing route `/` redirects to `/lock` or `/transactions`.
- All mutations are optimistic (update cache immediately, roll back on error).
- Only one database connection helper: `src/db/client.ts` exporting `db` (Drizzle). Pool `max: 1` on Vercel (serverless).
- All API responses are JSON with the error shape in Section 9.1.

---

## 4. Repository Structure

```
ledger/
├── CLAUDE.md
├── README.md
├── docker-compose.yml                # postgres:16-alpine for dev/test
├── drizzle.config.ts
├── vercel.json                       # crons + regions
├── .env.example
├── public/ (manifest.webmanifest, icons/)
└── src/
    ├── app/
    │   ├── layout.tsx                # theme, fonts, providers
    │   ├── page.tsx                  # redirect
    │   ├── lock/page.tsx             # PIN / passkey unlock
    │   ├── setup/page.tsx            # first-run owner setup (needs OWNER_SETUP_TOKEN)
    │   ├── onboarding/page.tsx       # accounts + categories wizard
    │   ├── (app)/layout.tsx          # tab bar / sidebar, lock guard, idle auto-lock
    │   ├── (app)/transactions/page.tsx          # ?tab=daily|calendar|monthly|summary|notes&month=2026-09
    │   ├── (app)/transactions/[id]/page.tsx     # detail
    │   ├── (app)/stats/page.tsx                 # ?view=categories|trends&type=expense&period=monthly&date=
    │   ├── (app)/stats/category/[id]/page.tsx
    │   ├── (app)/accounts/page.tsx
    │   ├── (app)/accounts/[id]/page.tsx
    │   ├── (app)/search/page.tsx
    │   ├── (app)/budgets/page.tsx
    │   ├── (app)/recurring/page.tsx
    │   ├── (app)/more/page.tsx
    │   ├── (app)/more/categories/page.tsx
    │   ├── (app)/more/accounts/page.tsx
    │   ├── (app)/more/templates/page.tsx
    │   ├── (app)/more/security/page.tsx
    │   ├── (app)/more/backup/page.tsx
    │   ├── (app)/more/import/page.tsx
    │   ├── (app)/more/preferences/page.tsx
    │   ├── offline/page.tsx
    │   ├── sw.ts                     # serwist service worker
    │   └── api/ ...                  # Section 9
    ├── components/
    │   ├── ui/                       # shadcn
    │   ├── layout/ (TabBar.tsx, Sidebar.tsx, MonthSwitcher.tsx, SummaryStrip.tsx, Fab.tsx)
    │   ├── transactions/ (AddSheet.tsx, CalcKeypad.tsx, CategoryGrid.tsx, AccountPicker.tsx, TxRow.tsx, DayGroup.tsx, CalendarGrid.tsx, MonthlyList.tsx, NotesList.tsx, TemplateChips.tsx)
    │   ├── stats/ (CategoryDonut.tsx, CategoryList.tsx, CategoryBars.tsx, TrendsChart.tsx, PeriodSelector.tsx)
    │   ├── accounts/ (AccountGroup.tsx, AccountRow.tsx, CardSummary.tsx, BalanceChart.tsx, AdjustBalanceSheet.tsx, AccountForm.tsx)
    │   ├── budgets/ (BudgetCard.tsx, BudgetForm.tsx)
    │   └── lock/ (PinPad.tsx, PasskeyButton.tsx)
    ├── db/
    │   ├── client.ts
    │   ├── schema.ts
    │   ├── migrations/
    │   └── seed.ts                   # dev only
    ├── server/                       # server-only services used by route handlers
    │   ├── auth.ts                   # requireUnlockedSession, PIN, passkeys, lockout
    │   ├── transactions.ts
    │   ├── accounts.ts               # balance queries
    │   ├── stats.ts
    │   ├── budgets.ts
    │   ├── recurring.ts
    │   ├── backup.ts                 # JSON + xlsx builders, restore
    │   ├── import.ts
    │   └── email.ts
    ├── lib/
    │   ├── domain/                   # PURE functions + tests
    │   │   ├── money.ts              # parse/format cents
    │   │   ├── calc.ts               # safe calculator (no eval)
    │   │   ├── periods.ts            # month start day, weeks, ranges
    │   │   ├── balances.ts           # signed effect of a transaction on an account
    │   │   ├── creditCard.ts         # statement cycles
    │   │   ├── recurrence.ts         # next occurrence
    │   │   └── importMapping.ts
    │   ├── api-client.ts             # fetch wrapper, error mapping, 401 → /lock
    │   ├── query-keys.ts
    │   ├── outbox.ts                 # offline queue in IndexedDB
    │   └── uuid.ts                   # uuid v7
    └── styles/globals.css            # design tokens
```

---

## 5. Database Schema (Postgres 16, Drizzle)

All PKs are `uuid`. Transaction ids come from the client (UUID v7); other ids may use `gen_random_uuid()`.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Single owner. Exactly one row allowed.
CREATE TABLE owner (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name text NOT NULL,
  email text NOT NULL,                        -- for backups
  pin_hash text NOT NULL,                     -- argon2id
  failed_pin_attempts int NOT NULL DEFAULT 0,
  locked_until timestamptz,                   -- brute-force lockout
  session_version int NOT NULL DEFAULT 1,     -- bump to log out all sessions
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE passkeys (
  id text PRIMARY KEY,                        -- credential id (base64url)
  public_key bytea NOT NULL,
  counter bigint NOT NULL DEFAULT 0,
  transports text[],
  device_name text NOT NULL,                  -- "iPhone", "MacBook"
  last_used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  timezone text NOT NULL DEFAULT 'Asia/Colombo',
  currency_symbol text NOT NULL DEFAULT 'Rs.',
  month_start_day smallint NOT NULL DEFAULT 1 CHECK (month_start_day BETWEEN 1 AND 28),
  week_start_day smallint NOT NULL DEFAULT 0 CHECK (week_start_day IN (0,1)),  -- 0 Sunday, 1 Monday
  default_account_id uuid,
  auto_lock_minutes smallint NOT NULL DEFAULT 5,   -- 0 = lock on every open
  theme text NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark','light','system')),
  weekly_backup_enabled boolean NOT NULL DEFAULT true,
  last_backup_at timestamptz,
  onboarded_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('cash','bank','credit_card')),
  last4 text CHECK (last4 ~ '^[0-9]{4}$'),
  color text NOT NULL DEFAULT '#4c8dff',
  icon text NOT NULL DEFAULT 'wallet',        -- lucide icon name
  opening_balance_cents bigint NOT NULL DEFAULT 0,  -- credit card: negative = amount owed at start
  opening_date date NOT NULL,                 -- balance is valid from this date
  include_in_totals boolean NOT NULL DEFAULT true,
  -- credit card only
  credit_limit_cents bigint,
  statement_day smallint CHECK (statement_day BETWEEN 1 AND 28),
  due_day smallint CHECK (due_day BETWEEN 1 AND 28),
  sort_order int NOT NULL DEFAULT 0,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (type <> 'credit_card' OR (credit_limit_cents IS NOT NULL AND statement_day IS NOT NULL AND due_day IS NOT NULL))
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('income','expense')),
  name text NOT NULL,
  emoji text NOT NULL DEFAULT '📦',
  color text NOT NULL DEFAULT '#a1a1aa',      -- used in charts
  sort_order int NOT NULL DEFAULT 0,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, name)
);

CREATE TABLE transactions (
  id uuid PRIMARY KEY,                        -- client-generated UUID v7
  type text NOT NULL CHECK (type IN ('income','expense','transfer','adjustment')),
  amount_cents bigint NOT NULL,
  account_id uuid NOT NULL REFERENCES accounts(id),          -- income/expense: the account; transfer: FROM; adjustment: the account
  to_account_id uuid REFERENCES accounts(id),                -- transfer only
  category_id uuid REFERENCES categories(id),                -- income/expense only
  title text NOT NULL DEFAULT '',
  note text,                                  -- free text; Notes tab groups by this
  occurred_at timestamptz NOT NULL,
  local_date date NOT NULL,                   -- occurred_at in owner timezone (set by server)
  transfer_group_id uuid,                     -- links a transfer and its fee expense
  recurring_rule_id uuid,
  photo_key text,                             -- R2 object key (optional)
  import_hash text UNIQUE,                    -- dedupe for imports
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,                     -- soft delete (Undo)
  CHECK (
    (type IN ('income','expense') AND amount_cents > 0 AND category_id IS NOT NULL AND to_account_id IS NULL) OR
    (type = 'transfer' AND amount_cents > 0 AND to_account_id IS NOT NULL AND to_account_id <> account_id AND category_id IS NULL) OR
    (type = 'adjustment' AND amount_cents <> 0 AND to_account_id IS NULL AND category_id IS NULL)   -- signed
  )
);
CREATE INDEX tx_local_date ON transactions(local_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX tx_account ON transactions(account_id, occurred_at) WHERE deleted_at IS NULL;
CREATE INDEX tx_to_account ON transactions(to_account_id, occurred_at) WHERE deleted_at IS NULL;
CREATE INDEX tx_category ON transactions(category_id, local_date) WHERE deleted_at IS NULL;
CREATE INDEX tx_search ON transactions USING gin (to_tsvector('simple', title || ' ' || coalesce(note,'')));

CREATE TABLE templates (                      -- "favorites" (star icon)
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,                         -- chip label
  type text NOT NULL CHECK (type IN ('income','expense','transfer')),
  amount_cents bigint,                        -- null = ask amount
  account_id uuid REFERENCES accounts(id),
  to_account_id uuid REFERENCES accounts(id),
  category_id uuid REFERENCES categories(id),
  title text NOT NULL DEFAULT '',
  note text,
  sort_order int NOT NULL DEFAULT 0,
  use_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE recurring_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('income','expense','transfer')),
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  account_id uuid NOT NULL REFERENCES accounts(id),
  to_account_id uuid REFERENCES accounts(id),
  category_id uuid REFERENCES categories(id),
  title text NOT NULL DEFAULT '',
  note text,
  frequency text NOT NULL CHECK (frequency IN ('daily','weekly','monthly','yearly')),
  interval smallint NOT NULL DEFAULT 1 CHECK (interval BETWEEN 1 AND 12),
  day_of_month smallint CHECK (day_of_month BETWEEN 1 AND 31),   -- monthly/yearly; 31 = last day if shorter
  weekday smallint CHECK (weekday BETWEEN 0 AND 6),              -- weekly
  month_of_year smallint CHECK (month_of_year BETWEEN 1 AND 12), -- yearly
  start_date date NOT NULL,
  end_date date,
  next_date date NOT NULL,
  auto_post boolean NOT NULL DEFAULT false,   -- false = shows "Due — Confirm/Skip"
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE recurring_occurrences (          -- idempotency + history
  rule_id uuid NOT NULL REFERENCES recurring_rules(id) ON DELETE CASCADE,
  due_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending','posted','skipped')),
  transaction_id uuid REFERENCES transactions(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (rule_id, due_date)
);

CREATE TABLE budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start date NOT NULL,                 -- start of the budget month (respects month_start_day)
  category_id uuid REFERENCES categories(id), -- NULL = overall budget
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (period_start, category_id)
);

CREATE TABLE import_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  mapping jsonb NOT NULL,
  rows_total int NOT NULL,
  rows_imported int NOT NULL,
  rows_skipped int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE transactions ADD COLUMN import_batch_id uuid REFERENCES import_batches(id) ON DELETE SET NULL;
```

Soft-deleted transactions (`deleted_at` not null) are ignored everywhere and purged after 30 days by the daily cron.

---

## 6. Security & Auth (single owner)

### 6.1 First-run setup
- If the `owner` table is empty, `/setup` is available **only with `?token=OWNER_SETUP_TOKEN`** (env). This prevents anyone else from claiming the app before you do.
- Setup form: name, email, PIN (6 digits) + confirm → create owner + settings → start session → `/onboarding`.
- After an owner exists, `/setup` always returns 404.

### 6.2 Sessions
- `iron-session` cookie `ledger_session` (httpOnly, secure, sameSite=strict, 30-day max age) containing `{ sv: session_version, unlockedAt, lastActiveAt }`.
- `requireUnlockedSession()` (used by every API route):
  - no cookie or `sv` ≠ owner.session_version → 401 `LOCKED`
  - `now - lastActiveAt > auto_lock_minutes` → 401 `LOCKED` (client shows `/lock`)
  - else update `lastActiveAt` (rolling; write the cookie at most once per minute)
- Client also locks itself: on `visibilitychange` hidden → start timer; on return after `auto_lock_minutes` → navigate to `/lock` and clear the in-memory query cache (persisted cache stays encrypted? No: see 6.5).

### 6.3 Unlock methods
- **PIN:** `POST /api/auth/unlock` `{pin}` → argon2 verify. Brute-force protection: after 5 failures, `locked_until = now + 30s`, doubling each further failure (max 1 hour); reset on success. Response while locked: 429 `TOO_MANY_ATTEMPTS` with `retryAfter`.
- **Passkey (Face ID / fingerprint):** register in Security settings (requires unlocked session + PIN re-entry). Unlock with `POST /api/auth/passkey/options` → browser `startAuthentication` → `POST /api/auth/passkey/verify`. RP ID = `APP_DOMAIN`. Store the challenge in a short-lived encrypted cookie.
- **Change PIN:** requires current PIN; bumps `session_version` (logs out other devices).
- **Lock now** button and "Log out all devices" (bump `session_version`).
- **Forgot PIN:** not recoverable in-app by design. README documents a manual reset: run `pnpm reset-pin` locally against the production DB (prompts for a new PIN).

### 6.4 Request protection
- All mutating route handlers check `Origin` equals `APP_URL` (CSRF) and require `Content-Type: application/json` (except import upload).
- Security headers via `next.config.ts` (`Content-Security-Policy`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, HSTS).
- `robots.txt` disallows all; `<meta name="robots" content="noindex">`.
- No third-party analytics or scripts.
- Cron routes require `Authorization: Bearer ${CRON_SECRET}` (Vercel sends this automatically when `CRON_SECRET` is set).

### 6.5 Local cache privacy
The persisted TanStack Query cache in IndexedDB contains financial data. Mitigation: persist only while unlocked, and on lock call `persister.removeClient()` **unless** the setting "Keep data cached on this device for faster opening" is on (default ON for the owner's own phone; the lock screen still blocks the UI). Document this trade-off in Settings → Security.

---

## 7. Core Domain Logic (`src/lib/domain`, pure + unit tested)

### 7.1 Balances (`balances.ts`)
Effect of a transaction on an account's balance:
| Type | account_id | to_account_id |
|---|---|---|
| income | +amount | — |
| expense | −amount | — |
| transfer | −amount | +amount |
| adjustment | +amount (signed) | — |

`balance(account, asOf) = opening_balance_cents + Σ effects of non-deleted transactions with occurred_at ≤ asOf` (and `local_date ≥ opening_date`).

SQL (server/accounts.ts) computes all balances in one query:
```sql
SELECT a.id,
       a.opening_balance_cents + COALESCE(SUM(e.delta), 0) AS balance_cents
FROM accounts a
LEFT JOIN (
  SELECT account_id AS acc,
         CASE type WHEN 'income' THEN amount_cents
                   WHEN 'expense' THEN -amount_cents
                   WHEN 'transfer' THEN -amount_cents
                   WHEN 'adjustment' THEN amount_cents END AS delta
  FROM transactions WHERE deleted_at IS NULL AND occurred_at <= $1
  UNION ALL
  SELECT to_account_id, amount_cents
  FROM transactions WHERE deleted_at IS NULL AND type = 'transfer' AND occurred_at <= $1
) e ON e.acc = a.id
GROUP BY a.id;
```
Running balance per row in account detail uses a window function over the same deltas ordered by `(occurred_at, id)`.

**Credit card sign convention:** balance is negative when money is owed. Display: "Owed Rs. 18,450.00" in red; Liabilities = Σ owed of credit cards (as positive). Assets = Σ positive balances of cash/bank accounts. Net worth = assets − liabilities. Accounts with `include_in_totals=false` are excluded from totals.

### 7.2 Periods (`periods.ts`)
- `month_start_day` (1–28) defines a "budget month". Example with 25: "Sep 2026" = Aug 25 – Sep 24. With 1: normal calendar months. The period is labeled by the month in which it ENDS.
- Functions: `getMonthRange(label, settings)`, `getWeekRanges(monthRange, week_start_day)` (weeks shown inside the Monthly tab, clipped to the month), `getYearRange`, `getPeriodForDate(date)`.
- All ranges are local dates, inclusive start, inclusive end.

### 7.3 Credit card cycles (`creditCard.ts`)
Inputs: `statement_day` (S), `due_day` (D), transactions, `today`.
- Statement closes on day S each month. Current cycle = (previous S + 1) → next S. Example S=20: Sep 21 – Oct 20.
- Due date for a statement closing on date C = the next date with day D **after** C (e.g. C=Oct 20, D=15 → Nov 15).
- **Statement balance** = amount owed at the last closed statement date (balance at end of day C, as positive owed; 0 if in credit).
- **Payments since statement** = Σ transfers INTO the card with `local_date > C`.
- **Amount due** = max(0, statement balance − payments since statement). Status: `paid` if 0, `due` if > 0 and today ≤ due date, `overdue` if > 0 and today > due date.
- **Current cycle spend** = Σ expenses on the card in the current cycle.
- **Available credit** = limit − current owed. **Utilization** = owed / limit.
- "Pay card" opens the add sheet in Transfer mode: from = default bank account, to = card, amount = amount due.

### 7.4 Recurrence (`recurrence.ts`)
- `nextOccurrence(rule, afterDate)`:
  - daily: + interval days
  - weekly: next date with `weekday`, stepping `interval` weeks
  - monthly: same `day_of_month` in month + interval; if the month is shorter → last day of that month (31 → Feb 28/29)
  - yearly: `month_of_year` + `day_of_month`, same shorter-month rule
- Stops when `next_date > end_date`.

### 7.5 Calculator (`calc.ts`)
- Keypad input like `1200+450×2` → evaluated with a tiny tokenizer + shunting-yard parser (NO `eval`/`Function`). Supports `+ − × ÷`, decimals (max 2 places per number), operator precedence. Result rounded half-up to cents. Division by zero → invalid. Result must be > 0 for income/expense/transfer.
- The amount display shows the expression and the live result ("1200+450×2 = 2,100.00").

### 7.6 Money (`money.ts`)
`formatCents(14014_13) → "Rs. 14,014.13"` (Intl `en-LK`, 2 decimals, currency symbol from settings), `parseAmount("1,234.5") → 123450`, compact format for calendar cells ("14.0K" only when width is tight).

---

## 8. Feature Flows

### 8.1 Onboarding
1. Accounts step: starts EMPTY with an "Add account" button; the owner creates each account manually (name, type, starting balance). Optional one-tap suggestion chips (Wallet, Bank account, Credit card) only prefill the type and a placeholder name. Each account row is editable with **current balance** (for the card: "Amount currently owed", stored as negative opening balance), limit, statement day, due day. Opening date = today. Add/remove rows.
2. Categories step: default expense categories (🍜 Food, 🚕 Transport, 👫 Social Life, 📈 Career, 🧥 Apparel, 📱 Data, 🧾 Bills, 💊 Health, 🎁 Gifts, 🏠 Home, 📦 Other) and income (💼 Salary, 🎁 Allowance, 🏆 Bonus, 💰 Other). Toggle, rename, reorder.
3. Preferences: month start day, week start, default account. → `onboarded_at`.

### 8.2 Add / edit transaction (the most-used flow; must feel instant)
1. FAB opens `AddSheet` (vaul drawer, full height on mobile, dialog on desktop). Type defaults to Expense; last used account preselected (else default account).
2. Template chips at the top (sorted by `use_count`). Tap → prefill; if the template has an amount the Save button is immediately enabled.
3. Amount via `CalcKeypad`; category via `CategoryGrid` (recent 6 first); account via `AccountPicker` (shows balances); date chips Today/Yesterday + date-time picker; title (with autocomplete from past titles for that category); note (autocomplete from past notes).
4. Transfer mode: from/to pickers (swap button), optional fee → saved as a separate `expense` (category "Bank charges", auto-created) with the same `transfer_group_id`.
5. Save: client generates UUID v7 → optimistic insert into cached lists and balances → `POST /api/transactions`. On network failure → stored in outbox (Section 8.9) and shown with a small "pending sync" dot.
6. "Save & add another" keeps type/account/date and resets amount/category/title.
7. Edit: same sheet; `PATCH`. Delete: soft delete with a 6-second "Undo" toast (`POST /api/transactions/:id/restore`).

### 8.3 Transactions tabs (all respect `month_start_day`)
- **Daily:** day groups for the selected month (newest first), infinite within the month, month switcher. Summary strip = month income, expense, net (transfers and adjustments excluded from income/expense).
- **Calendar:** grid of the month with per-day income/expense/net; tap → day sheet.
- **Monthly:** selected year, 12 period rows with totals; current (or tapped) month expands into week rows; the current week is highlighted.
- **Summary:** overall + category budgets for the month, compare expenses vs last month (%), expenses split by cash/bank vs credit card, transfers total, Export month to Excel.
- **Notes:** group the month's transactions by exact `note` text (non-empty), count + totals per group, tap → list.

### 8.4 Stats
- Period: weekly/monthly/yearly/custom; type toggle income/expense.
- Category breakdown query groups by category with totals + percentages (percent pill rounded, list sorted desc). Donut uses category colors (muted palette assigned at creation).
- Category detail: last 6 periods bars + average + transaction list.
- Trends: 12 months income vs expense lines; net worth line = end-of-month balances sum (computed server-side with the balance query per month end; cache 1 hour in memory per request key).

### 8.5 Accounts
- List grouped by type with subtotals, header strip (assets, liabilities, net worth).
- Detail: balance, 90-day balance line chart, month in/out, running-balance list (paginated 50), actions.
- **Adjust balance:** user types the balance they actually have (e.g. after counting their wallet cash or checking their passbook/statement) → server computes the difference → creates an `adjustment` transaction (title "Balance adjustment", note optional). If difference is 0 → toast "Already matches".
- Archive account: only if balance is 0 (else prompt to transfer out or adjust). Archived accounts hidden from pickers but kept in history.

### 8.6 Budgets
- Per budget month: overall (category NULL) and per-category amounts. `Copy from last month`.
- Spent = expenses in the month range for that category (overall = all expenses). Remaining, % used, days left, daily allowance (`remaining / days left`).
- Colors: < 80% neutral, 80–100% amber, > 100% red.

### 8.7 Recurring
- Daily cron `/api/cron/daily` (runs 00:30 Asia/Colombo = 19:00 UTC previous day) AND a lazy check on app open (`POST /api/recurring/process`, idempotent) so posting doesn't depend on cron timing:
  - For each active rule with `next_date ≤ today`: for each due date up to today (max 31 backfill): insert `recurring_occurrences` (ON CONFLICT DO NOTHING). If `auto_post` → create the transaction (deterministic id: UUID v5 of `rule_id + due_date`) and mark `posted`. Else leave `pending`. Advance `next_date`.
- Transactions screen shows pending occurrences as cards: "Due today: Mobile data Rs. 300 — Confirm / Edit / Skip".

### 8.8 Search
`GET /api/transactions/search` with `q` (full-text + ILIKE fallback on title/note), date range, types, accounts, categories, min/max amount. Results with totals (income, expense). Recent searches stored in localStorage.

### 8.9 Offline outbox (`lib/outbox.ts`)
- Only **create transaction** works offline (edits/deletes require online, buttons disabled with tooltip).
- Outbox stores the full POST body with the client UUID. Flush on `online` event, on app focus, and every 30s while pending. Server insert is `ON CONFLICT (id) DO NOTHING` → safe replay.
- Offline banner: "Offline — 2 changes will sync".

### 8.10 Import (from the old Money Manager app or any CSV/XLSX)
1. Upload .xlsx or .csv (max 5 MB) on `/more/import`.
2. Server parses the first sheet → returns headers + first 20 rows.
3. Mapping UI: map columns → Date, Time (optional), Account, Category, Title/Note, Description, Amount, Type (or "sign of amount"), To account (for transfers). Map type values (e.g. "Exp." → expense, "Income" → income, "Transfer-Out"/"Transfer-In" → transfer). Map unknown account names → existing accounts (or create), unknown categories → existing (or create with 📦).
4. Preview: first 50 converted rows + summary (counts per type, date range, rows with errors).
5. Import in one DB transaction in chunks of 500. `import_hash = sha256(date|amount|account|category|title)` prevents duplicates on re-import. Transfer pairs (out + in rows) are merged into one transfer when date, amount, and accounts match; unmatched halves are imported as expense/income with a warning.
6. Save `import_batches`; "Undo import" deletes that batch's transactions (within 7 days).
7. After import, show computed balances next to "Actual balance?" inputs the owner can fill in manually → offer adjustments to reconcile.

### 8.11 Export & backup
- **Export Excel** (`GET /api/export/xlsx?from&to`): sheets Transactions (date, type, account, to account, category, title, note, amount), Accounts (balances at `to`), Categories summary.
- **Full backup** (`GET /api/backup/json`): all tables (excluding pin/passkeys) with schema version.
- **Weekly email backup** (`/api/cron/weekly-backup`, Sundays): builds JSON (gzipped) + xlsx, emails both to `owner.email` via Resend, updates `last_backup_at`. If it fails, the app shows a banner "Last backup failed" on next open.
- **Restore** (`POST /api/backup/restore`): upload JSON → validate schema version → requires PIN re-entry → in one transaction: delete all data tables, insert backup rows → report counts.

---

## 9. API (Route Handlers under `/api`)

### 9.1 Conventions
- Error: `{"error":{"code":"VALIDATION_ERROR","message":"...","details":{}}}`. Codes: `VALIDATION_ERROR` 400, `LOCKED` 401, `NOT_FOUND` 404, `CONFLICT` 409, `TOO_MANY_ATTEMPTS` 429, `INTERNAL_ERROR` 500.
- Money fields `*_cents` (integers). Dates `YYYY-MM-DD` (local), instants ISO 8601.
- Lists paginate with `cursor` (`occurred_at,id`) + `limit` (max 200).

### 9.2 Endpoints
| Area | Method & path |
|---|---|
| Setup/Auth | `POST /api/setup`, `POST /api/auth/unlock`, `POST /api/auth/lock`, `GET /api/auth/status`, `POST /api/auth/passkey/register/options`, `POST /api/auth/passkey/register/verify`, `POST /api/auth/passkey/options`, `POST /api/auth/passkey/verify`, `GET/DELETE /api/auth/passkeys/:id`, `POST /api/auth/change-pin`, `POST /api/auth/logout-all` |
| Settings | `GET/PATCH /api/settings`, `POST /api/onboarding/complete` |
| Accounts | `GET /api/accounts` (with balances + card summaries), `POST /api/accounts`, `GET/PATCH /api/accounts/:id`, `POST /api/accounts/:id/archive`, `POST /api/accounts/reorder`, `GET /api/accounts/:id/transactions?cursor` (running balance), `GET /api/accounts/:id/balance-history?days=90`, `POST /api/accounts/:id/adjust` `{actual_balance_cents, note?}`, `GET /api/accounts/:id/card-summary` |
| Categories | `GET /api/categories`, `POST`, `PATCH /:id`, `POST /api/categories/reorder` |
| Transactions | `GET /api/transactions?from&to` (day-grouped for Daily), `POST /api/transactions`, `GET/PATCH/DELETE /api/transactions/:id`, `POST /api/transactions/:id/restore`, `POST /api/transactions/:id/duplicate`, `GET /api/transactions/search`, `GET /api/transactions/suggest?field=title\|note&category_id&q` |
| Views | `GET /api/views/summary-strip?month`, `GET /api/views/calendar?month`, `GET /api/views/monthly?year`, `GET /api/views/summary?month`, `GET /api/views/notes?month` |
| Stats | `GET /api/stats/categories?type&from&to`, `GET /api/stats/category/:id?periods=6&granularity=month`, `GET /api/stats/trends?year` |
| Budgets | `GET /api/budgets?month`, `PUT /api/budgets?month` (full set), `POST /api/budgets/copy-last?month` |
| Templates | CRUD `/api/templates`, `POST /api/templates/:id/used` |
| Recurring | CRUD `/api/recurring`, `POST /api/recurring/process`, `GET /api/recurring/pending`, `POST /api/recurring/occurrences/:ruleId/:date/confirm` (optional edited body), `.../skip` |
| Import | `POST /api/import/parse` (multipart), `POST /api/import/preview`, `POST /api/import/commit`, `DELETE /api/import/:batchId` |
| Export/Backup | `GET /api/export/xlsx`, `GET /api/backup/json`, `POST /api/backup/restore` |
| Photos (Phase 10) | `POST /api/photos/presign`, `GET /api/photos/:key` (redirect to short-lived signed GET) |
| Cron | `GET /api/cron/daily`, `GET /api/cron/weekly-backup` |
| Health | `GET /api/health` (db ping; no auth, returns only `{ok}`) |

---

## 10. Frontend

### 10.1 Design tokens (`globals.css`)
```css
:root[data-theme="dark"] {
  --bg: #0b0b0c; --surface: #151517; --raised: #1d1d20; --divider: #26262a;
  --text: #f4f4f5; --text-2: #a1a1aa; --text-3: #71717a;
  --income: #4c8dff; --expense: #ff5a5f; --transfer: #a1a1aa;
  --accent: #ff5a5f; --warn: #f5a524; --danger: #ff5a5f; --success: #3fb97f;
}
:root[data-theme="light"] {
  --bg: #ffffff; --surface: #f5f5f5; --raised: #ffffff; --divider: #e5e5e5;
  --text: #0a0a0a; --text-2: #52525b; --text-3: #a1a1aa;
  --income: #2563eb; --expense: #e5484d; --transfer: #71717a;
  --accent: #e5484d; --warn: #d97706; --danger: #e5484d; --success: #16a34a;
}
body { font-family: ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Inter", "Noto Sans Sinhala", "Segoe UI", sans-serif; }
.amount { font-variant-numeric: tabular-nums; }
```
Load "Noto Sans Sinhala" from Google Fonts (subset, `display: swap`) so Sinhala account names render everywhere. Theme stored in settings + cookie for SSR (no flash).

### 10.2 Layout
- Mobile (< 1024px): bottom tab bar (Transactions, Stats, Accounts, More), FAB, safe-area insets (`env(safe-area-inset-*)`), 390px baseline.
- Desktop: left sidebar + content with two columns on Transactions (list + selected transaction/day detail) and Accounts (list + detail).
- URL holds view state (`?tab=calendar&month=2026-09`) so back/forward and refresh work.

### 10.3 Performance requirements
- App shell + last viewed data visible in < 300 ms on repeat opens (persisted cache).
- Adding a transaction updates the list and balances instantly (optimistic).
- Prefetch adjacent months when switching months.
- Lighthouse PWA installable; mobile performance ≥ 90.

### 10.4 Keyboard (desktop)
`N` new transaction, `/` search, `←/→` previous/next month, `1–5` switch tabs, `Esc` close sheet.

---

## 11. Vercel & Neon Setup (document in README)
1. Create a Neon project in AWS Singapore; copy the **pooled** connection string → `DATABASE_URL`.
2. Create the Vercel project from the GitHub repo; set Function Region to Singapore (`sin1`) or the nearest available; add env vars (Section 14).
3. `vercel.json`:
```json
{
  "regions": ["sin1"],
  "crons": [
    { "path": "/api/cron/daily", "schedule": "0 19 * * *" },
    { "path": "/api/cron/weekly-backup", "schedule": "30 19 * * 6" }
  ]
}
```
(19:00 UTC = 00:30 Asia/Colombo next day; Saturday 19:30 UTC = Sunday 01:00 Colombo.)
4. Run migrations from your machine: `pnpm db:migrate` with the production `DATABASE_URL` (or a GitHub Action on main).
5. Open `https://your-app.vercel.app/setup?token=OWNER_SETUP_TOKEN` once to create the owner.
6. Install to home screen (Safari: Share → Add to Home Screen; Chrome: Install app).
7. Keep Neon storage in mind: 0.5 GB free is enough for many years of personal transactions; receipt photos go to R2, never to Postgres.

---

## 12. Seed Data (dev only, `pnpm db:seed`)
Owner PIN `123456`; the 5 accounts from Section 1.1 with opening balances; default categories; ~9 months of realistic transactions (salary on the 25th, groceries at Keells/Cargills, fuel, mobile data, dinners, a course purchase, transfers from People's to the credit card monthly, a few "From akka" incomes); 3 templates; 3 recurring rules (Mobile data monthly on the 5th, Netflix monthly, Loan installment monthly); budgets for the current month; a note group "Trip to Ella".

---

## 13. Testing Plan
- **Unit (Vitest, pure domain):** `calc` (precedence, decimals, invalid input, rounding), `money` format/parse, `periods` (month_start_day 1 and 25, week clipping, year boundaries, leap years), `balances` (all types), `creditCard` (cycle boundaries, due date across month/year end, payments reducing due, overdue, in-credit card), `recurrence` (31st → Feb, weekly interval, yearly, end date), `importMapping` (type mapping, transfer pairing, dedupe hash).
- **API (Vitest + Docker Postgres):** setup token guard, PIN lockout timing, session expiry/auto-lock, `session_version` logout-all, transaction CRUD + CHECK constraints, idempotent create (same id twice), balances query vs domain function on random data (property test), adjust balance, recurring processing idempotent (run twice → one transaction), budgets copy, import commit + undo, backup → restore round-trip equality.
- **E2E (Playwright, iPhone 13 viewport):** setup → onboarding → add expense with keypad expression → appears in Daily + balance updates → transfer to card → card summary amount due drops → calendar shows totals → stats donut shows category → lock after inactivity → unlock with PIN → offline add (context.setOffline) → back online → synced.
- CI: GitHub Actions with Postgres service; lint, typecheck, tests, build.

---

## 14. Environment Variables (`.env.example`)
```bash
APP_URL=http://localhost:3000
APP_DOMAIN=localhost                     # WebAuthn RP ID (prod: your-app.vercel.app or custom domain)
DATABASE_URL=postgres://ledger:ledger@localhost:5432/ledger
DB_DRIVER=node-postgres                  # prod: neon-serverless
SESSION_PASSWORD=at-least-32-characters-random
OWNER_SETUP_TOKEN=long-random-token
CRON_SECRET=long-random-token

# Backups
RESEND_API_KEY=
BACKUP_FROM_EMAIL=Ledger <backup@yourdomain.com>   # or Resend's test sender for personal use

# Optional receipt photos (Phase 10)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=ledger-receipts
```
Validate env at startup with zod (`src/env.ts`); fail fast with a clear message.

---

## 15. Scripts
`dev`, `build`, `db:generate`, `db:migrate`, `db:seed`, `db:studio`, `test`, `test:e2e`, `lint`, `typecheck`, `reset-pin` (CLI prompt → updates `owner.pin_hash`, bumps `session_version`).

---

## 16. Build Phases (follow in order)

### Phase 1: Foundation
Next.js app, Tailwind tokens + dark/light theme, shadcn setup, Docker Postgres, Drizzle schema + first migration (all tables), env validation, db client with driver switch, error helper, `/api/health`, app shell (tab bar, sidebar, FAB, month switcher) with placeholder pages.
**Done when:** app runs locally, migrations apply cleanly, shell looks right at 390px and 1280px in both themes.

### Phase 2: Security
Setup with token, PIN unlock + lockout, iron-session + auto-lock (server + client), lock screen with PinPad, passkey registration + unlock, change PIN, logout-all, `requireUnlockedSession` on all routes, security headers, noindex.
**Done when:** API returns 401 when locked, 5 wrong PINs trigger the delay, Face ID/fingerprint unlock works on a phone (via HTTPS tunnel or preview deploy).

### Phase 3: Accounts, categories, onboarding
Accounts CRUD with balances query, categories management, onboarding wizard, Accounts screen (groups, totals), account form with credit card fields.
**Done when:** onboarding creates the 5 accounts and the Accounts screen shows correct net worth.

### Phase 4: Transactions core
`calc.ts` + CalcKeypad, AddSheet (income/expense/transfer + fee), templates, create/edit/delete/undo/duplicate, optimistic updates, Daily tab with day groups and summary strip, transaction detail, title/note suggestions.
**Done when:** adding a transaction takes under 5 seconds by hand and balances update instantly.

### Phase 5: Views & search
Calendar, Monthly (with weeks), Notes tabs, `month_start_day` support everywhere, search with filters.
**Done when:** totals match across Daily, Calendar, and Monthly for the same month (tested with seed data).

### Phase 6: Stats & budgets
Category stats + donut, category detail, trends (income vs expense, net worth), budgets (overall + categories, copy last month), Summary tab.
**Done when:** stats and budgets match manual calculations on seed data.

### Phase 7: Account detail & credit card
Running balance list, balance chart, adjust balance, archive, card cycle logic + card summary UI + "Pay card" prefilled transfer.
**Done when:** credit card unit tests pass and the card screen shows the correct statement balance, amount due, and due date for seed data.

### Phase 8: Recurring
Rules CRUD, recurrence logic, daily cron + lazy processing, pending cards with confirm/edit/skip.
**Done when:** a monthly rule on the 31st posts correctly in February, and running processing twice creates only one transaction.

### Phase 9: Import, export, backup
Import wizard (parse, mapping, preview, commit, undo, reconcile), Excel export, JSON backup/restore, weekly email backup cron, backup status in Settings.
**Done when:** an export from the old app imports with matching monthly totals, and backup → restore round-trips exactly.

### Phase 10: PWA, offline, photos, deploy
Serwist service worker + manifest + offline page, persisted query cache, outbox, offline banner, optional R2 receipt photos with client compression, Lighthouse pass, Vercel + Neon production setup (Section 11), README.
**Done when:** the app is installed on your phone, opens instantly, adds a transaction in airplane mode, syncs when back online, and the first weekly backup email arrives.

---

## 17. README Must Include
1. What it is and screenshots (mobile + desktop, dark + light)
2. Architecture (Section 3) and why it costs $0/month
3. Setup: Neon + Vercel + env vars + migrations + first-run `/setup?token=` + installing the PWA
4. Security model (PIN + passkey, lockout, auto-lock, setup token, local cache trade-off)
5. How balances and credit card cycles are calculated (Sections 7.1 and 7.3)
6. Backup & restore instructions, and the manual `reset-pin` procedure
7. Importing from the old Money Manager app (export to Excel there, then the import wizard here)
