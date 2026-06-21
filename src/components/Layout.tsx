'use client';

import Link from 'next/link';
import ThemeButton from './ThemeButton';
import Flyout from './Flyout';
import { useTheme } from 'context/hooks/useTheme';
import LanguageSwitcher from 'app/[locale]/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const t = useTranslations('Navigation');

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="layout-nav">
        <nav>
          <Link href="/">{t('home')}</Link>
          <Link href="/about">{t('about')}</Link>
          <ThemeButton />
          <LanguageSwitcher />
        </nav>
        <main className="layout-main">{children}</main>
        <Flyout />
      </div>
    </div>
  );
}
