// App.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { fetchCharacters } from "./api/api";
import Search from "./components/Search/Search.tsx";
import Results from "./components/Results/Results.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";
import logo from "../public/images/rick-and-morty-logo.png";
import useSearchTerm from "./hooks/useSearchTerm";
import ErrorBoundary from "./components/ErrorBoundary";
import { Card } from "./types";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [results, setResults] = useState<Card[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulateError, setSimulateError] = useState<boolean>(false);
  const { cardId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback(
    (searchTerm: string, page: number = 1) => {
      setIsLoading(true);
      setSearchTerm(searchTerm);

      const fetchPromise = fetchCharacters(searchTerm.trim(), page);
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 1000),
      );

      Promise.all([fetchPromise, timeoutPromise])
        .then(([data]) => {
          setResults(data.results);
          setNoResults(data.results.length === 0);
          setCurrentPage(page);
          setTotalPages(data.totalPages);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });

      localStorage.setItem("searchTerm", searchTerm.trim());
    },
    [setSearchTerm],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page") || "1", 10);
    handleSearch(searchTerm, page);
  }, [handleSearch, searchTerm, location.search]);

  const handlePageChange = (page: number) => {
    handleSearch(searchTerm, page);
  };

  const handleCardClick = (card: Card) => {
    navigate(`/details/${card.id}`);
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
            <div className="results-container">
              <div className="left-section">
                <Results
                  results={results}
                  noResults={noResults}
                  onCardClick={handleCardClick}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
              {cardId && (
                <div className="right-section">
                  <Outlet />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
