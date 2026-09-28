import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  customType,
  check,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const instant = (name: string) =>
  timestamp(name, { withTimezone: true, mode: "date" });
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "bytea",
});

export const owners = pgTable(
  "owner",
  {
    id: smallint("id").primaryKey().default(1),
    name: text("name").notNull(),
    email: text("email").notNull(),
    pinHash: text("pin_hash").notNull(),
    failedPinAttempts: integer("failed_pin_attempts").notNull().default(0),
    lockedUntil: instant("locked_until"),
    sessionVersion: integer("session_version").notNull().default(1),
    createdAt: instant("created_at").notNull().defaultNow(),
    updatedAt: instant("updated_at").notNull().defaultNow(),
  },
  (table) => [check("owner_singleton_check", sql`${table.id} = 1`)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    last4: text("last4"),
    color: text("color").notNull().default("#4c8dff"),
    icon: text("icon").notNull().default("wallet"),
    openingBalanceCents: bigint("opening_balance_cents", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    openingDate: date("opening_date", { mode: "string" }).notNull(),
    includeInTotals: boolean("include_in_totals").notNull().default(true),
    creditLimitCents: bigint("credit_limit_cents", { mode: "bigint" }),
    statementDay: smallint("statement_day"),
    dueDay: smallint("due_day"),
    sortOrder: integer("sort_order").notNull().default(0),
    archivedAt: instant("archived_at"),
    createdAt: instant("created_at").notNull().defaultNow(),
    updatedAt: instant("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "accounts_type_check",
      sql`${table.type} IN ('cash', 'bank', 'credit_card')`,
    ),
    check(
      "accounts_last4_check",
      sql`${table.last4} IS NULL OR ${table.last4} ~ '^[0-9]{4}$'`,
    ),
    check(
      "accounts_credit_card_fields_check",
      sql`${table.type} <> 'credit_card' OR (${table.creditLimitCents} IS NOT NULL AND ${table.statementDay} IS NOT NULL AND ${table.statementDay} BETWEEN 1 AND 28 AND ${table.dueDay} IS NOT NULL AND ${table.dueDay} BETWEEN 1 AND 28)`,
    ),
    check(
      "accounts_statement_day_check",
      sql`${table.statementDay} IS NULL OR ${table.statementDay} BETWEEN 1 AND 28`,
    ),
    check(
      "accounts_due_day_check",
      sql`${table.dueDay} IS NULL OR ${table.dueDay} BETWEEN 1 AND 28`,
    ),
  ],
);

export const settings = pgTable(
  "settings",
  {
    id: smallint("id").primaryKey().default(1),
    timezone: text("timezone").notNull().default("Asia/Colombo"),
    currencySymbol: text("currency_symbol").notNull().default("Rs."),
    monthStartDay: smallint("month_start_day").notNull().default(1),
    weekStartDay: smallint("week_start_day").notNull().default(0),
    defaultAccountId: uuid("default_account_id").references(() => accounts.id, {
      onDelete: "set null",
    }),
    autoLockMinutes: smallint("auto_lock_minutes").notNull().default(5),
    theme: text("theme").notNull().default("dark"),
    weeklyBackupEnabled: boolean("weekly_backup_enabled")
      .notNull()
      .default(true),
    lastBackupAt: instant("last_backup_at"),
    onboardedAt: instant("onboarded_at"),
    updatedAt: instant("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check("settings_singleton_check", sql`${table.id} = 1`),
    check(
      "settings_month_start_day_check",
      sql`${table.monthStartDay} BETWEEN 1 AND 28`,
    ),
    check(
      "settings_week_start_day_check",
      sql`${table.weekStartDay} IN (0, 1)`,
    ),
    check(
      "settings_theme_check",
      sql`${table.theme} IN ('dark', 'light', 'system')`,
    ),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kind: text("kind").notNull(),
    name: text("name").notNull(),
    emoji: text("emoji").notNull().default("📦"),
    color: text("color").notNull().default("#a1a1aa"),
    sortOrder: integer("sort_order").notNull().default(0),
    hidden: boolean("hidden").notNull().default(false),
    createdAt: instant("created_at").notNull().defaultNow(),
  },
  (table) => [
    check("categories_kind_check", sql`${table.kind} IN ('income', 'expense')`),
    unique("categories_kind_name_unique").on(table.kind, table.name),
  ],
);

export const recurringRules = pgTable(
  "recurring_rules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    amountCents: bigint("amount_cents", { mode: "bigint" }).notNull(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id),
    toAccountId: uuid("to_account_id").references(() => accounts.id),
    categoryId: uuid("category_id").references(() => categories.id),
    title: text("title").notNull().default(""),
    note: text("note"),
    frequency: text("frequency").notNull(),
    interval: smallint("interval").notNull().default(1),
    dayOfMonth: smallint("day_of_month"),
    weekday: smallint("weekday"),
    monthOfYear: smallint("month_of_year"),
    startDate: date("start_date", { mode: "string" }).notNull(),
    endDate: date("end_date", { mode: "string" }),
    nextDate: date("next_date", { mode: "string" }).notNull(),
    autoPost: boolean("auto_post").notNull().default(false),
    active: boolean("active").notNull().default(true),
    createdAt: instant("created_at").notNull().defaultNow(),
    updatedAt: instant("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "recurring_rules_type_check",
      sql`${table.type} IN ('income', 'expense', 'transfer')`,
    ),
    check("recurring_rules_amount_check", sql`${table.amountCents} > 0`),
    check(
      "recurring_rules_frequency_check",
      sql`${table.frequency} IN ('daily', 'weekly', 'monthly', 'yearly')`,
    ),
    check(
      "recurring_rules_interval_check",
      sql`${table.interval} BETWEEN 1 AND 12`,
    ),
    check(
      "recurring_rules_day_of_month_check",
      sql`${table.dayOfMonth} IS NULL OR ${table.dayOfMonth} BETWEEN 1 AND 31`,
    ),
    check(
      "recurring_rules_weekday_check",
      sql`${table.weekday} IS NULL OR ${table.weekday} BETWEEN 0 AND 6`,
    ),
    check(
      "recurring_rules_month_of_year_check",
      sql`${table.monthOfYear} IS NULL OR ${table.monthOfYear} BETWEEN 1 AND 12`,
    ),
  ],
);

export const importBatches = pgTable("import_batches", {
  id: uuid("id").primaryKey().defaultRandom(),
  filename: text("filename").notNull(),
  mapping: jsonb("mapping").$type<Record<string, string>>().notNull(),
  rowsTotal: integer("rows_total").notNull(),
  rowsImported: integer("rows_imported").notNull(),
  rowsSkipped: integer("rows_skipped").notNull(),
  createdAt: instant("created_at").notNull().defaultNow(),
});

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey(),
    type: text("type").notNull(),
    amountCents: bigint("amount_cents", { mode: "bigint" }).notNull(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id),
    toAccountId: uuid("to_account_id").references(() => accounts.id),
    categoryId: uuid("category_id").references(() => categories.id),
    title: text("title").notNull().default(""),
    note: text("note"),
    occurredAt: instant("occurred_at").notNull(),
    localDate: date("local_date", { mode: "string" }).notNull(),
    transferGroupId: uuid("transfer_group_id"),
    recurringRuleId: uuid("recurring_rule_id").references(
      () => recurringRules.id,
    ),
    photoKey: text("photo_key"),
    importHash: text("import_hash").unique(),
    importBatchId: uuid("import_batch_id").references(() => importBatches.id, {
      onDelete: "set null",
    }),
    createdAt: instant("created_at").notNull().defaultNow(),
    updatedAt: instant("updated_at").notNull().defaultNow(),
    deletedAt: instant("deleted_at"),
  },
  (table) => [
    check(
      "transactions_type_check",
      sql`${table.type} IN ('income', 'expense', 'transfer', 'adjustment')`,
    ),
    check(
      "transactions_shape_check",
      sql`(
        (${table.type} IN ('income', 'expense') AND ${table.amountCents} > 0 AND ${table.categoryId} IS NOT NULL AND ${table.toAccountId} IS NULL) OR
        (${table.type} = 'transfer' AND ${table.amountCents} > 0 AND ${table.toAccountId} IS NOT NULL AND ${table.toAccountId} <> ${table.accountId} AND ${table.categoryId} IS NULL) OR
        (${table.type} = 'adjustment' AND ${table.amountCents} <> 0 AND ${table.toAccountId} IS NULL AND ${table.categoryId} IS NULL)
      )`,
    ),
    index("tx_local_date")
      .on(table.localDate.desc())
      .where(sql`${table.deletedAt} IS NULL`),
    index("tx_account")
      .on(table.accountId, table.occurredAt)
      .where(sql`${table.deletedAt} IS NULL`),
    index("tx_to_account")
      .on(table.toAccountId, table.occurredAt)
      .where(sql`${table.deletedAt} IS NULL`),
    index("tx_category")
      .on(table.categoryId, table.localDate)
      .where(sql`${table.deletedAt} IS NULL`),
    index("tx_search").using(
      "gin",
      sql`to_tsvector('simple', ${table.title} || ' ' || coalesce(${table.note}, ''))`,
    ),
  ],
);

