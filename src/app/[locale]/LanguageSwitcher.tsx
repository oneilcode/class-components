'use client';

import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const currentLocale = pathname.split('/')[1] || 'en';
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    window.location.href = newPathname;
  };

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>EN</button>
      {' | '}
      <button onClick={() => switchLanguage('ru')}>RU</button>
    </div>
  );
}
