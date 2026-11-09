import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { StatusScreen } from "@/presentation/components/templates/StatusScreen";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <StatusScreen code="404" title={t("title")} text={t("text")}>
      <ButtonLink href="/">{t("back")}</ButtonLink>
    </StatusScreen>
  );
}
