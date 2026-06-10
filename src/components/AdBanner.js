'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/lib/siteConfig';
import styles from './AdBanner.module.css';

/**
 * AdSense ad banner component.
 * Renders a responsive ad slot. Replace data-ad-slot with your actual slot ID.
 */
export default function AdBanner({ slot = '1234567890', format = 'auto', className = '' }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense not loaded yet — safe to ignore
    }
  }, []);

  // Don't render ad if no real AdSense ID is set
  if (siteConfig.adsenseId.includes('XXXX')) {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span className={styles.placeholderText}>Ad Space</span>
      </div>
    );
  }

  return (
    <div className={`${styles.banner} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={siteConfig.adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
