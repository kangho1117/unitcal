import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('termsTitle'),
    description: t('termsDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/terms`,
      languages: { ko: `${siteConfig.url}/ko/terms`, en: `${siteConfig.url}/en/terms` },
    },
  };
}

export default async function TermsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <div className="legal-page">
      <h1>{t('title')}</h1>
      <p className="last-updated">{t('lastUpdated')}</p>

      <h2>{t('acceptTitle')}</h2>
      <p>{t('acceptText')}</p>

      <h2>{t('serviceTitle')}</h2>
      <p>{t('serviceText')}</p>

      <h2>{t('useTitle')}</h2>
      <p>{t('useText')}</p>
      <ul>
        <li>{t('useItem1')}</li>
        <li>{t('useItem2')}</li>
        <li>{t('useItem3')}</li>
      </ul>

      <h2>{t('disclaimerTitle')}</h2>
      <p>{t('disclaimerText')}</p>

      <h2>{t('liabilityTitle')}</h2>
      <p>{t('liabilityText')}</p>

      <h2>{t('ipTitle')}</h2>
      <p>{t('ipText')}</p>

      <h2>{t('changesTitle')}</h2>
      <p>{t('changesText')}</p>

      <h2>{t('contactTitle')}</h2>
      <p>{t('contactText')}</p>
    </div>
  );
}
