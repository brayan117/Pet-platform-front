import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
  addFavorite as addFavoriteAPI,
  ApiPetTypes,
  removeFavorite as removeFavoriteAPI,
} from "../../services/usersApi";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [localFavorites, setLocalFavorites] = useState([]);
  
  useEffect(() => {
    if (currentUser) {
      const combined=[
      ...(currentUser.mascotasFavoritas.cats || []),
      ...(currentUser.mascotasFavoritas.dogs || [])]
    
      setLocalFavorites(combined);
    }
  }, [currentUser]);

  const isFavorite = (id) => {
    return localFavorites.some((fav) => fav === id);
  };

  const addFavorite = async (id, petType) => {
    if (!currentUser) return;
    try {
      await addFavoriteAPI(currentUser.id, id, petType);
      setLocalFavorites((prev) => [...prev, id ]);
      setCurrentUser({
        ...currentUser,
        mascotasFavoritas: {
          ...currentUser.mascotasFavoritas,
          [ApiPetTypes[petType]]: [...(currentUser.mascotasFavoritas[ApiPetTypes[petType]] || []), id],
        },
      })
    } catch (err) {
      console.error("Error adding favorite:", err);
      toast.error("Error añadiendo favorito. Intenta nuevamente.");
    }
  };

  const removeFavoritePet = async (id, petType) => {
    if (!currentUser) return;
    try {
      await removeFavoriteAPI(currentUser.id, id, petType);
      setCurrentUser({
        ...currentUser,
        mascotasFavoritas: {
          ...currentUser.mascotasFavoritas,
          [ApiPetTypes[petType]]: currentUser.mascotasFavoritas[ApiPetTypes[petType]].filter(
            (fav) => fav !== id
          ),
        },
      })
      setLocalFavorites((prev) => prev.filter((fav) => fav !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
      toast.error("Error removiendo favorito. Intenta nuevamente.");
    }
  };

  const toggleFavorite = (id, petType) => {
    if (isFavorite(id)) {
      removeFavoritePet(id, petType);
    } else {
      addFavorite(id, petType);
    }
  };

  return (
    <FavoritesContext.Provider value={{ isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
