import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search';

const mockOnSearch = vi.fn();
const mockOnError = vi.fn();
const mockOnLoadingChange = vi.fn();

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders search input and button', () => {
    render(
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

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('saved term');
  });

  it('shows empty input when no saved term exists', () => {
    localStorage.getItem = vi.fn().mockReturnValue(null);

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
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

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(button);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith(
        expect.stringContaining('Server error: 500')
      );
    });
  });

  it('successfully fetches data', async () => {
    const user = userEvent.setup();

    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [
          {
            title: 'Test Item',
            description: 'Test Description',
            link: '/test-item',
          },
        ],
      }),
    };

    const fetchMock = vi.fn().mockResolvedValue(mockResponse as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(button);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith([
        {
          id: 'Test Item',
          name: 'Test Item',
          description: 'Test Description',
          detailsUrl: 'https://www.gov.uk/test-item',
        },
      ]);
    });
  });

  it('trims whitespace from input', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, '  test  ');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('q=test'));
  });

  it('does not search when input is empty', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not search again if term unchanged', async () => {
    const user = userEvent.setup();
    let callCount = 0;
    const fetchMock = vi.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        ok: true,
        json: async () => ({ results: [] }),
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(button);
    await user.click(button);

    expect(callCount).toBe(1);
  });

  it('saves search term to localStorage after search', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(localStorage, 'setItem');

    const mockResponse = {
      ok: true,
      json: async () => ({ results: [] }),
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'pokemon');
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith('searchItem', 'pokemon');
  });

  it('overwrites localStorage when new search is performed', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(localStorage, 'setItem');

    const mockResponse = {
      ok: true,
      json: async () => ({ results: [] }),
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    render(
      <Search
        onSearch={mockOnSearch}
        onError={mockOnError}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'first');
    await user.click(button);

    await user.clear(input);
    await user.type(input, 'second');
    await user.click(button);

    expect(setItemSpy).toHaveBeenLastCalledWith('searchItem', 'second');
  });
});
