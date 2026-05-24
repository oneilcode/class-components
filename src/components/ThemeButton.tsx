import { useTheme } from '../context/hooks/useTheme';

export default function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-btn" onClick={toggleTheme}>
      {isDark ? '☀️' : '🌙'}
    </div>
  );
}
