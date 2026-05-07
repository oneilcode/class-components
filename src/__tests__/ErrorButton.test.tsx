import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from '../components/ErrorButton';

describe('ErrorButton Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders button', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: /test error|simulate crash/i })
    ).toBeInTheDocument();
  });

  it('throws error when clicked', async () => {
    const user = userEvent.setup();

    let errorThrown = false;

    try {
      render(<ErrorButton />);
      const button = screen.getByRole('button');
      await user.click(button);
    } catch {
      errorThrown = true;
    }

    expect(errorThrown).toBe(true);
  });

  it('has correct button text', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toMatch(/test error|simulate crash/i);
  });
});
