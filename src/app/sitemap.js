import { siteConfig } from '@/lib/siteConfig';
import { categories, popularUnitPairs } from '@/lib/units';
import { routing } from '@/i18n/routing';

export default function sitemap() {
  const baseUrl = siteConfig.url;
  const locales = routing.locales;
  const now = new Date().toISOString();

  const urls = [];

  // Home pages
  for (const locale of locales) {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  }

  // Convert pages
  for (const locale of locales) {
    for (const category of categories) {
      urls.push({
        url: `${baseUrl}/${locale}/convert/${category}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  // Unit-pair convert pages
  for (const locale of locales) {
    for (const pairObj of popularUnitPairs) {
      urls.push({
        url: `${baseUrl}/${locale}/convert/${pairObj.category}/${pairObj.from}-to-${pairObj.to}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Legal / info pages
  const staticPages = ['about', 'privacy', 'terms', 'contact'];
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return urls;
}
