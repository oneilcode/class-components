import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IItem } from '../store/use-items-store';
import Item from './Item';
import Pagination from './Pagination';

interface ResultsProps {
  items: IItem[];
  isLoading: boolean;
  error: string | null;
}

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

export default function Results({ items, isLoading, error }: ResultsProps) {
  const [page, setPage] = useState(1);

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  }, [items, page]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = items ? getTotalPageCount(items.length) : current;

    setPage(next <= total ? next : current);
  }, [page, items]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const prevItemsLength = useRef(items.length);
  useEffect(() => {
    if (prevItemsLength.current !== items.length) {
      setPage(1);
      prevItemsLength.current = items.length;
    }
  }, [items.length]);

  if (isLoading) {
    return <div className="results-wrapper">Loading...</div>;
  }

  if (error) {
    return (
      <div className="results-wrapper">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="results-wrapper">
      <h1>Search results</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>Selected</th>
            <th>Item Name</th>
            <th>Item Description</th>
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
