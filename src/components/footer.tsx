import { useTranslations } from 'next-intl';

import { Link } from '../i18n/navigation';

export const Footer = () => {
  const t = useTranslations('Header');

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link className="footer__link" href="/about">
          {t('about')}
        </Link>
      </div>
    </footer>
  );
};
