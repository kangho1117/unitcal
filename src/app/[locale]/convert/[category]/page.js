import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/siteConfig';
import { categories, getUnitsForCategory, categoryIcons, popularUnitPairs } from '@/lib/units';
import UnitConverter from '@/components/UnitConverter';
import AdBanner from '@/components/AdBanner';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tDesc = await getTranslations({ locale, namespace: 'categoryDescriptions' });

  const categoryName = tCat(category);
  const description = tDesc(category);

  return {
    title: t('convertTitle', { category: categoryName }),
    description: t('convertDescription', { category: categoryName, description }),
    openGraph: {
      title: t('convertTitle', { category: categoryName }),
      description: t('convertDescription', { category: categoryName, description }),
      url: `${siteConfig.url}/${locale}/convert/${category}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/convert/${category}`,
      languages: {
        'ko': `${siteConfig.url}/ko/convert/${category}`,
        'en': `${siteConfig.url}/en/convert/${category}`,
      },
    },
  };
}

export default async function ConvertPage({ params }) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tDesc = await getTranslations({ locale, namespace: 'categoryDescriptions' });
  const tFormula = await getTranslations({ locale, namespace: 'formulas' });
  const tUnits = await getTranslations({ locale, namespace: 'units' });

  const units = getUnitsForCategory(category);
  const icon = categoryIcons[category] || '🔄';
  const categoryName = tCat(category);
  const categoryPairs = popularUnitPairs.filter((p) => p.category === category);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>{t('home')}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{categoryName}</span>
        </nav>

        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.headerIcon}>{icon}</span>
          <h1 className={styles.title}>{categoryName} {t('convert')}</h1>
          <p className={styles.description}>{tDesc(category)}</p>
        </header>

        {/* Converter */}
        <div className={styles.converterWrapper}>
          <UnitConverter category={category} />
        </div>

        <AdBanner />

        {/* Formula / Description */}
        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>
            <span className={styles.infoIcon}>📖</span>
            {t('formula')}
          </h2>
          <p className={styles.infoText}>{tFormula(category)}</p>
        </section>

        {/* Unit Reference Table */}
        <section className={styles.tableSection}>
          <h2 className={styles.infoTitle}>
            <span className={styles.infoIcon}>📋</span>
            {t('unitReference')}
          </h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>{tUnits(units[0])} =</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => {
                  // We'll show a static reference relative to the first unit
                  return (
                    <tr key={unit}>
                      <td className={styles.unitName}>{tUnits(unit)}</td>
                      <td className={styles.unitKey}>{unit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Popular Conversions for this category */}
        {categoryPairs.length > 0 && (
          <section className={styles.popularPairsSection}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>⭐</span>
              {categoryName} {t('popularConversions')}
            </h2>
            <div className={styles.pairsGrid}>
              {categoryPairs.map((pair) => (
                <Link
                  key={`${pair.from}-to-${pair.to}`}
                  href={`/convert/${category}/${pair.from}-to-${pair.to}`}
                  className={styles.pairCard}
                >
                  <span>{tUnits(pair.from)} → {tUnits(pair.to)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Categories */}
        <section className={styles.otherSection}>
          <h2 className={styles.infoTitle}>{t('allCategories')}</h2>
          <div className={styles.otherGrid}>
            {categories
              .filter((c) => c !== category)
              .map((c) => (
                <Link key={c} href={`/convert/${c}`} className={styles.otherCard}>
                  <span>{categoryIcons[c]}</span>
                  <span>{tCat(c)}</span>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
