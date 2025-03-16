import { Pokemon } from "../types/PokemonSummary";
import { useNavigate } from 'react-router-dom';

import './Card.css';
import Artwork from "./Artwork";

type CardProps = {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className="card-content">
      <div
        tabIndex={0}
        role="button"
        className="card-image"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Artwork pokemon={pokemon} />
      </div>
      <h6>{pokemon.name}</h6>
    </div >
  );
}

export default Card;