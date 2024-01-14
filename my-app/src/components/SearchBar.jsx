// components/SearchBar.jsx
import React, { useState } from 'react';
import '../styles/SearchBar.css'; // Import your CSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Pass the query to the parent component (e.g., RecipeListPage)
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn"  onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
