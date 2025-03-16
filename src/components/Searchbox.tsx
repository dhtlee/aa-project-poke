import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from 'use-debounce';

import MagnifyingGlass from "../image/magnifying-glass";

import './Searchbox.css';

type SearchBoxProps = {
  onSearch: (searchTerm: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedQuery] = useDebounce(searchParams.get('query'), 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchParams(query ? { query } : {});
  };

  useEffect(() => {
    onSearch(debouncedQuery || '');
  }, [debouncedQuery, onSearch]);

  return (
    <div className="search-box">
      <MagnifyingGlass className="magnifying-glass-icon"/>
      <input
        type="text"
        placeholder="Search"
        value={searchParams.get('query') || ''}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBox;