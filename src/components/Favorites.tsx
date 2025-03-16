
import { useFavorites } from "../context/FavoritesContext";
import HeartFull from "../image/heart-full";

import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();
  return (
    <>
      <HeartFull width="3rem" />
      {favorites.size > 0 && (
        <span className="favorites-count">
          {favorites.size}
        </span>
      )}
    </>
  );
}

export default Favorites;