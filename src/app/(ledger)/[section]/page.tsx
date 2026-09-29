import { LedgerScreen } from "@/components/ledger-screens";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <LedgerScreen section={section} />;
}