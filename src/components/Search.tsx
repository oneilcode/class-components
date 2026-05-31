import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Results from './Results';
import fetchPokemons from '../api/pokemonApi';
import RefreshButton from './RefreshButton';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemons', searchTerm],
    queryFn: () => fetchPokemons(searchTerm),
    enabled: searchTerm.length > 0,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const urlParam = searchParams.get('q');
    if (urlParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(urlParam);
      setSearchTerm(urlParam);
      return;
    }

    const saved = localStorage.getItem('searchItem');
    if (saved) {
      setValue(saved);
      setSearchTerm(saved);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem('searchItem', searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = value.trim();
    if (trimmed) {
      setSearchTerm(trimmed);
      setSearchParams({ q: trimmed, page: '1' });
    }
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemons'] });
  };

  return (
    <>
      <div className="search-wrapper">
        <input value={value} onChange={handleInputChange} />
        <button onClick={handleSearchClick}>Search</button>
        <RefreshButton clickRefresh={handleRefresh} />
      </div>
      <Results
        items={data || []}
        isLoading={isLoading}
        error={error?.message || null}
      />
    </>
  );
}
