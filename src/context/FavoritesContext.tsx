import { ReactNode, createContext, useCallback, useContext, useState } from "react";

import { Pokemon } from "../types/PokemonSummary";

const FavoritesContext = createContext<{
  favorites: Set<number>;
  toggleFavorite: (pokemon: Pokemon) => void;
}>(null!);

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const initialFavoriteIds = localStorage.getItem('favoriteIds');
    const parsedFavoriteIds = initialFavoriteIds ? JSON.parse(initialFavoriteIds) : [];
    return new Set<number>(parsedFavoriteIds);
  });

  const toggleFavorite = useCallback((pokemon: Pokemon) => {
    setFavoriteIds(currentIds => {
      const updatedIds = new Set(currentIds);
      if (updatedIds.has(pokemon.id)) {
        updatedIds.delete(pokemon.id);
      } else {
        updatedIds.add(pokemon.id);
      }
      localStorage.setItem('favoriteIds', JSON.stringify(Array.from(updatedIds)));
      return updatedIds;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites: favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export { FavoritesProvider, useFavorites };