import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../components/UserList', () => ({
  UserList: () => <div>Mock UserList</div>,
}));

vi.mock('../components/UncontrolledForm', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      Mock UncontrolledForm
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock('../components/ControlledForm', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      Mock ControlledForm
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('App', () => {
  it('should render buttons', () => {
    render(<App />);

    expect(screen.getByText('Open uncontrolled form')).toBeInTheDocument();
    expect(screen.getByText('Open React Hook Form')).toBeInTheDocument();
  });

  it('should open uncontrolled form modal when button clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByText('Open uncontrolled form');
    await user.click(button);

    expect(screen.getByText('Mock UncontrolledForm')).toBeInTheDocument();
  });

  it('should open controlled form modal when button clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByText('Open React Hook Form');
    await user.click(button);

    expect(screen.getByText('Mock ControlledForm')).toBeInTheDocument();
  });

  it('should close modal when onClose is called', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByText('Open uncontrolled form');
    await user.click(button);

    expect(screen.getByText('Mock UncontrolledForm')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    await user.click(closeButton);

    expect(screen.queryByText('Mock UncontrolledForm')).not.toBeInTheDocument();
  });
});
