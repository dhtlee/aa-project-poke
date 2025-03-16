import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PokemonDetails } from "../types/PokemonDetails";
import { transformedPokemonDetailsData } from "../utils";
import Artwork from "../components/Artwork";

import './PokemonDetailsPage.css';

const PokemonDetailsPage = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails>();

  const { id } = useParams();
  const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    fetch(detailsUrl)
      .then((response) => response.json())
      .then((data) => {
        new Promise((resolve) => setTimeout(resolve, 2000));
        setPokemon(transformedPokemonDetailsData(data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  if (pokemon === undefined) {
    return null;
  }

  return (
    <div className="pokemon-details-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Pokemon</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{pokemon.name}</li>
        </ol>
      </nav>
      <div className="image-details-container">
        <div className="image-container">
          <Artwork pokemon={pokemon} />
        </div>
        <div className="details-container">
          <span className="pokemon-id">{`#${pokemon.id}`}</span>
          <h3>{pokemon.name}</h3>
          {pokemon.types.map(type => (
            <span key={type} className="pokemon-type">
              {type}
            </span>
          ))}
          <hr className="horizontal-line" />
          <div className="stats-container">
            <p className="stat"><label>HP:</label><span> {pokemon.stats.hp}</span></p>
            <p className="stat"><label>Attack:</label> {pokemon.stats.attack} </p>
            <p className="stat"><label>Height:</label> {pokemon.stats.height} </p>
            <p className="stat"><label>Defence:</label> {pokemon.stats.defence} </p>
            <p className="stat"><label>Weight:</label> {pokemon.stats.weight} </p>
            <p className="stat"><label>Special Attack:</label> {pokemon.stats.specialAttack} </p>
            <p className="stat"><label>Base Experience:</label> {pokemon.stats.baseExperience} </p>
            <p className="stat"><label>Special Defence:</label> {pokemon.stats.specialDefence} </p>
            <p className="stat"><label>Speed:</label> {pokemon.stats.speed} </p>
          </div>
          <hr className="horizontal-line" />
          <div>
            <h5>Abilities:</h5>
            <ul className="abilities-list">
              {pokemon.abilities.map(ability => (
                <li key={ability} className="ability">{ability}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;