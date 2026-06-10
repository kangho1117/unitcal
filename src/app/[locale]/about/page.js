import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/about`,
      languages: { ko: `${siteConfig.url}/ko/about`, en: `${siteConfig.url}/en/about` },
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const features = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature4'),
    t('feature5'),
    t('feature6'),
  ];

  return (
    <div className="legal-page">
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2>{t('missionTitle')}</h2>
      <p>{t('missionText')}</p>

      <h2>{t('featuresTitle')}</h2>
      <ul>
        {features.map((feat, i) => (
          <li key={i}>{feat}</li>
        ))}
      </ul>

      <h2>{t('accuracyTitle')}</h2>
      <p>{t('accuracyText')}</p>

      <h2>{t('openSourceTitle')}</h2>
      <p>{t('openSourceText')}</p>
    </div>
  );
}
