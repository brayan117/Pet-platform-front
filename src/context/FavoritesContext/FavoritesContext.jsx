import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setFavorites(currentUser.mascotasFavoritas || []);
    }
  }, [currentUser]);

  const isFavorite = (idMascota) => {
    return favorites.some((fav) => fav.idMascota === idMascota);
  };

  const addFavorite = async (idMascota, tipoMascota) => {
    if (!isFavorite(idMascota)) {
      const newFavorites = [...favorites, { idMascota, tipoMascota }];
      setFavorites(newFavorites);
      const updatedUser = { ...currentUser, mascotasFavoritas: newFavorites };
      await updateCurrentUser(updatedUser);
    }
  };

  const removeFavorite = async (idMascota) => {
    const newFavorites = favorites.filter((fav) => fav.idMascota !== idMascota);
    setFavorites(newFavorites);
    const updatedUser = { ...currentUser, mascotasFavoritas: newFavorites };
    await updateCurrentUser(updatedUser);
  };

  const toggleFavorite = (idMascota, tipoMascota) => {
    if (isFavorite(idMascota)) {
      removeFavorite(idMascota);
    } else {
      addFavorite(idMascota, tipoMascota);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
