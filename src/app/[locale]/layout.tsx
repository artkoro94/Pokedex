import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';
import { routing } from '../../i18n/routing';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Providers } from '../providers';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const messages = {
  en: enMessages,
  ru: ruMessages,
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru')) {
    notFound();
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale as keyof typeof messages]}
    >
      <Providers>
        <div className="site-shell">
          <Header />
          <div className="site-shell__content">{children}</div>
          <Footer />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}