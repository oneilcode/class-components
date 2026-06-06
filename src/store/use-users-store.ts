import { create } from 'zustand';

export interface IFormData {
  id: number;
  name: string;
  age: number;
  email: string;
  gender: 'Man' | 'Woman';
  terms: boolean;
  password: string;
  confirmPassword: string;
  file: string;
}

interface UserStore {
  users: IFormData[];
  addUser: (user: IFormData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...userData,
          id: Date.now(),
        },
      ],
    })),
}));
