import styles from "./NavLinks.module.css";

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

/** Frosted-glass pill of in-page links. */
export function NavLinks({ items }: { readonly items: readonly NavItem[] }) {
  return (
    <ul className={styles.pill}>
      {items.map((item, i) => (
        <li key={item.href}>
          <a href={item.href} className={i === 0 ? styles.active : undefined}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
