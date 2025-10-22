import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  locales,
  defaultLocale,
  getLocaleFromPathname,
} from "@/lib/i18n/config";

// Matcher configuration for middleware
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|icons/|api/).*)",
  ],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a valid locale
  const { locale: detectedLocale, path: pathWithoutLocale } =
    getLocaleFromPathname(pathname);

  // If we're on a localized path (like /de/something), continue normally
  if (detectedLocale !== defaultLocale && locales.includes(detectedLocale)) {
    return NextResponse.next();
  }

  // Handle special routes that should work without localization
  const specialRoutes = [
    "/datenschutz",
    "/impressum",
    "/privacy",
    "/site-notice",
    "/offline",
    "/offline-first",
    "/guides",
  ];

  if (specialRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Handle API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Handle static files and Next.js internal routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header or saved preference
  let preferredLocale = defaultLocale;

  // Check for saved language preference in cookies
  const languageCookie = request.cookies.get("language");
  if (languageCookie && locales.includes(languageCookie.value as any)) {
    preferredLocale = languageCookie.value as any;
  } else {
    // Fallback to Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const browserLanguages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().toLowerCase());

      for (const browserLang of browserLanguages) {
        // Check for exact match
        if (locales.includes(browserLang as any)) {
          preferredLocale = browserLang as any;
          break;
        }

        // Check for language family match (e.g., 'de' from 'de-DE')
        const langFamily = browserLang.split("-")[0];
        const matchingLocale = locales.find((locale) => {
          if (locale.includes("-")) {
            return locale.split("-")[0] === langFamily;
          }
          return locale === langFamily;
        });

        if (matchingLocale) {
          preferredLocale = matchingLocale;
          break;
        }
      }
    }
  }

  // For root path, redirect to preferred locale if not default
  if (pathname === "/" && preferredLocale !== defaultLocale) {
    const response = NextResponse.redirect(
      new URL(`/${preferredLocale}`, request.url),
    );
    response.cookies.set("language", preferredLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    });
    return response;
  }

  // For conversion pages, handle locale prefixing
  if (
    pathname.startsWith("/convert/") ||
    pathname.startsWith("/waehrungsrechner-") ||
    pathname.startsWith("/currency-calculator-")
  ) {
    // These are already SEO optimized pages, continue normally
    return NextResponse.next();
  }

  // Set language cookie for future requests
  const response = NextResponse.next();
  if (!languageCookie) {
    response.cookies.set("language", preferredLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}
