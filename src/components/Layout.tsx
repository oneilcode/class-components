'use client';

import Link from 'next/link';
import ThemeButton from './ThemeButton';
import Flyout from './Flyout';
import { useTheme } from 'context/hooks/useTheme';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="layout-nav">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <ThemeButton />
        </nav>
        <main className="layout-main">{children}</main>
        <Flyout />
      </div>
    </div>
  );
}
