# Ledger Build Rules

## Project rules

- Build one phase at a time from Section 16 of `06-ledger-personal-money-manager.md`; do not begin the next phase until the current phase's completion checklist passes.
- Keep this as one Next.js app with UI, route handlers, and Neon Postgres. Do not add a separate backend.
- Store money as integer cents (`bigint`, `_cents` suffix); never use floating-point arithmetic for amounts.
- Never store account balances. Compute them from opening balances and transactions.
- Use the owner's timezone (`Asia/Colombo` by default); store instants as `timestamptz` and include `local_date` for grouping.
- Generate transaction IDs on the client with UUID v7 and make creates idempotent.
- All route handlers and server actions must require an unlocked session, except authentication and cron routes.
- Use strict TypeScript, Zod input validation, and no `any`.
- Keep pure business rules in `src/lib/domain/` with unit tests.
- Load secrets only from environment variables.
- Ledger is single-user and manual-only. Never add bank APIs, scraping, SMS parsing, or bank sync.

## Fixed stack

- App: Next.js 15 App Router and TypeScript, deployed as one Vercel app.
- Hosting: Vercel Hobby, function region Singapore (`sin1`) or closest available.
- Database: Neon Postgres free plan in AWS Singapore (`ap-southeast-1`).
- ORM: Drizzle ORM and drizzle-kit; use `drizzle-orm/neon-serverless` in production and `drizzle-orm/node-postgres` for local Docker Postgres, selected by `DB_DRIVER`.
- UI: Tailwind CSS 4, shadcn/ui, lucide-react, vaul, and sonner.
- Charts: recharts.
- Client data: TanStack Query v5 with persisted cache and IndexedDB outbox.
- Forms and validation: react-hook-form and Zod.
- Dates: date-fns and date-fns-tz.
- Authentication: Argon2id PIN, WebAuthn passkeys, and iron-session encrypted cookies.
- PWA: `@serwist/next`.
- Spreadsheet/CSV: exceljs and papaparse.
- Email: Resend for weekly backups.
- Optional receipts: Cloudflare R2; client-compressed WebP files up to 300 KB.
- Tests: Vitest for domain/API and Playwright for E2E.
- Local database: Docker Compose with Postgres 16 only.

The full requirements, tables, routes, environment variables, and build phases are in `06-ledger-personal-money-manager.md`.
