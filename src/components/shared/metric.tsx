export function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="screen-metric grid min-w-0 gap-1.5">
      <span className="t-small-mute">{label}</span>
      <strong className={`t-kpi ${tone ?? ""}`}>{value}</strong>
    </div>
  );
}
