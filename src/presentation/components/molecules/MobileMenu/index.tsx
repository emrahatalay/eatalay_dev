"use client";

import { useId, type MouseEvent } from "react";
import { CloseIcon, MenuIcon } from "@/presentation/components/atoms/Icon";
import type { NavItem } from "../NavLinks";
import styles from "./MobileMenu.module.css";

export interface MobileMenuProps {
  readonly items: readonly NavItem[];
  readonly cta: NavItem;
  readonly navLabel: string;
  readonly openLabel: string;
  readonly closeLabel: string;
}

/**
 * Uses the native Popover API: focus handling, Esc and light-dismiss come
 * from the browser. JavaScript only closes the panel after a link is chosen.
 */
export function MobileMenu({ items, cta, navLabel, openLabel, closeLabel }: MobileMenuProps) {
  const id = useId();

  function closeOnLink(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) event.currentTarget.hidePopover();
  }

  return (
    <>
      <button type="button" className={styles.trigger} popoverTarget={id} aria-label={openLabel}>
        <MenuIcon />
      </button>
      <div id={id} popover="auto" className={styles.panel} onClick={closeOnLink}>
        <button
          type="button"
          className={styles.close}
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label={closeLabel}
        >
          <CloseIcon />
        </button>
        <nav aria-label={navLabel}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={cta.href} className={styles.cta}>
          {cta.label} <span aria-hidden="true">›</span>
        </a>
      </div>
    </>
  );
}
