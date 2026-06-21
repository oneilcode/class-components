'use client';

import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    window.location.href = newPathname;
  };

  return (
    <div className="lang-switcher">
      <button
        onClick={() => switchLanguage('en')}
        className={currentLocale === 'en' ? 'active' : ''}
      >
        EN
      </button>
      {' | '}
      <button
        onClick={() => switchLanguage('ru')}
        className={currentLocale === 'ru' ? 'active' : ''}
      >
        RU
      </button>
    </div>
  );
}
