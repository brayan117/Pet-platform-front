import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { addCatToFavorites, addDogToFavorites, removeFavorite } from "../../services/usersApi";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const mascotasFavoritas = currentUser.mascotasFavoritas || { cats: [], dogs: [] };
      const combinedFavorites = [...(mascotasFavoritas?.cats || []), ...(mascotasFavoritas?.dogs || [])];
      setFavorites(combinedFavorites);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  const isFavorite = (idMascota, tipoMascota) => {
    if (!currentUser) return false;
    const mascotasFavoritas = currentUser?.mascotasFavoritas || { cats: [], dogs: [] };
    const favoritesArray = tipoMascota === "gato" ? mascotasFavoritas.cats : mascotasFavoritas.dogs;
    return favoritesArray?.includes(idMascota) || false;
  };

  const addFavorite = async (idMascota, tipoMascota) => {
    if (!currentUser) return;
    try {
      if (tipoMascota === "gato") {
        await addCatToFavorites(currentUser.id, idMascota);
      } else {
        await addDogToFavorites(currentUser.id, idMascota);
      }
      const mascotasFavoritas = currentUser.mascotasFavoritas || { cats: [], dogs: [] };
      const combinedFavorites = [...(mascotasFavoritas?.cats || []), ...(mascotasFavoritas?.dogs || [])];
      setFavorites(combinedFavorites);
      if (tipoMascota === "gato") {
        setFavorites(prevFavorites => [...prevFavorites, idMascota]);
      } else {
        setFavorites(prevFavorites => [...prevFavorites, idMascota]);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavoritePet = async (idMascota, tipoMascota) => {
    if (!currentUser) return;
    try {
      await removeFavorite(currentUser.id, idMascota, tipoMascota);
      const mascotasFavoritas = currentUser.mascotasFavoritas || { cats: [], dogs: [] };
      const combinedFavorites = [...(mascotasFavoritas?.cats || []), ...(mascotasFavoritas?.dogs || [])];
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav !== idMascota));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const toggleFavorite = (idMascota, tipoMascota) => {
    if (isFavorite(idMascota, tipoMascota)) {
      removeFavoritePet(idMascota, tipoMascota);
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
