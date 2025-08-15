import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const l = (locale ?? "en") as "en" | "es";
  // Reutiliza los JSON bajo /messages si existen; si no, puedes cargar desde resources más tarde
  try {
    const messages = (await import(`../../messages/${l}.json`)).default;
    return { locale: l, messages };
  } catch (e) {
    // Fallback: usa un objeto mínimo para evitar romper el build si no hay mensajes
    return { locale: l, messages: {} };
  }
});
