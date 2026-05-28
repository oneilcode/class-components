import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

async function fetchPokemons(searchTerm: string) {
  if (!searchTerm) return [];

  const response = await fetch(POKEMON_URL);
  const data = await response.json();

  const filteredResults = data.results.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredResults.map((item: { name: string; url: string }) => ({
    name: item.name,
    description: `Pokemon - ${item.name}`,
    url: item.url,
  }));
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemons', searchTerm],
    queryFn: () => fetchPokemons(searchTerm),
    enabled: searchTerm.length > 0,
  });

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <>
      <div className="search-wrapper">
        <input value={value} onChange={handleInputChange} />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <Results
        items={data || []}
        isLoading={isLoading}
        error={error?.message || null}
      />
    </>
  );
}
