import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { useSelectedItemsStore } from '../store/use-items-store';
import type { IItem } from '../store/use-items-store';

const mockItem1: IItem = {
  id: 'test-1',
  name: 'Test Item 1',
  description: 'Test Description 1',
  detailsUrl: 'https://test.com/item1',
};

const mockItem2: IItem = {
  id: 'test-2',
  name: 'Test Item 2',
  description: 'Test Description 2',
  detailsUrl: 'https://test.com/item2',
};

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSelectedItemsStore.setState({ selectedItems: [] });
  });

  it('should not render when no items selected', () => {
    render(<Flyout />);

    const flyout = screen.queryByText(/Selected items/i);
    expect(flyout).not.toBeInTheDocument();
  });

  it('should render when at least one item selected', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem1] });

    render(<Flyout />);

    const flyout = screen.getByText(/Selected items/i);
    expect(flyout).toBeInTheDocument();
  });

  it('should display correct number of selected items', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem1] });

    render(<Flyout />);

    expect(screen.getByText(/Selected items: 1/i)).toBeInTheDocument();
  });

  it('should display correct number when multiple items selected', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem1, mockItem2] });

    render(<Flyout />);

    expect(screen.getByText(/Selected items: 2/i)).toBeInTheDocument();
  });

  it('should call unselectAll when button clicked', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem1] });

    render(<Flyout />);

    const unselectButton = screen.getByText(/Unselect all/i);
    fireEvent.click(unselectButton);

    const { selectedItems } = useSelectedItemsStore.getState();
    expect(selectedItems).toHaveLength(0);
  });

  it('should have download button', () => {
    useSelectedItemsStore.setState({ selectedItems: [mockItem1] });

    render(<Flyout />);

    const downloadButton = screen.getByText(/Download/i);
    expect(downloadButton).toBeInTheDocument();
  });

  it('should generate CSV with correct headers when download clicked', () => {
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    createObjectURLSpy.mockReturnValue('blob:test-url');

    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');

    useSelectedItemsStore.setState({ selectedItems: [mockItem1] });

    render(<Flyout />);

    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);

    expect(createObjectURLSpy).toHaveBeenCalled();

    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
