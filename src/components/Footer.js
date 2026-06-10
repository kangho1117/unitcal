import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/siteConfig';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              {t('siteName')}
            </span>
            <p className={styles.tagline}>{t('siteDescription')}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>{t('allCategories')}</h4>
              <Link href="/convert/weight">⚖️ Weight</Link>
              <Link href="/convert/length">📏 Length</Link>
              <Link href="/convert/temperature">🌡️ Temperature</Link>
              <Link href="/convert/volume">🧪 Volume</Link>
              <Link href="/convert/area">📐 Area</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>&nbsp;</h4>
              <Link href="/convert/speed">🏎️ Speed</Link>
              <Link href="/convert/time">⏱️ Time</Link>
              <Link href="/convert/data">💾 Data</Link>
              <Link href="/convert/pressure">🔧 Pressure</Link>
              <Link href="/convert/energy">⚡ Energy</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Legal</h4>
              <Link href="/about">{t('about')}</Link>
              <Link href="/privacy">{t('privacy')}</Link>
              <Link href="/terms">{t('terms')}</Link>
              <Link href="/contact">{t('contact')}</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {siteConfig.name}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
