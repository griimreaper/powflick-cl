import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "es"] as const;
export const defaultLocale = "en" as const;
export const localePrefix = "always";

export default getRequestConfig(async ({ locale }) => {
  const l = (locale ?? defaultLocale) as (typeof locales)[number];
  return {
    locale: l,
    messages: (await import(`../messages/${l}.json`)).default,
  };
});
