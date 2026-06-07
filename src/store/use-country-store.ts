import { create } from 'zustand';

interface ICountryStore {
  countries: string[];
}

export const useCountryStore = create<ICountryStore>(() => ({
  countries: [
    'Australia',
    'Austria',
    'Brazil',
    'Canada',
    'China',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Mexico',
    'Russia',
    'Spain',
    'United Kingdom',
    'United States',
  ],
}));
