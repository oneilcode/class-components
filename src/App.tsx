import Search from './components/Search';
import Results from './components/Results';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout';

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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <div>
                  <Search
                    onSearch={handleSearchResults}
                    onError={handleSearchError}
                    onLoadingChange={setIsLoading}
                  />
                  <Results items={items} isLoading={isLoading} error={error} />
                  <ErrorButton />
                </div>
              }
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}
