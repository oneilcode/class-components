import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

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

  it('fetches data on initial load with saved search term', async () => {
    localStorage.getItem = vi.fn().mockReturnValue('test query');

    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [
          { title: 'Test Result 1', description: 'Description 1' },
          { title: 'Test Result 2', description: 'Description 2' },
        ],
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Result 1')).toBeInTheDocument();
    });
  });

  it('handles search correctly', async () => {
    const user = userEvent.setup();

    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [{ title: 'Search Result', description: 'Found!' }],
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'pokemon');
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=pokemon')
      );
    });
  });

  it('shows loading state during API call', async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles API error correctly', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/wrong|error/i)).toBeInTheDocument();
    });
  });
});
