import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
  }>;
  isLoading: boolean;
  error: string | null;
}
export default class App extends Component {
  state: ResultsProps = {
    items: [],
    isLoading: false,
    error: null,
  };

  handleSearchResults = (
    results: Array<{ name: string; description: string }>
  ) => {
    this.setState({ items: results });
  };

  handleSearchError = (errorMessage: string) => {
    this.setState({ error: errorMessage, items: [] });
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <Search
            onSearch={this.handleSearchResults}
            onError={this.handleSearchError}
            onLoadingChange={(isLoading) => this.setState({ isLoading })}
          />

          <Results
            items={this.state.items}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}
