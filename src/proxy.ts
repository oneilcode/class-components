import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
console.log('✅ middleware.ts loaded');
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
