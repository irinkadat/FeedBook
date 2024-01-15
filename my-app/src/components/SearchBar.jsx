import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  const handleReset = () => {
    setQuery("");
    onReset();
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  useEffect(() => {
    if (query.trim() === "") {
      handleReset();
    } else {
      handleSearch();
    }
  }, [query]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={handleInput}
      />
      <button className="s-btn" onClick={handleSearch}>
        Search
      </button>
      <button className="s-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
