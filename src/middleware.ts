import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Idiomas soportados
  locales: ["en", "es"],
  // Idioma por defecto
  defaultLocale: "en",
  // Prefijar siempre el locale en la URL
  localePrefix: "always",
});

// Qué rutas deben pasar por el middleware de i18n
export const config = {
  matcher: [
    "/",
    "/(en|es)/:path*",
    // Captura rutas sin prefijo de locale (excepto api, _next y archivos estáticos)
    "/((?!api|_next|.*\\..*).*)",
  ],
};
