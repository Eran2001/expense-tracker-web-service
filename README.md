# Ledger

Ledger is a private, single-owner personal money manager. It is manual-only: account names are labels, and there are no bank or payment-service connections.

## Local development

Requirements: Node.js and Docker Compose.

1. Install packages with `npm install`.
2. Copy `.env.example` to `.env.local` and replace the setup/session secrets with random values. Keep `DATABASE_URL` pointed at the local Postgres instance and `DB_DRIVER=node-postgres`.
3. Start Postgres with `docker compose up -d`.
4. Apply migrations with `npm run db:migrate`.
5. Start Next.js with `npm run dev` and open `http://localhost:3000`.

The database health endpoint is `http://localhost:3000/api/health`. Migration SQL is kept in `src/db/migrations/` and is generated from `src/db/schema.ts` with `npm run db:generate`.

## Checks

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Neon and Vercel

Create a Neon Postgres database in AWS Singapore and use its pooled connection URL as `DATABASE_URL`. Set `DB_DRIVER=neon-serverless`, configure the remaining variables from `.env.example` in Vercel, then run `DATABASE_URL='your-neon-url' npm run db:migrate`. Vercel's configured function region and cron schedules are in `vercel.json`.

Never commit `.env.local` or production secrets. The current screen is a presentation shell with sample data; persistent transaction flows and authentication are being implemented phase by phase from `06-ledger-personal-money-manager.md`.
