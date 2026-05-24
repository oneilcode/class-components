import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';

type MockFetch = ReturnType<typeof vi.fn>;

describe('App Integration Tests', () => {
  let mockFetch: MockFetch;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('handles search correctly', async () => {
    const user = userEvent.setup();

    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon/26/' },
        ],
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'pikachu');
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );
    });

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('shows loading state during API call', async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API error correctly', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/cannot load, try later/i)).toBeInTheDocument();
    });
  });
});
