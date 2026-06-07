import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlledForm from '../components/ControlledForm';
import type { IFormData } from '../store/use-users-store';

const mockAddUser = vi.fn();

interface UserStoreState {
  users: IFormData[];
  addUser: (user: IFormData) => void;
}

vi.mock('../store/use-users-store', () => ({
  useUserStore: (selector: (state: UserStoreState) => unknown) => {
    const state: UserStoreState = {
      users: [],
      addUser: mockAddUser,
    };
    return selector(state);
  },
}));

vi.mock('../utils/fileValidation', () => ({
  validateFile: vi.fn(() => null),
  convertToBase64: vi.fn(() => Promise.resolve('base64mockstring')),
}));

describe('ControlledForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockAddUser.mockClear();
  });

  it('should render all form fields', () => {
    render(<ControlledForm onClose={mockOnClose} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload image')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Accept terms and conditions')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should have submit button disabled when form is empty', () => {
    render(<ControlledForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show validation error for invalid email on blur', async () => {
    const user = userEvent.setup();
    render(<ControlledForm onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should submit form when all fields are valid', async () => {
    const user = userEvent.setup();
    render(<ControlledForm onClose={mockOnClose} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'john@test.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm password'), 'Password123!');
    await user.click(screen.getByLabelText('Man'));
    await user.click(screen.getByLabelText('Accept terms and conditions'));

    const countryInput = screen.getByLabelText('Country');
    await user.type(countryInput, 'United States');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockAddUser).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );

    expect(mockOnClose).toHaveBeenCalled();
  });
});
