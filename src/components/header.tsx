import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';
import { ThemeSwitcher } from './theme-switcher/theme-switcher';

export const Header = () => {
  const t = useTranslations('Header');

  return (
    <header className="header">
      <Link className="header__logo" href="/">
        Pokédex
      </Link>

      <nav className="header__nav" aria-label="Main navigation">
        <Link className="header__link" href="/">
          {t('home')}
        </Link>

        <Link className="header__link" href="/about">
          {t('about')}
        </Link>

        <ThemeSwitcher />
      </nav>
    </header>
  );
};
