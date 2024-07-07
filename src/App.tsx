import { Component } from "react";
import "./App.css";
import { fetchCharacters } from "./api/api";
import Search from "./components/Search";
import Results from "./components/Results";
import Pagination from "./components/Pagination";
import ErrorBoundary from "./components/ErrorBoundary";

interface State {
  searchTerm: string;
  results: Array<{
    name: string;
    status: string;
    species: string;
    image: string;
  }>;
  hasError: boolean;
  noResults: boolean;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  simulateError: boolean;
}

class App extends Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      hasError: false,
      noResults: false,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      simulateError: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    this.setState({ searchTerm: savedSearchTerm }, () => {
      this.handleSearch(savedSearchTerm);
    });
  }

  handleSearch = (searchTerm: string, page: number = 1) => {
    this.setState({ isLoading: true, searchTerm });
    const startTime = Date.now();

    fetchCharacters(searchTerm.trim(), page).then((data) => {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      setTimeout(() => {
        this.setState({
          results: data.results,
          noResults: data.results.length === 0,
          currentPage: page,
          totalPages: data.totalPages,
          isLoading: false,
        });
      }, remainingTime);
    });
    localStorage.setItem("searchTerm", searchTerm.trim());
  };

  handlePageChange = (page: number) => {
    this.handleSearch(this.state.searchTerm, page);
  };

  throwError = () => {
    this.setState({ simulateError: true });
  };

  render() {
    if (this.state.simulateError) {
      throw new Error("Test error");
    }

    return (
      <ErrorBoundary>
        <div className="App">
          <div className="section-top">
            <img
              src='../public/images/rick-and-morty-logo.png'
              alt="logo"
            />
            <Search
              onSearch={this.handleSearch}
              searchTerm={this.state.searchTerm}
            />
            <button className="errorBtn" onClick={this.throwError}>
              Throw Error
            </button>
          </div>
          <div className="section-bottom">
            {this.state.isLoading ? (
              <p className="loading">Loading...</p>
            ) : (
              <>
                <Results
                  results={this.state.results}
                  noResults={this.state.noResults}
                />
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPages={this.state.totalPages}
                  onPageChange={this.handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
