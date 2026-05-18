interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
  }>;
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

  return (
    <div className="results-wrapper">
      <h1>Search results</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
