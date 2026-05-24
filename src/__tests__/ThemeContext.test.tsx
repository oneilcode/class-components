import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from '../context/hooks/useTheme';
import { ThemeProvider } from '../context/ThemeContext';

const TestComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have light theme by default (isDark = false)', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = screen.getByTestId('theme-value');
    expect(themeValue.textContent).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    const themeValue = screen.getByTestId('theme-value');
    expect(themeValue.textContent).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    let themeValue = screen.getByTestId('theme-value');
    expect(themeValue.textContent).toBe('dark');

    fireEvent.click(toggleButton);
    themeValue = screen.getByTestId('theme-value');
    expect(themeValue.textContent).toBe('light');
  });

  it('should work with multiple toggles', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    const themeValue = screen.getByTestId('theme-value');

    expect(themeValue.textContent).toBe('light');

    fireEvent.click(toggleButton);
    expect(themeValue.textContent).toBe('dark');

    fireEvent.click(toggleButton);
    expect(themeValue.textContent).toBe('light');

    fireEvent.click(toggleButton);
    expect(themeValue.textContent).toBe('dark');
  });
});
