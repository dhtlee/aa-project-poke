import Card from "../components/Card";
import PaginationRange from '../components/PaginationRange';
import SearchBox from '../components/Searchbox';
import { Pokemon } from "../types/PokemonSummary";

import './PokemonListPage.css';

type PokemonListPageProps = {
  pokemons: Pokemon[];
};

const NUM_POKEMONS_PER_PAGE = 11;

const PokemonListPage = ({ pokemons }: PokemonListPageProps) => {
  const displayedPokemons = pokemons.slice(0, NUM_POKEMONS_PER_PAGE)

  return (
    <div className="pokemon-list-container">
      <SearchBox />
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