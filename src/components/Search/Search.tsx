import React, { useState, useEffect } from "react";
import style from "./Search.module.css";

interface Props {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const Search: React.FC<Props> = ({
  onSearch,
  searchTerm: initialSearchTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    onSearch(trimmedSearchTerm);
  };

  return (
    <div>
      <input
        className={style.searchInput}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={style.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
