import { useContext, useEffect, useState } from "react";
import { getAllCatBreeds } from "../services/catsApi";
import { getAllDogBreeds } from "../services/dogsApi";
import BreedCard from "../components/BreedCard/BreedCard";
import { UserContext } from "../context/UserContext/UserContext";

const FavoritesPage = () => {
  const { currentUser } = useContext(UserContext);
  const [allBreeds, setAllBreeds] = useState({ gatos: [], perros: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      const [cats, dogs] = await Promise.all([
        getAllCatBreeds(),
        getAllDogBreeds(),
      ]);
      setAllBreeds({ gatos: cats, perros: dogs });
      setLoading(false);
    };

    fetchBreeds();
  }, []);

  const getBreedData = (id, tipo) => {
    const source = tipo === "gato" ? allBreeds.gatos : allBreeds.perros;
    return source?.find((b) => b.id === id);
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const { mascotasFavoritas } = currentUser;
  const favoriteCats = mascotasFavoritas?.cats || [];
  const favoriteDogs = mascotasFavoritas?.dogs || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mascotas Favoritas</h1>
      {favoriteCats.length === 0 && favoriteDogs.length === 0 && (
        <p>No tienes mascotas favoritas aún.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteCats.map((idMascota) => {
          const breed = getBreedData(idMascota, "gato");
          if (!breed) return null;

          return (
            <BreedCard
              key={idMascota}
              id={breed.id}
              name={breed.name}
              origin={breed.origin || "Desconocido"}
              description={
                breed.description || breed.temperament || "Sin descripción"
              }
              image={breed.image_url}
              petType="gatos"
            />
          );
        })}
        {favoriteDogs.map((idMascota) => {
          const breed = getBreedData(idMascota, "perro");
          if (!breed) return null;

          return (
            <BreedCard
              key={idMascota}
              id={breed.id}
              name={breed.name}
              origin={breed.origin || "Desconocido"}
              description={
                breed.description || breed.temperament || "Sin descripción"
              }
              image={breed.image_url}
              petType="perros"
            />
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
