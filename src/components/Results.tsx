'use client';

import { useMemo } from 'react';
import type { IItem } from '../store/use-items-store';
import Item from './Item';
import Pagination from './Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ROWS_PER_PAGE = 10;
interface ResultsProps {
  items: IItem[];
  isLoading: boolean;
  error: string | null;
}

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

export default function Results({ items, isLoading, error }: ResultsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams?.get('page')) || 1;
  const t = useTranslations('Results');

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  }, [items, page]);

  const updateUrlParams = (newPage: number) => {
    const params = new URLSearchParams();
    const currentQuery = searchParams?.get('q') || '';
    params.set('q', currentQuery);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleNextPageClick = () => {
    const next = page + 1;
    updateUrlParams(next);
  };

  const handlePrevPageClick = () => {
    const prev = page - 1;
    updateUrlParams(prev);
  };

  if (isLoading) return <div>{t('loading')}...</div>;

  if (error) return <div>{error}</div>;

  if (items.length === 0) return <div>{t('no_results_found')}</div>;

  return (
    <div className="results-wrapper">
      <h1>{t('results')}</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>{t('selected')}</th>
            <th>{t('item_name')}</th>
            <th>{t('item_desc')}</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </tbody>
      </table>

      {items && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(items.length),
          }}
          nav={{ current: page, total: getTotalPageCount(items.length) }}
        />
      )}
    </div>
  );
}
