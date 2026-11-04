'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '../i18n/navigation';
import { ThemeSwitcher } from './theme-switcher/theme-switcher';

export const Header = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === 'en' ? 'ru' : 'en';

  const handleLocaleChange = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="header">
      <Link className="header__logo" href="/">
        Pokédex
      </Link>

      <nav className="header__nav" aria-label="Main navigation">


        <button
          className="language-switcher"
          type="button"
          onClick={handleLocaleChange}
          aria-label={locale === 'en' ? 'Switch language to Russian' : 'Switch language to English'}
        >
          {nextLocale.toUpperCase()}
        </button>

        <ThemeSwitcher />
      </nav>
    </header>
  );
};
