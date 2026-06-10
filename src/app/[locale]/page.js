import { useTranslations } from 'next-intl';
import CategoryCard from '@/components/CategoryCard';
import AdBanner from '@/components/AdBanner';
import { categories } from '@/lib/units';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

const popularConversions = [
  { from: 'kg', to: 'lb', category: 'weight', icon: '⚖️' },
  { from: 'cm', to: 'inch', category: 'length', icon: '📏' },
  { from: 'mile', to: 'km', category: 'length', icon: '🛤️' },
  { from: 'celsius', to: 'fahrenheit', category: 'temperature', icon: '🌡️' },
  { from: 'l', to: 'gallon_us', category: 'volume', icon: '🧪' },
  { from: 'sqm', to: 'pyeong', category: 'area', icon: '📐' },
  { from: 'kcal', to: 'kj', category: 'energy', icon: '⚡' },
  { from: 'mb', to: 'gb', category: 'data', icon: '💾' },
];

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const tUnits = useTranslations('units');

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            {t('heroTitle')}{' '}
            <span className={styles.heroHighlight}>{t('heroTitleHighlight')}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>
          <div className={styles.heroCta}>
            <Link href="/convert/weight" className={styles.ctaButton} id="hero-cta">
              {tc('tryConverter')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('categoriesTitle')}</h2>
            <p className={styles.sectionSubtitle}>{t('categoriesSubtitle')}</p>
          </div>
          <div className={styles.grid}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <AdBanner />

      {/* Popular Conversions Section */}
      <section className={`section ${styles.popularSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('popularTitle')}</h2>
            <p className={styles.sectionSubtitle}>{t('popularSubtitle')}</p>
          </div>
          <div className={styles.popularGrid}>
            {popularConversions.map((conv) => (
              <Link
                key={`${conv.from}-${conv.to}`}
                href={`/convert/${conv.category}/${conv.from}-to-${conv.to}`}
                className={styles.popularCard}
                id={`popular-${conv.from}-${conv.to}`}
              >
                <span className={styles.popularIcon}>{conv.icon}</span>
                <span className={styles.popularLabel}>
                  {tUnits(conv.from)} → {tUnits(conv.to)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
