import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IItem {
  id: string;
  name: string;
  description: string;
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
            (selected) => selected.id === item.id
          );

          if (isAlreadySelected) {
            return {
              selectedItems: state.selectedItems.filter(
                (selected) => selected.id !== item.id
              ),
            };
          } else {
            return {
              selectedItems: [...state.selectedItems, item],
            };
          }
        }),

      unselectAll: () => set({ selectedItems: [] }),

      isSelected: (id) => {
        const state = get();
        return state.selectedItems.some((item) => item.id === id);
      },
    }),
    {
      name: 'selected-items',
    }
  )
);
