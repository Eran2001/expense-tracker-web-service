export function MetricStrip({
  children,
  className = "grid grid-cols-3 gap-3.75 pt-0.75 pb-5 max-md:gap-2 max-md:pb-3.75",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`screen-metrics ${className}`}>{children}</div>;
}
