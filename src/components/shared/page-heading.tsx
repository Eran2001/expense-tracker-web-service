import { Breadcrumbs } from "./breadcrumbs";

export function PageHeading({
  title,
  eyebrow,
  children,
  parent,
  rootHref,
}: {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  parent?: { label: string; href: string };
  rootHref?: string | null;
}) {
  return (
    <div className="screen-heading mb-5.5 flex min-h-14.5 items-center justify-between gap-4.5 max-md:mb-4 max-md:items-start max-phone-lg:gap-2">
      <div className="min-w-0">
        <Breadcrumbs current={title} parent={parent} rootHref={rootHref} />
        {eyebrow && (
          <span className="section-label t-caption-bold">{eyebrow}</span>
        )}
        <h1 className="t-heading-xl mt-0.75">{title}</h1>
      </div>
      {children && (
        <div className="screen-heading-actions flex items-center gap-2 max-md:flex-wrap max-md:justify-end max-phone-lg:gap-1.25 [&>.screen-action]:inline-flex max-md:[&>.screen-action]:min-h-8.5 max-md:[&>.screen-action]:px-2.25 max-phone-lg:[&>.screen-action]:gap-1.25 max-phone-lg:[&>.screen-action]:px-1.75">
          {children}
        </div>
      )}
    </div>
  );
}
