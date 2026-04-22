import React, { createContext, useContext, useState } from 'react';

export const FavoritesContext = createContext({
  favoriteItems: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addFavorite = (item) => {
    setFavoriteItems((prevItems) => {
      if (prevItems.some((favorite) => favorite.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFavorite = (itemId) => {
    setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const isFavorite = (itemId) => favoriteItems.some((item) => item.id === itemId);

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
