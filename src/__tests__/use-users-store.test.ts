import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../store/use-users-store';

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({ users: [] });
  });

  describe('initial state', () => {
    it('should have empty users array', () => {
      const users = useUserStore.getState().users;
      expect(users).toEqual([]);
    });
  });

  describe('addUser', () => {
    it('should add a new user to the store', () => {
      const newUser = {
        id: 0,
        name: 'John Doe',
        age: 25,
        email: 'john@test.com',
        gender: 'man' as const,
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        country: 'USA',
        file: 'base64string',
      };

      useUserStore.getState().addUser(newUser);
      const users = useUserStore.getState().users;

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe('John Doe');
      expect(users[0].email).toBe('john@test.com');
    });

    it('should add multiple users to the store', () => {
      const user1 = {
        id: 0,
        name: 'John',
        age: 25,
        email: 'john@test.com',
        gender: 'man' as const,
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        country: 'USA',
        file: '',
      };
      const user2 = {
        id: 0,
        name: 'Jane',
        age: 30,
        email: 'jane@test.com',
        gender: 'woman' as const,
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        country: 'Canada',
        file: '',
      };

      useUserStore.getState().addUser(user1);
      useUserStore.getState().addUser(user2);
      const users = useUserStore.getState().users;

      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('John');
      expect(users[1].name).toBe('Jane');
    });

    it('should not remove existing users when adding new one', () => {
      const existingUser = {
        id: 0,
        name: 'Existing',
        age: 20,
        email: 'existing@test.com',
        gender: 'man' as const,
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        country: 'USA',
        file: '',
      };

      const newUser = {
        id: 0,
        name: 'New',
        age: 25,
        email: 'new@test.com',
        gender: 'woman' as const,
        terms: true,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        country: 'Canada',
        file: '',
      };

      useUserStore.getState().addUser(existingUser);
      useUserStore.getState().addUser(newUser);
      const users = useUserStore.getState().users;

      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('Existing');
      expect(users[1].name).toBe('New');
    });
  });
});
