import React, { useState, useEffect } from 'react';

import MagnifyingGlass from "../image/magnifying-glass";

import './Searchbox.css';

type SearchBoxProps = {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-box">
      <MagnifyingGlass className="magnifying-glass-icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;