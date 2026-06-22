import { useTranslations } from 'next-intl';
import { useSelectedItemsStore, type IItem } from '../store/use-items-store';

export default function Flyout() {
  const { selectedItems, unselectAll } = useSelectedItemsStore();
  const t = useTranslations('Flyout');

  const convertToCSV = (data: IItem[]) => {
    if (data.length === 0) return '';
    const headers: (keyof IItem)[] = ['name', 'description', 'url'];

    const rows = data.map((obj) =>
      headers
        .map((fieldName) => {
          const value = obj[fieldName];
          const stringValue = value !== undefined ? String(value) : '';

          if (
            stringValue.includes(',') ||
            stringValue.includes('"') ||
            stringValue.includes('\n')
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }

          return stringValue;
        })
        .join(',')
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
          <div>
            {t('selected')}: {selectedItems.length}
          </div>
          <div className="flyout-buttons">
            <button onClick={unselectAll}>{t('unselect')}</button>
            <button onClick={() => downloadCSV(selectedItems)}>
              {t('download')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
