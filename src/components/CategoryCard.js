import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { categoryIcons } from '@/lib/units';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category, index }) {
  const tCat = useTranslations('categories');
  const tDesc = useTranslations('categoryDescriptions');

  const icon = categoryIcons[category] || '🔄';

  return (
    <Link
      href={`/convert/${category}`}
      className={styles.card}
      style={{ animationDelay: `${index * 60}ms` }}
      id={`category-card-${category}`}
    >
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{tCat(category)}</h3>
      <p className={styles.description}>{tDesc(category)}</p>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
