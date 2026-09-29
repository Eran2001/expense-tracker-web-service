"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/shared";
import { screenBodyClassName } from "./styles";
import { OverviewScreen } from "./overview-screen";
import { TransactionsScreen } from "./transactions-screen";
import { TransactionDetailScreen } from "./transaction-detail-screen";
import { StatsScreen } from "./stats-screen";
import { CategoryDetailScreen } from "./category-detail-screen";
import { AccountsScreen } from "./accounts-screen";
import { AccountDetailScreen } from "./account-detail-screen";
import { SearchScreen } from "./search-screen";
import { BudgetsScreen } from "./budgets-screen";
import { RecurringScreen } from "./recurring-screen";
import { MoreScreen } from "./more-screen";
import { SettingsScreen } from "./settings-screen";
import { AuthScreen } from "./auth-screen";
import { OnboardingScreen } from "./onboarding-screen";

export function LedgerScreen({
  section,
  id,
}: {
  section: string;
  id?: string;
}) {
  if (section === "overview") return <OverviewScreen />;
  if (section === "transactions")
    return id ? <TransactionDetailScreen id={id} /> : <TransactionsScreen />;
  if (section === "stats")
    return id ? <CategoryDetailScreen id={id} /> : <StatsScreen />;
  if (section === "accounts")
    return id ? <AccountDetailScreen id={id} /> : <AccountsScreen />;
  if (section === "search") return <SearchScreen />;
  if (section === "budgets") return <BudgetsScreen />;
  if (section === "recurring") return <RecurringScreen />;
  if (section === "more")
    return id ? <SettingsScreen section={id} /> : <MoreScreen />;
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Page not found" />
      <Link className="text-link t-body" href="/transactions">
        Back to transactions <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export function LedgerAuthScreen({ mode }: { mode: "lock" | "setup" }) {
  return <AuthScreen mode={mode} />;
}

export function LedgerOnboardingScreen() {
  return <OnboardingScreen />;
}
