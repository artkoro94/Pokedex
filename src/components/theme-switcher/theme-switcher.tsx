'use client';

import { useTheme } from '../../context/use-theme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-switcher"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-switcher__icon" aria-hidden="true">
        {isDark ? '☀' : '☾'}
      </span>
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
};
