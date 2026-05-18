import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results';

const mockItems = [
  { name: 'Item 1', description: 'Description 1' },
  { name: 'Item 2', description: 'Description 2' },
  { name: 'Item 3', description: 'Description 3' },
];

describe('Results Component', () => {
  it('renders loading state', () => {
    render(<Results items={[]} isLoading={true} error={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    const errorMessage = 'Something went wrong';
    render(<Results items={[]} isLoading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders correct number of items when data is provided', () => {
    render(<Results items={mockItems} isLoading={false} error={null} />);

    expect(screen.getByText('Search results')).toBeInTheDocument();
    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByText('Item Description')).toBeInTheDocument();

    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('shows empty state when items array is empty', () => {
    render(<Results items={[]} isLoading={false} error={null} />);

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});
