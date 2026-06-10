import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/siteConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('homeTitle'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('homeDescription'),
    keywords: ['unit converter', 'unit conversion', 'kg to lb', 'cm to inch', 'mile to km', '단위 변환', '단위 변환기'],
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'ko': `${siteConfig.url}/ko`,
        'en': `${siteConfig.url}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    description: messages.common?.siteDescription || '',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    inLanguage: [locale === 'ko' ? 'ko-KR' : 'en-US'],
  };

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main style={{ minHeight: 'calc(100vh - var(--header-height) - 200px)' }}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
        {!siteConfig.analyticsId.includes('XXXX') && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.analyticsId}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {!siteConfig.adsenseId.includes('XXXX') && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
