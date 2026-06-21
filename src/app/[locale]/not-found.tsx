'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
