'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('Not_found');
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('title')}</h1>
      <p>{t('decription')}</p>
      <Link href="/">{t('back_home')}</Link>
    </div>
  );
}
