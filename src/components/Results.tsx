import { Component } from 'react';
interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export default class Results extends Component<ResultsProps> {
  render() {
    if (this.props.isLoading) {
      return <div className="results-wrapper">Loading...</div>;
    }

    if (this.props.error) {
      return (
        <div className="results-wrapper">
          <div className="error-message">{this.props.error}</div>
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
            {this.props.items.map((item) => (
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
}
