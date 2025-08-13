import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;
const defaultLocale = "en" as const;

const baseMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

// Detección muy simple: si la ruta no tiene prefijo y Accept-Language empieza por 'es', redirige a /es, si no /en.
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Si ya tiene locale válido, delegamos
  if (/^\/(en|es)(\/|$)/.test(pathname)) return baseMiddleware(req);

  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  const chosen =
    accept.startsWith("es") || accept.includes("es-") ? "es" : defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${chosen}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Incluye cualquier ruta de aplicación excluyendo api, _next y archivos con extensión
    "/((?!api|_next|.*\\..*).*)",
  ],
};
