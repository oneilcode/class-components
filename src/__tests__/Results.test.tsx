import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from '../components/Results';

const mockItems = [
  {
    id: '1',
    name: 'Item 1',
    description: 'Description 1',
    url: '/item/1',
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Description 2',
    url: '/item/2',
  },
  {
    id: '3',
    name: 'Item 3',
    description: 'Description 3',
    url: '/item/3',
  },
];

describe('Results Component', () => {
  it('renders loading state', () => {
    render(
      <BrowserRouter>
        <Results items={[]} isLoading={true} error={null} />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    const errorMessage = 'Something went wrong';
    render(
      <BrowserRouter>
        <Results items={[]} isLoading={false} error={errorMessage} />
      </BrowserRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders correct number of items when data is provided', () => {
    render(
      <BrowserRouter>
        <Results items={mockItems} isLoading={false} error={null} />
      </BrowserRouter>
    );

    expect(screen.getByText('Search results')).toBeInTheDocument();
    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByText('Item Description')).toBeInTheDocument();

    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('shows empty state when items array is empty', () => {
    render(
      <BrowserRouter>
        <Results items={[]} isLoading={false} error={null} />
      </BrowserRouter>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});
