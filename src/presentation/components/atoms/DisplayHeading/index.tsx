import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/shared/lib/cx";
import styles from "./DisplayHeading.module.css";

export interface DisplayHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  readonly as?: "h1" | "h2" | "p";
  readonly children: ReactNode;
}

/** Heavy, wide, uppercase display type. */
export function DisplayHeading({ as: Tag = "h2", className, children, ...rest }: DisplayHeadingProps) {
  return (
    <Tag className={cx(styles.display, className)} {...rest}>
      {children}
    </Tag>
  );
}
