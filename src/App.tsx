import Search from './components/Search';
import Results from './components/Results';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState<
    Array<{ name: string; description: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchResults = (
    results: Array<{ name: string; description: string }>
  ) => {
    setItems(results);
    setError(null);
  };

  const handleSearchError = (errorMessage: string) => {
    setError(errorMessage);
    setItems([]);
  };

  return (
    <>
      <ErrorBoundary>
        <Search
          onSearch={handleSearchResults}
          onError={handleSearchError}
          onLoadingChange={(loading) => setIsLoading(loading)}
        />

        <Results items={items} isLoading={isLoading} error={error} />
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}
