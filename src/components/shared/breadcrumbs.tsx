import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  current,
  parent,
  rootHref = "/overview",
}: {
  current: string;
  parent?: { label: string; href: string };
  rootHref?: string | null;
}) {
  const items = [
    { label: "Ledger", href: rootHref ?? undefined },
    ...(parent ? [parent] : []),
    { label: current },
  ];

  return (
    <nav aria-label="Breadcrumb" className="screen-breadcrumbs mb-1 min-w-0">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              className="inline-flex min-w-0 items-center gap-1 wrap-break-word"
              key={`${item.label}-${index}`}
            >
              {index > 0 && <ChevronRight aria-hidden="true" size={13} />}
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
