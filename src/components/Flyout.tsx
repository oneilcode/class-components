import { useSelectedItemsStore } from '../store/use-items-store';

export default function Flyout() {
  const { selectedItems, unselectAll } = useSelectedItemsStore();
  return (
    <>
      {selectedItems.length !== 0 && (
        <div className="flyout">
          <div>Selected items: {selectedItems.length}</div>
          <div className="flyout-buttons">
            <button onClick={unselectAll}>Unselect all</button>
            <button>Download</button>
          </div>
        </div>
      )}
    </>
  );
}
