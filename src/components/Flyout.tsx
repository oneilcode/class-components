import { useSelectedItemsStore, type IItem } from '../store/use-items-store';

export default function Flyout() {
  const { selectedItems, unselectAll } = useSelectedItemsStore();

  const convertToCSV = (data: IItem[]) => {
    const headers = Object.keys(data[0]);

    const rows = data.map((obj) =>
      headers.map((fieldName) => JSON.stringify(obj[fieldName] || '')).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  };

  const downloadCSV = (
    data: IItem[],
    filename = selectedItems.length + '_items.csv'
  ) => {
    const csv = convertToCSV(data);

    const blob = new Blob([csv], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {selectedItems.length !== 0 && (
        <div className="flyout">
          <div>Selected items: {selectedItems.length}</div>
          <div className="flyout-buttons">
            <button onClick={unselectAll}>Unselect all</button>
            <button onClick={() => downloadCSV(selectedItems)}>Download</button>
          </div>
        </div>
      )}
    </>
  );
}
