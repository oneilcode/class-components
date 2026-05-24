import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Search from '../components/Search';

const mockOnSearch = vi.fn();
const mockOnError = vi.fn();
const mockOnLoadingChange = vi.fn();

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders search input and button', () => {
    renderWithRouter(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays saved search term from localStorage on mount', () => {
    localStorage.getItem = vi.fn().mockReturnValue('saved term');

    renderWithRouter(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('saved term');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'hello world');

    expect(input).toHaveValue('hello world');
  });

  it('handles HTTP error response', async () => {
    const user = userEvent.setup();

    const errorResponse = {
      ok: false,
      status: 500,
      json: async () => ({}),
    };

    const fetchMock = vi.fn().mockResolvedValue(errorResponse as Response);
    vi.stubGlobal('fetch', fetchMock);

    renderWithRouter(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.clear(input);
    await user.type(input, 'test');
    await user.click(button);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith(
        expect.stringContaining('Server error: 500')
      );
    });
  });

  it('trims whitespace from input', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderWithRouter(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.clear(input);
    await user.type(input, '  pikachu  ');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
  });
});
