export function ActionButton({
  children,
  onClick,
  secondary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={`screen-action ${secondary ? "is-secondary" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
