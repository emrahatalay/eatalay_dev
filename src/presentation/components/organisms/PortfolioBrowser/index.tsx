"use client";

import { useId, useMemo, useState } from "react";
import type { ProjectKind } from "@/core/domain/entities";
import { SearchIcon } from "@/presentation/components/atoms/Icon";
import { VisuallyHidden } from "@/presentation/components/atoms/VisuallyHidden";
import { ProjectCard, type ProjectCardData } from "@/presentation/components/molecules/ProjectCard";
import { matchesQuery } from "@/shared/lib/search";
import styles from "./PortfolioBrowser.module.css";

export type PortfolioSort = "newest" | "oldest" | "name";

/** One listed project: its card plus what search, filter and sort look at. */
export interface PortfolioEntry {
  readonly card: ProjectCardData;
  readonly kind: ProjectKind;
  readonly publishedAt: string;
  /** Text the search runs against, already folded with `foldForSearch`. */
  readonly haystack: string;
}

export interface PortfolioBrowserLabels {
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly filterLabel: string;
  readonly sortLabel: string;
  readonly sort: Readonly<Record<PortfolioSort, string>>;
  readonly all: string;
  readonly kinds: readonly { readonly kind: ProjectKind; readonly label: string }[];
  /** Result count sentences, indexed by count (0…total), pluralised on the server. */
  readonly results: readonly string[];
  readonly empty: string;
  readonly clear: string;
}

export interface PortfolioBrowserProps {
  readonly locale: string;
  /** Newest first. */
  readonly entries: readonly PortfolioEntry[];
  readonly labels: PortfolioBrowserLabels;
}

/** Search, type filter and sort over the project cards. Runs entirely in the browser. */
export function PortfolioBrowser({ locale, entries, labels }: PortfolioBrowserProps) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ProjectKind | "all">("all");
  const [sort, setSort] = useState<PortfolioSort>("newest");
  const searchId = useId();
  const sortId = useId();

  const visible = useMemo(() => {
    const matched = entries.filter(
      (e) => (kind === "all" || e.kind === kind) && matchesQuery(e.haystack, query, locale),
    );
    if (sort === "oldest") return matched.reverse();
    if (sort === "name") {
      return matched.sort((a, b) => a.card.name.localeCompare(b.card.name, locale));
    }
    return matched;
  }, [entries, kind, query, sort, locale]);

  const counts = useMemo(() => {
    const byKind = new Map<ProjectKind, number>();
    for (const e of entries) byKind.set(e.kind, (byKind.get(e.kind) ?? 0) + 1);
    return byKind;
  }, [entries]);

  const filtered = query.trim() !== "" || kind !== "all";
  const reset = () => {
    setQuery("");
    setKind("all");
  };

  return (
    <div className={styles.browser}>
      <div className={styles.toolbar}>
        <label className={styles.search} htmlFor={searchId}>
          <VisuallyHidden>{labels.searchLabel}</VisuallyHidden>
          <SearchIcon className={styles.searchIcon} />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>

        <div className={styles.filters} role="group" aria-label={labels.filterLabel}>
          <FilterChip active={kind === "all"} onClick={() => setKind("all")} count={entries.length}>
            {labels.all}
          </FilterChip>
          {labels.kinds
            .filter((k) => counts.has(k.kind))
            .map((k) => (
              <FilterChip
                key={k.kind}
                active={kind === k.kind}
                onClick={() => setKind(k.kind)}
                count={counts.get(k.kind) ?? 0}
              >
                {k.label}
              </FilterChip>
            ))}
        </div>

        <div className={styles.sort}>
          <label htmlFor={sortId}>{labels.sortLabel}</label>
          <select id={sortId} value={sort} onChange={(e) => setSort(e.target.value as PortfolioSort)}>
            {(Object.keys(labels.sort) as PortfolioSort[]).map((key) => (
              <option key={key} value={key}>
                {labels.sort[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.status} role="status">
        {labels.results[visible.length] ?? visible.length}
        {filtered && (
          <button type="button" className={styles.clear} onClick={reset}>
            {labels.clear}
          </button>
        )}
      </p>

      {visible.length > 0 ? (
        <ul className={styles.grid}>
          {visible.map((e) => (
            <li key={e.card.slug}>
              <ProjectCard card={e.card} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p>{labels.empty}</p>
          <button type="button" className={styles.clear} onClick={reset}>
            {labels.clear}
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly count: number;
  readonly children: string;
}) {
  return (
    <button type="button" className={styles.chip} aria-pressed={active} onClick={onClick}>
      {children}
      <span className={styles.chipCount}>{count}</span>
    </button>
  );
}
