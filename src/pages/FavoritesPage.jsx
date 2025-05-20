import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext/FavoritesContext";
import { getAllCatBreeds } from "../services/catsApi";
import { getAllDogBreeds } from "../services/dogsApi";
import BreedCard from "../components/BreedCard/BreedCard";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mascotas Favoritas</h1>
      {favorites.length === 0 && <p>No tienes mascotas favoritas aún.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(({ idMascota, tipoMascota }) => {
          const breed = getBreedData(idMascota, tipoMascota);
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
              petType={tipoMascota === "gato" ? "gatos" : "perros"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
