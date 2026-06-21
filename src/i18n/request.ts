import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ru'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  console.log('📍 i18n/request.ts -> locale from middleware:', locale);

  const selectedLocale =
    locale && locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: selectedLocale,
    messages: (await import(`../messages/${selectedLocale}.json`)).default,
  };
});
