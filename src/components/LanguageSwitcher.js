'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className={styles.switcher}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          className={`${styles.btn} ${locale === loc ? styles.active : ''}`}
          onClick={() => switchLocale(loc)}
          aria-label={`Switch to ${loc}`}
          id={`lang-switch-${loc}`}
        >
          {loc === 'ko' ? '🇰🇷' : '🇺🇸'}
          <span className={styles.label}>{loc.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
