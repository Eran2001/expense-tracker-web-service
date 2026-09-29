import { LedgerScreen } from "@/components/ledger-screens";

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LedgerScreen id={id} section="stats" />;
}