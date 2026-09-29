import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { PageHeading } from "@/components/shared";
import { settingsItems } from "./data";
import { screenBodyClassName, settingsRowLayoutClassName } from "./styles";

export function MoreScreen() {
  return (
    <div className={screenBodyClassName}>
      <PageHeading eyebrow="Ledger" title="More" />
      <div className="settings-list">
        {settingsItems.map(({ key, title, description, icon: Icon }) => (
          <Link
            className={`settings-row ${settingsRowLayoutClassName}`}
            href={`/more/${key}`}
            key={key}
          >
            <span className="settings-icon">
              <Icon size={19} />
            </span>
            <span className="screen-row-main">
              <strong className="t-body">{title}</strong>
              <span className="t-meta">{description}</span>
            </span>
            <ArrowRight size={17} />
          </Link>
        ))}
      </div>
      <button className="lock-now-row" type="button">
        <LockKeyhole size={18} />
        <span className="t-body">Lock Ledger</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
