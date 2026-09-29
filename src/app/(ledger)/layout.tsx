import { LedgerWorkspace } from "@/components/ledger-workspace";

export default function LedgerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <LedgerWorkspace>{children}</LedgerWorkspace>;
}