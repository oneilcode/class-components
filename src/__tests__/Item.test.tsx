import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../components/Item';
import { useSelectedItemsStore } from '../store/use-items-store';
import type { IItem } from '../store/use-items-store';

const mockItem: IItem = {
  id: 'test-1',
  name: 'Test Item',
  description: 'Test Description',
  detailsUrl: 'https://test.com/item',
};

describe('Item Component', () => {
  beforeEach(() => {
    useSelectedItemsStore.setState({ selectedItems: [] });
  });

  it('should render item name and description', () => {
    render(<Item item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should display checkbox unchecked when item is not selected', () => {
    render(<Item item={mockItem} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should display checkbox checked when item is selected', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem] });
    render(<Item item={mockItem} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should call toggleItem when checkbox clicked', () => {
    const { toggleItem } = useSelectedItemsStore.getState();
    let toggledItem: IItem | null = null;

    const originalToggle = toggleItem;
    Object.assign(useSelectedItemsStore.getState(), {
      toggleItem: (item: IItem) => {
        toggledItem = item;
      },
    });

    render(<Item item={mockItem} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(toggledItem).toEqual(mockItem);

    Object.assign(useSelectedItemsStore.getState(), {
      toggleItem: originalToggle,
    });
  });
});
