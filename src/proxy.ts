import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const locales = ['en', 'es'];

interface LocaleRequest extends NextRequest {}

function getLocale(request: LocaleRequest): string {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // Find the first supported locale from the header
    const preferredLocale = locales.find((locale) => acceptLanguage.toLowerCase().includes(locale));

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  // Fallback to default locale
  return 'en';
}

export function proxy(request: LocaleRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files, assets)
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/|assets/).*)'
  ]
};
