CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"last4" text,
	"color" text DEFAULT '#4c8dff' NOT NULL,
	"icon" text DEFAULT 'wallet' NOT NULL,
	"opening_balance_cents" bigint DEFAULT 0 NOT NULL,
	"opening_date" date NOT NULL,
	"include_in_totals" boolean DEFAULT true NOT NULL,
	"credit_limit_cents" bigint,
	"statement_day" smallint,
	"due_day" smallint,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"archived_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_type_check" CHECK ("accounts"."type" IN ('cash', 'bank', 'credit_card')),
	CONSTRAINT "accounts_last4_check" CHECK ("accounts"."last4" IS NULL OR "accounts"."last4" ~ '^[0-9]{4}$'),
	CONSTRAINT "accounts_credit_card_fields_check" CHECK ("accounts"."type" <> 'credit_card' OR ("accounts"."credit_limit_cents" IS NOT NULL AND "accounts"."statement_day" BETWEEN 1 AND 28 AND "accounts"."due_day" BETWEEN 1 AND 28)),
	CONSTRAINT "accounts_statement_day_check" CHECK ("accounts"."statement_day" IS NULL OR "accounts"."statement_day" BETWEEN 1 AND 28),
	CONSTRAINT "accounts_due_day_check" CHECK ("accounts"."due_day" IS NULL OR "accounts"."due_day" BETWEEN 1 AND 28)
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"period_start" date NOT NULL,
	"category_id" uuid,
	"amount_cents" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "budgets_amount_check" CHECK ("budgets"."amount_cents" > 0)
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kind" text NOT NULL,
	"name" text NOT NULL,
	"emoji" text DEFAULT '📦' NOT NULL,
	"color" text DEFAULT '#a1a1aa' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_kind_name_unique" UNIQUE("kind","name"),
	CONSTRAINT "categories_kind_check" CHECK ("categories"."kind" IN ('income', 'expense'))
);
--> statement-breakpoint
CREATE TABLE "import_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"mapping" jsonb NOT NULL,
	"rows_total" integer NOT NULL,
	"rows_imported" integer NOT NULL,
	"rows_skipped" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "owner" (
	"id" smallint PRIMARY KEY DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"pin_hash" text NOT NULL,
	"failed_pin_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"session_version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "owner_singleton_check" CHECK ("owner"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "passkeys" (
	"id" text PRIMARY KEY NOT NULL,
	"public_key" "bytea" NOT NULL,
	"counter" bigint DEFAULT 0 NOT NULL,
	"transports" text[],
	"device_name" text NOT NULL,
	"last_used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recurring_occurrences" (
	"rule_id" uuid NOT NULL,
	"due_date" date NOT NULL,
	"status" text NOT NULL,
	"transaction_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "recurring_occurrences_rule_id_due_date_pk" PRIMARY KEY("rule_id","due_date"),
	CONSTRAINT "recurring_occurrences_status_check" CHECK ("recurring_occurrences"."status" IN ('pending', 'posted', 'skipped'))
);
--> statement-breakpoint
CREATE TABLE "recurring_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"amount_cents" bigint NOT NULL,
	"account_id" uuid NOT NULL,
	"to_account_id" uuid,
	"category_id" uuid,
	"title" text DEFAULT '' NOT NULL,
	"note" text,
	"frequency" text NOT NULL,
	"interval" smallint DEFAULT 1 NOT NULL,
	"day_of_month" smallint,
	"weekday" smallint,
	"month_of_year" smallint,
	"start_date" date NOT NULL,
	"end_date" date,
	"next_date" date NOT NULL,
	"auto_post" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "recurring_rules_type_check" CHECK ("recurring_rules"."type" IN ('income', 'expense', 'transfer')),
	CONSTRAINT "recurring_rules_amount_check" CHECK ("recurring_rules"."amount_cents" > 0),
	CONSTRAINT "recurring_rules_frequency_check" CHECK ("recurring_rules"."frequency" IN ('daily', 'weekly', 'monthly', 'yearly')),
	CONSTRAINT "recurring_rules_interval_check" CHECK ("recurring_rules"."interval" BETWEEN 1 AND 12),
	CONSTRAINT "recurring_rules_day_of_month_check" CHECK ("recurring_rules"."day_of_month" IS NULL OR "recurring_rules"."day_of_month" BETWEEN 1 AND 31),
	CONSTRAINT "recurring_rules_weekday_check" CHECK ("recurring_rules"."weekday" IS NULL OR "recurring_rules"."weekday" BETWEEN 0 AND 6),
	CONSTRAINT "recurring_rules_month_of_year_check" CHECK ("recurring_rules"."month_of_year" IS NULL OR "recurring_rules"."month_of_year" BETWEEN 1 AND 12)
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" smallint PRIMARY KEY DEFAULT 1 NOT NULL,
	"timezone" text DEFAULT 'Asia/Colombo' NOT NULL,
	"currency_symbol" text DEFAULT 'Rs.' NOT NULL,
	"month_start_day" smallint DEFAULT 1 NOT NULL,
	"week_start_day" smallint DEFAULT 0 NOT NULL,
	"default_account_id" uuid,
	"auto_lock_minutes" smallint DEFAULT 5 NOT NULL,
	"theme" text DEFAULT 'dark' NOT NULL,
	"weekly_backup_enabled" boolean DEFAULT true NOT NULL,
	"last_backup_at" timestamp with time zone,
	"onboarded_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "settings_singleton_check" CHECK ("settings"."id" = 1),
	CONSTRAINT "settings_month_start_day_check" CHECK ("settings"."month_start_day" BETWEEN 1 AND 28),
	CONSTRAINT "settings_week_start_day_check" CHECK ("settings"."week_start_day" IN (0, 1)),
	CONSTRAINT "settings_theme_check" CHECK ("settings"."theme" IN ('dark', 'light', 'system'))
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"amount_cents" bigint,
	"account_id" uuid,
	"to_account_id" uuid,
	"category_id" uuid,
	"title" text DEFAULT '' NOT NULL,
	"note" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"use_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "templates_type_check" CHECK ("templates"."type" IN ('income', 'expense', 'transfer'))
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"amount_cents" bigint NOT NULL,
	"account_id" uuid NOT NULL,
	"to_account_id" uuid,
	"category_id" uuid,
	"title" text DEFAULT '' NOT NULL,
	"note" text,
	"occurred_at" timestamp with time zone NOT NULL,
	"local_date" date NOT NULL,
	"transfer_group_id" uuid,
	"recurring_rule_id" uuid,
	"photo_key" text,
	"import_hash" text,
	"import_batch_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "transactions_import_hash_unique" UNIQUE("import_hash"),
	CONSTRAINT "transactions_type_check" CHECK ("transactions"."type" IN ('income', 'expense', 'transfer', 'adjustment')),
	CONSTRAINT "transactions_shape_check" CHECK ((
        ("transactions"."type" IN ('income', 'expense') AND "transactions"."amount_cents" > 0 AND "transactions"."category_id" IS NOT NULL AND "transactions"."to_account_id" IS NULL) OR
        ("transactions"."type" = 'transfer' AND "transactions"."amount_cents" > 0 AND "transactions"."to_account_id" IS NOT NULL AND "transactions"."to_account_id" <> "transactions"."account_id" AND "transactions"."category_id" IS NULL) OR
        ("transactions"."type" = 'adjustment' AND "transactions"."amount_cents" <> 0 AND "transactions"."to_account_id" IS NULL AND "transactions"."category_id" IS NULL)
      ))
);
--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_occurrences" ADD CONSTRAINT "recurring_occurrences_rule_id_recurring_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."recurring_rules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_occurrences" ADD CONSTRAINT "recurring_occurrences_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_default_account_id_accounts_id_fk" FOREIGN KEY ("default_account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_recurring_rule_id_recurring_rules_id_fk" FOREIGN KEY ("recurring_rule_id") REFERENCES "public"."recurring_rules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_import_batch_id_import_batches_id_fk" FOREIGN KEY ("import_batch_id") REFERENCES "public"."import_batches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "budgets_overall_period_unique" ON "budgets" USING btree ("period_start") WHERE "budgets"."category_id" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "budgets_category_period_unique" ON "budgets" USING btree ("period_start","category_id") WHERE "budgets"."category_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "tx_local_date" ON "transactions" USING btree ("local_date" DESC NULLS LAST) WHERE "transactions"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "tx_account" ON "transactions" USING btree ("account_id","occurred_at") WHERE "transactions"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "tx_to_account" ON "transactions" USING btree ("to_account_id","occurred_at") WHERE "transactions"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "tx_category" ON "transactions" USING btree ("category_id","local_date") WHERE "transactions"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "tx_search" ON "transactions" USING gin (to_tsvector('simple', "title" || ' ' || coalesce("note", '')));