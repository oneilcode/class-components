import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useSelectedItemsStore } from '../store/use-items-store';
import type { IItem } from '../store/use-items-store';

const mockItem1: IItem = {
  name: 'Test Item 1',
  description: 'Description 1',
  url: 'https://test.com/1',
};

const mockItem2: IItem = {
  name: 'Test Item 2',
  description: 'Description 2',
  url: 'https://test.com/2',
};

describe('useSelectedItemsStore', () => {
  beforeEach(() => {
    useSelectedItemsStore.setState({ selectedItems: [] });
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty selectedItems', () => {
    const { selectedItems } = useSelectedItemsStore.getState();
    expect(selectedItems).toEqual([]);
    expect(selectedItems.length).toBe(0);
  });

  it('should add item when toggling if not selected', () => {
    const { toggleItem } = useSelectedItemsStore.getState();

    toggleItem(mockItem1);

    const { selectedItems } = useSelectedItemsStore.getState();
    expect(selectedItems).toHaveLength(1);
    expect(selectedItems[0]).toEqual(mockItem1);
  });

  it('should remove item when toggling if already selected', () => {
    const { toggleItem } = useSelectedItemsStore.getState();

    toggleItem(mockItem1);
    expect(useSelectedItemsStore.getState().selectedItems).toHaveLength(1);

    toggleItem(mockItem1);
    expect(useSelectedItemsStore.getState().selectedItems).toHaveLength(0);
  });

  it('should unselect all items', () => {
    const { toggleItem, unselectAll } = useSelectedItemsStore.getState();

    toggleItem(mockItem1);
    toggleItem(mockItem2);
    expect(useSelectedItemsStore.getState().selectedItems).toHaveLength(2);

    unselectAll();
    expect(useSelectedItemsStore.getState().selectedItems).toHaveLength(0);
  });

  it('should return true if item is selected', () => {
    const { toggleItem, isSelected } = useSelectedItemsStore.getState();

    toggleItem(mockItem1);

    expect(isSelected(mockItem1.name)).toBe(true);
  });

  it('should return false if item is not selected', () => {
    const { isSelected } = useSelectedItemsStore.getState();

    expect(isSelected('nonexistent')).toBe(false);
    expect(isSelected(mockItem1.name)).toBe(false);
  });
});
