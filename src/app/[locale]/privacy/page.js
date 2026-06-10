import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/privacy`,
      languages: { ko: `${siteConfig.url}/ko/privacy`, en: `${siteConfig.url}/en/privacy` },
    },
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="legal-page">
      <h1>{t('title')}</h1>
      <p className="last-updated">{t('lastUpdated')}</p>

      <h2>{t('introTitle')}</h2>
      <p>{t('introText')}</p>

      <h2>{t('collectTitle')}</h2>
      <p>{t('collectText')}</p>
      <ul>
        <li>{t('collectItem1')}</li>
        <li>{t('collectItem2')}</li>
        <li>{t('collectItem3')}</li>
      </ul>

      <h2>{t('cookiesTitle')}</h2>
      <p>{t('cookiesText')}</p>
      <ul>
        <li>{t('cookiesItem1')}</li>
        <li>{t('cookiesItem2')}</li>
        <li>{t('cookiesItem3')}</li>
      </ul>

      <h2>{t('thirdPartyTitle')}</h2>
      <p>{t('thirdPartyText')}</p>
      <ul>
        <li>{t('thirdPartyItem1')}</li>
        <li>{t('thirdPartyItem2')}</li>
      </ul>

      <h2>{t('rightsTitle')}</h2>
      <p>{t('rightsText')}</p>
      <ul>
        <li>{t('rightsItem1')}</li>
        <li>{t('rightsItem2')}</li>
        <li>{t('rightsItem3')}</li>
      </ul>

      <h2>{t('changesTitle')}</h2>
      <p>{t('changesText')}</p>

      <h2>{t('contactTitle')}</h2>
      <p>{t('contactText')}</p>
    </div>
  );
}
