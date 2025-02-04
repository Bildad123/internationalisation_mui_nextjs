import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const useTranslate = (translationKey: string) => {
  const t = useTranslations("translations");
  return t(translationKey);
};

export const useTranslateAsync = async (translationKey: string) => {
  const t = await getTranslations("translations");
  return t(translationKey);
};
