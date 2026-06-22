'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './hooks/useTheme';

interface Themeproviderprops {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Themeproviderprops) => {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, isMounted]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