export const passkeys = pgTable("passkeys", {
  id: text("id").primaryKey(),
  publicKey: bytea("public_key").notNull(),
  counter: bigint("counter", { mode: "bigint" })
    .notNull()
    .default(sql`0`),
  transports: text("transports").array(),
  deviceName: text("device_name").notNull(),
  lastUsedAt: instant("last_used_at"),
  createdAt: instant("created_at").notNull().defaultNow(),
});

export const templates = pgTable(
  "templates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    amountCents: bigint("amount_cents", { mode: "bigint" }),
    accountId: uuid("account_id").references(() => accounts.id),
    toAccountId: uuid("to_account_id").references(() => accounts.id),
    categoryId: uuid("category_id").references(() => categories.id),
    title: text("title").notNull().default(""),
    note: text("note"),
    sortOrder: integer("sort_order").notNull().default(0),
    useCount: integer("use_count").notNull().default(0),
    createdAt: instant("created_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "templates_type_check",
      sql`${table.type} IN ('income', 'expense', 'transfer')`,
    ),
  ],
);

export const recurringOccurrences = pgTable(
  "recurring_occurrences",
  {
    ruleId: uuid("rule_id")
      .notNull()
      .references(() => recurringRules.id, { onDelete: "cascade" }),
    dueDate: date("due_date", { mode: "string" }).notNull(),
    status: text("status").notNull(),
    transactionId: uuid("transaction_id").references(() => transactions.id),
    createdAt: instant("created_at").notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.ruleId, table.dueDate] }),
    check(
      "recurring_occurrences_status_check",
      sql`${table.status} IN ('pending', 'posted', 'skipped')`,
    ),
  ],
);

export const budgets = pgTable(
  "budgets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    periodStart: date("period_start", { mode: "string" }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id),
    amountCents: bigint("amount_cents", { mode: "bigint" }).notNull(),
    createdAt: instant("created_at").notNull().defaultNow(),
  },
  (table) => [
    check("budgets_amount_check", sql`${table.amountCents} > 0`),
    uniqueIndex("budgets_overall_period_unique")
      .on(table.periodStart)
      .where(sql`${table.categoryId} IS NULL`),
    uniqueIndex("budgets_category_period_unique")
      .on(table.periodStart, table.categoryId)
      .where(sql`${table.categoryId} IS NOT NULL`),
  ],
);
