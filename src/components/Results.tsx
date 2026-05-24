import { useMemo } from 'react';
import type { IItem } from '../store/use-items-store';
import Item from './Item';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';

interface ResultsProps {
  items: IItem[];
  isLoading: boolean;
  error: string | null;
}

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

export default function Results({ items, isLoading, error }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  }, [items, page]);

  const handleNextPageClick = () => {
    const next = page + 1;
    const currentQuery = searchParams.get('q') || '';
    setSearchParams({ q: currentQuery, page: next.toString() });
  };

  const handlePrevPageClick = () => {
    const prev = page - 1;
    const currentQuery = searchParams.get('q') || '';
    setSearchParams({ q: currentQuery, page: prev.toString() });
  };

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
