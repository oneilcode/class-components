import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserList } from '../components/UserList';
import type { IFormData } from '../store/use-users-store';

const mockUsers = vi.fn(() => []);

interface UserStoreState {
  users: IFormData[];
  addUser: (user: IFormData) => void;
}

vi.mock('../store/use-users-store', () => ({
  useUserStore: (selector: (state: UserStoreState) => unknown) => {
    const state: UserStoreState = {
      users: mockUsers(),
      addUser: vi.fn(),
    };
    return selector(state);
  },
}));

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should highlight newly added user', () => {
    const oldUsers = [
      {
        id: 1,
        name: 'Old User',
        age: 20,
        email: 'old@test.com',
        gender: 'man',
        country: 'USA',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: '',
      },
    ];

    mockUsers.mockReturnValue(oldUsers);
    const { rerender } = render(<UserList />);

    const newUsers = [
      ...oldUsers,
      {
        id: 2,
        name: 'New User',
        age: 25,
        email: 'new@test.com',
        gender: 'woman',
        country: 'Canada',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: '',
      },
    ];

    mockUsers.mockReturnValue(newUsers);
    rerender(<UserList />);

    const newUserCard = screen.getByText('New User').closest('.card');
    expect(newUserCard).toHaveClass('highlight');
  });

  it('should render container when no users', () => {
    mockUsers.mockReturnValue([]);
    render(<UserList />);

    const container = document.querySelector('.cards-container');
    expect(container).toBeInTheDocument();
  });

  it('should render user cards when users exist', () => {
    const mockUsersData: IFormData[] = [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@test.com',
        gender: 'man',
        country: 'USA',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: '',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 30,
        email: 'jane@test.com',
        gender: 'woman',
        country: 'Canada',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: '',
      },
    ];

    mockUsers.mockReturnValue(mockUsersData);
    render(<UserList />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/jane@test\.com/)).toBeInTheDocument();
    expect(screen.getByText(/30 years old/)).toBeInTheDocument();
    expect(screen.getByText(/Canada/)).toBeInTheDocument();
    expect(screen.getByText('man')).toBeInTheDocument();
    expect(screen.getByText('woman')).toBeInTheDocument();
  });

  it('should display image when file exists', () => {
    const mockUsersData: IFormData[] = [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@test.com',
        gender: 'man',
        country: 'USA',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: 'data:image/png;base64,test123',
      },
    ];

    mockUsers.mockReturnValue(mockUsersData);
    render(<UserList />);

    const img = screen.getByAltText('John Doe');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/png;base64,test123');
  });

  it('should display default image when no file', () => {
    const mockUsersData: IFormData[] = [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@test.com',
        gender: 'man',
        country: 'USA',
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        file: '',
      },
    ];

    mockUsers.mockReturnValue(mockUsersData);
    render(<UserList />);

    const img = screen.getByAltText('John Doe');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBeTruthy();
  });
});
