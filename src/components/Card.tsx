import { Pokemon } from "../types/PokemonSummary";
import { useNavigate } from 'react-router-dom';

import './Card.css';
import Artwork from "./Artwork";

type CardProps = {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const navigate = useNavigate();

  return (
    <div className="card-content">
      <div role="button" className="card-image" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
        <Artwork pokemon={pokemon} />
      </div>
      <h6>{pokemon.name}</h6>
    </div >
  );
}

export default Card;