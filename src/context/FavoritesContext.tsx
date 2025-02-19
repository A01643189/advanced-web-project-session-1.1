import { createContext, useState, ReactNode } from "react";
import { Movie } from '../pages/Home';

interface ContextProps {
  favorites: Map<number, Movie>;
  setFavorite: (movie: Movie) => void;
}

export const FavoritesContext = createContext<ContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState(new Map<number, Movie>());

  function setFavorite(movie: Movie) {
    if (!favorites.has(movie.id)) {
      setFavorites(prevState => new Map<number, Movie>(prevState).set(movie.id, movie));
    } else {
      favorites.delete(movie.id);
      setFavorites(prevState => new Map<number, Movie>(prevState));
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
