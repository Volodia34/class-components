import { Component } from "react";
import style from "./Search.module.css";

interface Props {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    this.props.onSearch(trimmedSearchTerm);
  };

  render() {
    return (
      <div>
        <input
          className={style.searchInput}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className={style.searchButton} onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
