import { createContext, useContext } from 'react';

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('context error');

  return context;
};

export { ThemeContext };
