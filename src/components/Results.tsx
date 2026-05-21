import type { IItem } from '../store/use-items-store';
import Item from './Item';

interface ResultsProps {
  items: IItem[];
  isLoading: boolean;
  error: string | null;
}

export default function Results({ items, isLoading, error }: ResultsProps) {
  if (isLoading) {
    return <div className="results-wrapper">Loading...</div>;
  }

  if (error) {
    return (
      <div className="results-wrapper">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="results-wrapper">
      <h1>Search results</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>Selected</th>
            <th>Item Name</th>
            <th>Item Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
