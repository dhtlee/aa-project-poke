import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import PaginationRange from '../components/PaginationRange';
import SearchBox from '../components/Searchbox';
import { Pokemon } from "../types/PokemonSummary";

import './PokemonListPage.css';

type PokemonListPageProps = {
  pokemons: Pokemon[];
};

const NUM_POKEMONS_PER_PAGE = 16;

const PokemonListPage = ({ pokemons }: PokemonListPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = useMemo(() => {
    if (searchParams.get('query')) {
      return Math.ceil(filteredPokemons.length / NUM_POKEMONS_PER_PAGE);
    } else {
      return Math.ceil(pokemons.length / NUM_POKEMONS_PER_PAGE);
    }
  }, [displayedPokemons]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm === '') {
      const paginatedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedPokemons);
    } else {
      const filteredPokemons = pokemons.filter(pokemon => {
        const name = pokemon.name.toLowerCase();
        const search = searchTerm.toLowerCase();
        return name.includes(search);
      });
      const filteredPaginatedPokemons = filteredPokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setFilteredPokemons(filteredPokemons);
      setDisplayedPokemons(filteredPaginatedPokemons);
    }
  }, [pokemons, searchParams]);

  useEffect(() => {
    if (!searchParams.get('query') && !searchParams.get('page')) {
      const paginatedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedPokemons);
    } else if (searchParams.get('query') && !searchParams.get('page')) {
      const paginatedPokemons = filteredPokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedPokemons);
    } else if (!searchParams.get('query') && searchParams.get('page')) {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const startIndex = (page - 1) * NUM_POKEMONS_PER_PAGE;
      const endIndex = startIndex + NUM_POKEMONS_PER_PAGE;
      const paginatedPokemons = pokemons.slice(startIndex, endIndex);
      setDisplayedPokemons(paginatedPokemons);
    } else if (searchParams.get('query') && searchParams.get('page')) {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const startIndex = (page - 1) * NUM_POKEMONS_PER_PAGE;
      const endIndex = startIndex + NUM_POKEMONS_PER_PAGE;
      const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);
      setDisplayedPokemons(paginatedPokemons);
    }
  }, [pokemons, filteredPokemons, searchParams])

  return (
    <div className="pokemon-list-container">
      <SearchBox onSearch={handleSearch} />
      <div className="card-container">
        {displayedPokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination-container">
        <PaginationRange
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PokemonListPage;