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
import { useTheme } from './context/hooks/useTheme';
import type { IItem } from './store/use-items-store';

export default function App() {
  const { isDark } = useTheme();
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchResults = (results: IItem[]) => {
    setItems(results);
    setError(null);
  };

  const handleSearchError = (errorMessage: string) => {
    setError(errorMessage);
    setItems([]);
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
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
    </div>
  );
}
