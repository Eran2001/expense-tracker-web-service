import { LedgerScreen } from "@/components/ledger-screens";

export default async function DetailPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params;
  return <LedgerScreen id={id} section={section} />;
}