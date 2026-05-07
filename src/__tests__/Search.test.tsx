import { render, screen } from '@testing-library/react';
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
});
