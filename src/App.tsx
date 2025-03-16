import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

import pokedex from '../pokedex.json';

import Favorites from './components/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import PokemonLogo from "./image/pokemon-logo";
import PokemonDetails from './pages/PokemonDetailsPage';
import PokemonFavorites from './pages/PokemonFavorites';
import PokemonList from './pages/PokemonListPage';
import { Pokemon } from './types/PokemonSummary';
import { PokemonTrie } from './utils/Trie';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

type PokemonSummary = {
  name: string;
  url: string;
}

type PokemonList = {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonSummary[]
}

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const location = useLocation();
  const [pokemonTrie] = useState<PokemonTrie>(new PokemonTrie());

  useEffect(() => {
    setPokemons(pokedex.results)
  }, [])

  const normalizedPokemons = useMemo(() => {
    const normalized = pokemons.sort(
      (first, second) => first.name.localeCompare(second.name)
    ).map(pokemon => {
      const id = Number(pokemon.url.split('/')[6]);
      const name = pokemon.name;
      const detailsUrl = pokemon.url;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {
        id,
        name,
        detailsUrl,
        imageUrl,
      } as Pokemon;
    });
    
    // Initialize the trie with all normalized pokemons
    pokemonTrie.setAllPokemons(normalized);
    pokemonTrie.bulkInsert(normalized);
    
    return normalized;
  }, [pokemons, pokemonTrie]);

  return (
    <FavoritesProvider>
      <header className="header-container">
        <Link to="/">
          <PokemonLogo className="pokemon-logo" />
        </Link>
        <Link className="nav-favorites" to="/favorites" >
          <Favorites />
        </Link>
      </header>
      <main className="main-container" style={{ backgroundColor: /^\/pokemon\/\d+$/.test(location.pathname) ? 'white' : undefined }}>
        <Routes>
          <Route path="/" element={<PokemonList pokemons={normalizedPokemons} pokemonTrie={pokemonTrie} />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/favorites" element={<PokemonFavorites />} />
        </Routes>
      </main >
    </FavoritesProvider>
  )
}