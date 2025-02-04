import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const defaultLocale = "en";

export const locales = ["en", "de"] as any;
export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
