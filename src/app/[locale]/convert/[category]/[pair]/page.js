import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/siteConfig';
import { categories, getUnitsForCategory, categoryIcons, popularUnitPairs, convert, formatResult } from '@/lib/units';
import UnitConverter from '@/components/UnitConverter';
import AdBanner from '@/components/AdBanner';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export const dynamicParams = false;

// Generate params for popular unit pairs
export function generateStaticParams() {
  const paramsList = [];
  const locales = ['ko', 'en'];

  for (const locale of locales) {
    for (const pairObj of popularUnitPairs) {
      paramsList.push({
        locale,
        category: pairObj.category,
        pair: `${pairObj.from}-to-${pairObj.to}`,
      });
    }
  }

  return paramsList;
}

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { locale, category, pair } = await params;

  if (!categories.includes(category)) {
    return {};
  }

  const pairParts = pair.split('-to-');
  if (pairParts.length !== 2) {
    return {};
  }

  const [fromUnit, toUnit] = pairParts;
  const validUnits = getUnitsForCategory(category);
  if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
    return {};
  }

  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const tUnits = await getTranslations({ locale, namespace: 'units' });

  const fromUnitName = tUnits(fromUnit);
  const toUnitName = tUnits(toUnit);

  const title = tMeta('pairTitle', {
    fromUnit: fromUnitName,
    toUnit: toUnitName,
    fromKey: fromUnit,
    toKey: toUnit,
  });

  const description = tMeta('pairDescription', {
    fromUnit: fromUnitName,
    toUnit: toUnitName,
    fromKey: fromUnit,
    toKey: toUnit,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/convert/${category}/${pair}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/convert/${category}/${pair}`,
      languages: {
        'ko': `${siteConfig.url}/ko/convert/${category}/${pair}`,
        'en': `${siteConfig.url}/en/convert/${category}/${pair}`,
      },
    },
  };
}

export default async function ConvertPairPage({ params }) {
  const { locale, category, pair } = await params;

  if (!categories.includes(category)) {
    notFound();
  }

  const pairParts = pair.split('-to-');
  if (pairParts.length !== 2) {
    notFound();
  }

  const [fromUnit, toUnit] = pairParts;
  const validUnits = getUnitsForCategory(category);
  if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'common' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tUnits = await getTranslations({ locale, namespace: 'units' });

  const categoryName = tCat(category);
  const icon = categoryIcons[category] || '🔄';
  const fromUnitName = tUnits(fromUnit);
  const toUnitName = tUnits(toUnit);

  // Calculate conversion coefficient for formula display
  const coefficient = convert(1, fromUnit, toUnit, category);
  const formattedCoeff = formatResult(coefficient);

  // Generate formula explanation text
  const getFormulaExplanation = () => {
    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return locale === 'ko'
          ? '섭씨에서 화씨로 변환하는 공식: °F = (°C × 9/5) + 32'
          : 'Formula to convert Celsius to Fahrenheit: °F = (°C × 9/5) + 32';
      }
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return locale === 'ko'
          ? '화씨에서 섭씨로 변환하는 공식: °C = (°F - 32) × 5/9'
          : 'Formula to convert Fahrenheit to Celsius: °C = (°F - 32) × 5/9';
      }
      if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        return locale === 'ko'
          ? '섭씨에서 켈빈으로 변환하는 공식: K = °C + 273.15'
          : 'Formula to convert Celsius to Kelvin: K = °C + 273.15';
      }
      if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        return locale === 'ko'
          ? '켈빈에서 섭씨로 변환하는 공식: °C = K - 273.15'
          : 'Formula to convert Kelvin to Celsius: °C = K - 273.15';
      }
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        return locale === 'ko'
          ? '화씨에서 켈빈으로 변환하는 공식: K = (°F - 32) × 5/9 + 273.15'
          : 'Formula to convert Fahrenheit to Kelvin: K = (°F - 32) × 5/9 + 273.15';
      }
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        return locale === 'ko'
          ? '켈빈에서 화씨로 변환하는 공식: °F = (K - 273.15) × 9/5 + 32'
          : 'Formula to convert Kelvin to Fahrenheit: °F = (K - 273.15) × 9/5 + 32';
      }
      return '';
    }

    return locale === 'ko'
      ? `1 ${fromUnitName} (${fromUnit}) = ${formattedCoeff} ${toUnitName} (${toUnit}). ${fromUnitName}에서 ${toUnitName}(으)로 변환하려면 입력값에 ${formattedCoeff}을(를) 곱하십시오.`
      : `1 ${fromUnitName} (${fromUnit}) = ${formattedCoeff} ${toUnitName} (${toUnit}). To convert from ${fromUnitName} to ${toUnitName}, multiply the value by ${formattedCoeff}.`;
  };

  // Common values for conversion tables
  const tableValues = [1, 5, 10, 20, 50, 100, 250, 500, 1000];

  // Filter other popular unit pairs in this category
  const relatedPairs = popularUnitPairs.filter(
    (p) => p.category === category && !(p.from === fromUnit && p.to === toUnit)
  );

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>{t('home')}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href={`/convert/${category}`} className={styles.breadcrumbLink}>{categoryName}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{fromUnitName} → {toUnitName}</span>
        </nav>

        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.headerIcon}>{icon}</span>
          <h1 className={styles.title}>
            {t('pairHeading', {
              fromUnit: fromUnitName,
              toUnit: toUnitName,
              fromKey: fromUnit,
              toKey: toUnit,
            })}
          </h1>
          <p className={styles.description}>
            {locale === 'ko'
              ? `${fromUnitName}(${fromUnit})와 ${toUnitName}(${toUnit}) 간의 상호 단위 변환을 즉시 계산하고 공식을 확인하세요.`
              : `Instantly convert between ${fromUnitName} (${fromUnit}) and ${toUnitName} (${toUnit}) with live results and formulas.`}
          </p>
        </header>

        {/* Prefilled Converter */}
        <div className={styles.converterWrapper}>
          <UnitConverter
            key={`${category}-${fromUnit}-${toUnit}`}
            category={category}
            initialFromUnit={fromUnit}
            initialToUnit={toUnit}
          />
        </div>

        <AdBanner />

        {/* Formula Section */}
        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>
            <span className={styles.infoIcon}>📖</span>
            {t('formula')}
          </h2>
          <p className={styles.infoText}>{getFormulaExplanation()}</p>
        </section>

        {/* Double Conversion Tables (SEO optimization) */}
        <div className={styles.tablesContainer}>
          {/* Forward Conversion Table */}
          <section className={styles.tableSection}>
            <h3 className={styles.tableTitle}>
              {t('quickTable', { fromUnit: fromUnitName, toUnit: toUnitName })}
            </h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{fromUnitName} ({fromUnit})</th>
                    <th>{toUnitName} ({toUnit})</th>
                  </tr>
                </thead>
                <tbody>
                  {tableValues.map((val) => (
                    <tr key={`fwd-${val}`}>
                      <td className={styles.valCol}>{val} {fromUnit}</td>
                      <td className={styles.resultCol}>
                        {formatResult(convert(val, fromUnit, toUnit, category))} {toUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reverse Conversion Table */}
          <section className={styles.tableSection}>
            <h3 className={styles.tableTitle}>
              {t('quickTable', { fromUnit: toUnitName, toUnit: fromUnitName })}
            </h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{toUnitName} ({toUnit})</th>
                    <th>{fromUnitName} ({fromUnit})</th>
                  </tr>
                </thead>
                <tbody>
                  {tableValues.map((val) => (
                    <tr key={`rev-${val}`}>
                      <td className={styles.valCol}>{val} {toUnit}</td>
                      <td className={styles.resultCol}>
                        {formatResult(convert(val, toUnit, fromUnit, category))} {fromUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Related popular pairs inside this category */}
        {relatedPairs.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>⭐</span>
              {locale === 'ko'
                ? `기타 인기 ${categoryName} 변환`
                : `Other Popular ${categoryName} Conversions`}
            </h2>
            <div className={styles.relatedGrid}>
              {relatedPairs.slice(0, 10).map((pair) => (
                <Link
                  key={`${pair.from}-to-${pair.to}`}
                  href={`/convert/${category}/${pair.from}-to-${pair.to}`}
                  className={styles.relatedCard}
                >
                  <span>{tUnits(pair.from)} → {tUnits(pair.to)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
