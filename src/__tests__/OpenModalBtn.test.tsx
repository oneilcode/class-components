import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OpenModalBtn from '../components/OpenModalBtn';

describe('OpenModalBtn', () => {
  it('should render button with title', () => {
    const onClick = vi.fn();
    render(<OpenModalBtn title="Test Button" onClick={onClick} />);

    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<OpenModalBtn title="Click Me" onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
