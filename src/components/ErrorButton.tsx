'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ErrorButton() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const t = useTranslations('Error');

  const handleClick = () => {
    setShouldCrash(true);
  };

  if (shouldCrash) {
    throw new Error('Test crash from ErrorButton');
  }
  return (
    <button className="error-btn" onClick={handleClick}>
      {t('test_error')}
    </button>
  );
}
