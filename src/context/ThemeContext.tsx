import { useState, type ReactNode } from 'react';
import { ThemeContext } from './hooks/useTheme';

interface Themeproviderprops {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Themeproviderprops) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
