"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import en from "../../../content/messages/en.json";
import tr from "../../../content/messages/tr.json";
import { isLocale } from "@/core/domain/locale";
import styles from "@/presentation/components/atoms/ButtonLink/ButtonLink.module.css";
import { StatusScreen } from "@/presentation/components/templates/StatusScreen";

// Reads the same message files directly, so the next-intl client runtime
// (~14 KB gzipped) never ships to the browser just for this rare screen.
const copy = { tr: tr.Error, en: en.Error } as const;

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale } = useParams<{ locale: string }>();
  const t = copy[isLocale(locale) ? locale : "tr"];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen code="500" title={t.title} text={t.text}>
      <button
        type="button"
        onClick={reset}
        className={`${styles.button} ${styles.gradient}`}
        style={{ border: 0, cursor: "pointer" }}
      >
        {t.retry}
      </button>
    </StatusScreen>
  );
}
