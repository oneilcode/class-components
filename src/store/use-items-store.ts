import { create } from 'zustand';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface ISelectedItemsStore {
  selectedItems: Item[];
  toggleItem: (item: Item) => void;
  unselectAll: () => void;
  isSelected: (id: number) => boolean;
}

export const useSelectedItemsStore = create<ISelectedItemsStore>()(
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

    isSelected: (id: number) => {
      const state = get();
      return state.selectedItems.some((item) => item.id === id);
    },
  })
);
