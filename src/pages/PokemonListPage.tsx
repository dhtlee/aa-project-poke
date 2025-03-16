import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import PaginationRange from '../components/PaginationRange';
import SearchBox from '../components/Searchbox';
import { Pokemon } from "../types/PokemonSummary";
import { PokemonTrie } from "../utils/Trie";

import './PokemonListPage.css';

type PokemonListPageProps = {
  pokemons: Pokemon[];
  pokemonTrie: PokemonTrie;
};

const NUM_POKEMONS_PER_PAGE = 16;

const PokemonListPage = ({ pokemons, pokemonTrie }: PokemonListPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('query') || '';

  const totalPages = useCallback(() => {
    const totalItems = searchQuery ? filteredPokemons.length : pokemons.length;
    return Math.ceil(totalItems / NUM_POKEMONS_PER_PAGE);
  }, [filteredPokemons, pokemons, searchQuery]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleSearch = useCallback((searchTerm: string) => {
    searchParams.set('query', searchTerm);
    searchParams.delete('page'); // Reset to first page on new search
    setSearchParams(searchParams);
    
    if (searchTerm === '') {
      // Reset to showing all pokemons (first page)
      const paginatedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setFilteredPokemons([]);
      setDisplayedPokemons(paginatedPokemons);
    } else {
      // Use the Trie to search for matching pokemons
      const matchedPokemons = pokemonTrie.search(searchTerm);
      setFilteredPokemons(matchedPokemons);
      
      // Display the first page of results
      const paginatedResults = matchedPokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedResults);
    }
  }, [pokemons, searchParams, setSearchParams, pokemonTrie]);

  useEffect(() => {
    // Initialize search if query parameter is present
    const query = searchParams.get('query') || '';
    if (query) {
      handleSearch(query);
    } else {
      // Paginate from all pokemons
      const page = parseInt(searchParams.get('page') || '1', 10);
      const startIndex = (page - 1) * NUM_POKEMONS_PER_PAGE;
      const endIndex = startIndex + NUM_POKEMONS_PER_PAGE;
      const paginatedPokemons = pokemons.slice(startIndex, endIndex);
      setDisplayedPokemons(paginatedPokemons);
    }
  }, [pokemons, searchParams, handleSearch]);

  // Handle pagination changes when page changes
  useEffect(() => {
    const dataset = searchQuery ? filteredPokemons : pokemons;
    const startIndex = (currentPage - 1) * NUM_POKEMONS_PER_PAGE;
    const endIndex = startIndex + NUM_POKEMONS_PER_PAGE;
    const paginatedPokemons = dataset.slice(startIndex, endIndex);
    setDisplayedPokemons(paginatedPokemons);
  }, [currentPage, filteredPokemons, pokemons, searchQuery]);

  return (
    <div className="pokemon-list-container">
      <SearchBox onSearch={handleSearch} initialValue={searchQuery} />
      <div className="card-container">
        {displayedPokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination-container">
        <PaginationRange
          currentPage={currentPage}
          totalPages={totalPages()}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PokemonListPage;