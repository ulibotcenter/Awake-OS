import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = await getDictionary(locale);
  const SITE_URL = 'https://awake-os.com';

  return {
    title: {
      default: dict.meta.title,
      template: '%s | Awake OS',
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        pt: '/pt',
        es: '/es',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Awake OS',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: '/images/awake-os-cover.jpg',
          width: 1650,
          height: 2550,
          alt: 'Awake OS book cover — turquoise neural network on deep teal',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
