import { useState, useCallback, useEffect, useRef } from 'react';
import type { IItem } from '../store/use-items-store';

interface SearchProps {
  onSearch: (items: IItem[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError: (errorMessage: string) => void;
}

export default function Search({
  onSearch,
  onLoadingChange,
  onError,
}: SearchProps) {
  const [value, setValue] = useState('');
  const [lastSearchItem, setLastSearchItem] = useState('');
  const isInitialMount = useRef(true);

  const getItems = useCallback(
    async (searchValue?: string) => {
      const trimmed = (searchValue !== undefined ? searchValue : value).trim();

      if (trimmed === lastSearchItem) return;
      if (trimmed === '') return;

      onLoadingChange(true);

      const url = `https://www.gov.uk/api/search.json?q=${trimmed}&count=10`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          localStorage.setItem('searchItem', trimmed);
          setLastSearchItem(trimmed);

          const data = await response.json();
          const items = data.results.map(
            (item: { title: string; description: string }) => ({
              id: item.title,
              name: item.title,
              description: item.description,
            })
          );
          onSearch(items);
        } else {
          onError(`Server error: ${response.status}. Please try later.`);
        }
      } catch {
        onError('Cannot load, try later.');
      } finally {
        onLoadingChange(false);
      }
    },
    [value, lastSearchItem, onSearch, onLoadingChange, onError]
  );

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const saved = localStorage.getItem('searchItem');
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(saved);
        setLastSearchItem(saved);
        getItems(saved);
      } else {
        getItems();
      }
    }
  }, [getItems]);

  return (
    <div className="search-wrapper">
      <input value={value} onChange={handleSearchItem} />
      <button onClick={() => getItems()}>Search</button>
    </div>
  );
}
