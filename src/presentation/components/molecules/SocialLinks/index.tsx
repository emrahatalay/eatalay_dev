import type { ComponentType, SVGProps } from "react";
import type { SocialLink, SocialNetwork } from "@/core/domain/entities";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/presentation/components/atoms/Icon";
import styles from "./SocialLinks.module.css";

const icons: Record<SocialNetwork, ComponentType<SVGProps<SVGSVGElement> & { size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export function SocialLinks({ links }: { readonly links: readonly SocialLink[] }) {
  return (
    <ul className={styles.list}>
      {links.map((link) => {
        const Icon = icons[link.network];
        return (
          <li key={link.network}>
            <a href={link.url} aria-label={link.label} target="_blank" rel="me noopener noreferrer">
              <Icon size={14} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
