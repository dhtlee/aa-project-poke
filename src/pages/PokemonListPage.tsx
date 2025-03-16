import { useCallback, useEffect, useState } from "react";
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
  const [searchParams] = useSearchParams();
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);

  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm === '') {
      const paginatedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedPokemons);
    } else {
      const filteredPokemons = pokemons.filter(pokemon => {
        const name = pokemon.name.toLowerCase();
        const search = searchTerm.toLowerCase();
        return name.includes(search);
      })
      setDisplayedPokemons(filteredPokemons);
    }
  }, [pokemons]);

  useEffect(() => {
    if (!searchParams.get('query')) {
      const paginatedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE);
      setDisplayedPokemons(paginatedPokemons);
    }
  }, [pokemons, searchParams])

  return (
    <div className="pokemon-list-container">
      <SearchBox onSearch={handleSearch} />
      <div className="card-container">
        {displayedPokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination-container">
        <PaginationRange />
      </div>
    </div>
  );
}

export default PokemonListPage;