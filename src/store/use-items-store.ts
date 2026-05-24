import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IItem {
  name: string;
  description: string;
  url: string;
}

interface ISelectedItemsStore {
  selectedItems: IItem[];
  toggleItem: (item: IItem) => void;
  unselectAll: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectedItemsStore = create<ISelectedItemsStore>()(
  persist(
    (set, get) => ({
      selectedItems: [],

      toggleItem: (item) =>
        set((state) => {
          const isAlreadySelected = state.selectedItems.some(
            (selected) => selected.name === item.name
          );

          if (isAlreadySelected) {
            return {
              selectedItems: state.selectedItems.filter(
                (selected) => selected.name !== item.name
              ),
            };
          } else {
            return {
              selectedItems: [...state.selectedItems, item],
            };
          }
        }),

      unselectAll: () => set({ selectedItems: [] }),

      isSelected: (name) => {
        const state = get();
        return state.selectedItems.some((item) => item.name === name);
      },
    }),
    {
      name: 'selected-items',
    }
  )
);
