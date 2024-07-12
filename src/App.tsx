import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { fetchCharacters } from "./api/api";
import Search from "./components/Search";
import Results from "./components/Results";
import Pagination from "./components/Pagination";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from "../public/images/rick-and-morty-logo.png";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<
    Array<{
      name: string;
      status: string;
      species: string;
      image: string;
    }>
  >([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  const handleSearch = useCallback((searchTerm: string, page: number = 1) => {
    setIsLoading(true);
    setSearchTerm(searchTerm);

    fetchCharacters(searchTerm.trim(), page).then((data) => {
      setResults(data.results);
      setNoResults(data.results.length === 0);
      setCurrentPage(page);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    });

    localStorage.setItem("searchTerm", searchTerm.trim());
  }, []);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    setSearchTerm(savedSearchTerm);
    handleSearch(savedSearchTerm);
  }, [handleSearch, searchTerm]);

  const handlePageChange = (page: number) => {
    handleSearch(searchTerm, page);
  };

  const throwError = () => {
    setSimulateError(true);
  };

  if (simulateError) {
    throw new Error("Test error");
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="section-top">
          <img src={logo} alt="logo" />
          <Search onSearch={handleSearch} searchTerm={searchTerm} />
          <button className="errorBtn" onClick={throwError}>
            Throw Error
          </button>
        </div>
        <div className="section-bottom">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            <>
              <Results results={results} noResults={noResults} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
