'use client';

import ErrorButton from '@/components/ErrorButton';
import Search from '@/components/Search';

import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div>Loading search...</div>}>
        <Search />
      </Suspense>
      <ErrorButton />
    </>
  );
}
