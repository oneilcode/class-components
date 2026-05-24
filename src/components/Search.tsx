import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [lastSearchItem, setLastSearchItem] = useState('');
  const isInitialMount = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');

  const getItems = useCallback(
    async (searchValue?: string) => {
      const trimmed = (searchValue !== undefined ? searchValue : value).trim();

      if (trimmed === lastSearchItem) return;
      if (trimmed === '') return;

      if (trimmed) {
        setSearchParams({ q: trimmed, page: '1' });
      }

      onLoadingChange(true);

      const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          localStorage.setItem('searchItem', trimmed);
          setLastSearchItem(trimmed);

          const data = await response.json();

          const filteredResults = data.results.filter(
            (item: { name: string }) =>
              item.name.includes(trimmed.toLowerCase())
          );

          const items = filteredResults.map(
            (item: { name: string; url: string }) => ({
              name: item.name,
              description: `Pokémon - ${item.name}`,
              detailsUrl: item.url,
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
    [value, lastSearchItem, onSearch, onLoadingChange, onError, setSearchParams]
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
