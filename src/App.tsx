import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PokemonList from './pages/PokemonListPage';
import PokemonDetails from './pages/PokemonDetailsPage';
import { Pokemon } from './types/PokemonSummary';
import PokemonLogo from "./image/pokemon";

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

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=-1')
      .then((response) => response.json())
      .then((data: PokemonList) => {
        setPokemons(data.results);
      }
      )
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const normalizedPokemons = useMemo(() => {
    return pokemons.sort(
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
  }, [pokemons]);

  return (
    <>
      <header className="header-container">
        <PokemonLogo className="pokemon-logo" />
      </header>
      <main className="main-container" style={{ backgroundColor: /^\/pokemon\/\d+$/.test(location.pathname) ? 'white' : undefined }}>
        <Routes>
          <Route path="/" element={<PokemonList pokemons={normalizedPokemons} />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </main >
    </>
  )
}