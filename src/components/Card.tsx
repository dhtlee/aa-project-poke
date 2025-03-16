import { useNavigate } from 'react-router-dom';

import { useFavorites } from '../context/FavoritesContext';
import HeartEmpty from "../image/heart-empty";
import HeartFull from '../image/heart-full';
import { Pokemon } from "../types/PokemonSummary";

import Artwork from "./Artwork";

import './Card.css';

type CardProps = {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = favorites.has(pokemon.id);

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  const handleFavoritesClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(pokemon);
  }

  const handleFavoritesKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    toggleFavorite(pokemon);
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
        <div tabIndex={0} className="favorite" onClick={handleFavoritesClick} onKeyDown={handleFavoritesKeyDown}>
          {isFavorited ? <HeartFull /> : <HeartEmpty />}
        </div>
      </div>
      <h6>{pokemon.name}</h6>
    </div >
  );
}

export default Card;