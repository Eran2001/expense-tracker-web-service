"use client";

import { useState } from "react";
import { ChevronRight, Filter, Search } from "lucide-react";
import { PageHeading, TransactionList } from "@/components/shared";
import { transactionItems } from "./data";
import { screenBodyClassName, sectionHeadingClassName } from "./styles";

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const filtered = transactionItems.filter((item) =>
    `${item.title} ${item.category} ${item.note}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className={screenBodyClassName}>
      <PageHeading title="Search" />
      <div className="search-field">
        <Search size={19} />
        <input
          aria-label="Search transactions"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transactions"
          value={query}
        />
        <button aria-label="Search filters" className="icon-link" type="button">
          <Filter size={18} />
        </button>
      </div>
      <div className="filter-chips">
        <button className="filter-chip is-active" type="button">
          All dates <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          All types <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          All accounts <ChevronRight size={13} />
        </button>
        <button className="filter-chip" type="button">
          Amount <ChevronRight size={13} />
        </button>
      </div>
      <div
        className={`${sectionHeadingClassName} search-result-heading mt-3 mb-1`}
      >
        <h2 className="t-heading">
          {query ? `${filtered.length} results` : "Recent transactions"}
        </h2>
        {query && (
          <span className="t-small-mute">
            Matching title, category, or note
          </span>
        )}
      </div>
      <TransactionList items={filtered} />
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={24} />
          <strong className="t-title">No matches</strong>
          <span className="t-body-mute">Try a different search.</span>
        </div>
      )}
    </div>
  );
}
