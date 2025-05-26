import { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import BreedCardSkeleton from "../components/BreedCard/BreedCardSkeleton";
import BreedFilters from "../components/Filters/BreedFilters";
import { getAllCatBreeds } from "../services/catsApi";

const CatsPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: "",
    temperament: "",
    origin: "",
  });

  const temperamentOptions = {
    Active: "Activo",
    Adaptable: "Adaptable",
    Affectionate: "Afectuoso",
    Alert: "Alerta",
    Calm: "Tranquilo",
    Confident: "Seguro",
    Energetic: "Enérgico",
    Gentle: "Gentil",
    Friendly: "Amistoso",
    Independent: "Independiente",
    Intelligent: "Inteligente",
    Lively: "Animado",
    Loving: "Amoroso",
    Loyal: "Leal",
    Playful: "Juguetón",
    Quiet: "Silencioso",
    Sensitive: "Sensible",
    Sociable: "Sociable",
    Vocal: "Maullador",
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const data = await getAllCatBreeds();
        setBreeds(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las razas de gatos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = breed.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesTemperament =
      !filters.temperament ||
      (breed.temperament &&
        breed.temperament.toLowerCase().includes(filters.temperament.toLowerCase()));
    const matchesOrigin =
      !filters.origin || (breed.origin && breed.origin.toLowerCase().includes(filters.origin.toLowerCase()));

    return matchesSearch && matchesTemperament && matchesOrigin;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" }); // UX: Lleva al usuario arriba al filtrar
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Razas de Gatos</h1>

      <div className="mb-6">
        <BreedFilters onFilterChange={handleFilterChange} temperamentOptions={temperamentOptions} />
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <BreedCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredBreeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map((breed) => (
                <BreedCard
                  key={breed.id}
                  name={breed.name}
                  origin={breed.origin || "Desconocido"}
                  description={breed.description || "Sin descripción disponible"}
                  image={breed.image_url}
                  id={breed.id}
                  petType="gatos"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg">😿 No se encontraron resultados que coincidan con tu búsqueda.</p>
              {filters.searchTerm || filters.temperament || filters.origin ? (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() =>
                    setFilters({ searchTerm: "", temperament: "", origin: "" })
                  }
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CatsPage;
