import { Component } from 'react';

interface SearchProps {
  onSearch: (items: Array<{ name: string; description: string }>) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError: (errorMessage: string) => void;
}

interface SearchState {
  value: string;
  lastSearchItem: string;
}
export default class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    value: '',
    lastSearchItem: '',
  };

  componentDidMount(): void {
    const saved = localStorage.getItem('searchItem');

    this.setState({ value: saved || '' }, () => {
      this.getItems();
    });
  }

  getItems = async (): Promise<void> => {
    const trimmed = this.state.value.trim();

    if (trimmed === this.state.lastSearchItem) return;
    if (trimmed === '') return;

    this.props.onLoadingChange(true);

    const url = `https://www.gov.uk/api/search.json?q=${trimmed}&count=10`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        localStorage.setItem('searchItem', trimmed);

        this.setState({ lastSearchItem: trimmed });

        const data = await response.json();
        const items = data.results.map((item) => ({
          name: item.title,
          description: item.description,
        }));
        this.props.onSearch(items);
        this.props.onLoadingChange(false);
      } else {
        this.props.onError(
          `Server error: ${response.status}. Please try later.`
        );
        this.props.onLoadingChange(false);
      }
    } catch {
      this.props.onError('Cannot load, try later.');
      this.props.onLoadingChange(false);
    }
  };

  handleSearchItem = (e: { target: { value: string } }) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onError('');
  };

  render() {
    return (
      <div className="search-wrapper">
        <input value={this.state.value} onChange={this.handleSearchItem} />
        <button onClick={() => this.getItems()}>Search</button>
      </div>
    );
  }
}
