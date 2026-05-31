import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from '../components/Search';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

vi.mock('../api/pokemonApi', () => ({
  default: vi.fn(),
}));

import fetchPokemons from '../api/pokemonApi';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

const renderWithProviders = (component: React.ReactNode) => {
  const queryClient = createTestQueryClient();
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders search input and button', () => {
    renderWithProviders(<Search />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Search />);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'hello world');
    expect(input).toHaveValue('hello world');
  });

  it('shows loading state while fetching', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockImplementation(() => new Promise(() => {}));

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API error correctly', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockRejectedValue(new Error('Network error'));

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(
      await screen.findByText(/network error|check your connection/i)
    ).toBeInTheDocument();
  });

  it('trims whitespace from input before search', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockResolvedValue([]);

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '  pikachu  ');
    mockFetchPokemons.mockClear();
    await user.click(button);

    expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu');
  });

  it('caches search results and reuses them without refetching', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockResolvedValue([
      { name: 'pikachu', description: 'Pokemon - pikachu', url: '...' },
    ]);

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);
    await screen.findByText('pikachu');

    mockFetchPokemons.mockClear();

    await user.click(button);

    expect(mockFetchPokemons).not.toHaveBeenCalled();
  });

  it('invalidates cache after refresh button click', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockResolvedValue([
      { name: 'pikachu', description: 'Pokemon - pikachu', url: '...' },
    ]);

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const refreshButton = screen.getByRole('button', { name: /refresh/i });

    await user.type(input, 'pikachu');
    await user.click(searchButton);
    await screen.findByText('pikachu');

    mockFetchPokemons.mockClear();

    await user.click(refreshButton);

    expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu');
  });

  it('caches different search terms separately', async () => {
    const mockFetchPokemons = vi.mocked(fetchPokemons);
    mockFetchPokemons.mockResolvedValue([]);

    const user = userEvent.setup();
    renderWithProviders(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'pikachu');
    await user.click(button);
    await waitFor(() =>
      expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu')
    );

    mockFetchPokemons.mockClear();

    await user.clear(input);
    await user.type(input, 'bulbasaur');
    await user.click(button);
    await waitFor(() =>
      expect(mockFetchPokemons).toHaveBeenCalledWith('bulbasaur')
    );

    mockFetchPokemons.mockClear();

    await user.clear(input);
    await user.type(input, 'pikachu');
    await user.click(button);

    expect(mockFetchPokemons).not.toHaveBeenCalled();
  });

  it.skip('displays saved search term from localStorage on mount', () => {
    localStorage.setItem('searchItem', 'saved term');
    renderWithProviders(<Search />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('saved term');
  });
});
