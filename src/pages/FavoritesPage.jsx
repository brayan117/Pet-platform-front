import { useContext, useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import { UserContext } from "../context/UserContext/UserContext";
import { getAllCatBreeds } from "../services/catsApi";
import { getAllDogBreeds } from "../services/dogsApi";

const FavoritesPage = () => {
  const { currentUser } = useContext(UserContext);
  const [allBreeds, setAllBreeds] = useState({ gatos: [], perros: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const [cats, dogs] = await Promise.all([
          getAllCatBreeds(),
          getAllDogBreeds(),
        ]);
        setAllBreeds({ gatos: cats, perros: dogs });
      } catch (error) {
        console.error("Error al cargar las razas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const getBreedData = (id, tipo) => {
    const source = tipo === "gato" ? allBreeds.gatos : allBreeds.perros;
    return source.find((b) => b.id === id);
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600 text-lg">
        Cargando usuario...
      </div>
    );
  }

  const { mascotasFavoritas } = currentUser;
  const favoriteCats = mascotasFavoritas?.cats || [];
  const favoriteDogs = mascotasFavoritas?.dogs || [];

  const allFavorites = [
    ...favoriteCats.map((id) => ({ id, tipo: "gato" })),
    ...favoriteDogs.map((id) => ({ id, tipo: "perro" })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Tus Mascotas Favoritas
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
        </div>
      ) : allFavorites.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Aún no has agregado ninguna mascota a tus favoritos.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allFavorites.map(({ id, tipo }) => {
            const breed = getBreedData(id, tipo);
            if (!breed) return null;

            return (
              <BreedCard
                key={id}
                id={breed.id}
                name={breed.name}
                origin={breed.origin || "Desconocido"}
                description={
                  breed.description || breed.temperament || "Sin descripción"
                }
                image={breed.image_url}
                petType={tipo === "gato" ? "gatos" : "perros"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
