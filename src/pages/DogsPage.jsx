import { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import BreedFilters from "../components/Filters/BreedFilters";
import { getAllDogBreeds } from "../services/dogsApi";

const DogsPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: "",
    temperament: "",
    origin: "",
  });

  const temperamentOptions = {
    Adaptable: "Adaptable",
    Adventurous: "Aventurero",
    Affectionate: "Afectuoso",
    Aggressive: "Agresivo",
    Alert: "Alerta",
    Amiable: "Amable",
    Assertive: "Asertivo",
    Attentive: "Atento",
    Bold: "Audaz",
    Brave: "Valiente",
    Calm: "Tranquilo",
    Cheerful: "Alegre",
    Clever: "Ingenioso",
    Confident: "Seguro de sí mismo",
    Courageous: "Valeroso",
    Devoted: "Devoto",
    Dignified: "Digno",
    Docile: "Dócil",
    Eager: "Entusiasta",
    Energetic: "Enérgico",
    "Even Tempered": "De temperamento equilibrado",
    Faithful: "Fiel",
    Fearless: "Intrépido",
    Friendly: "Amistoso",
    Gentle: "Gentil",
    "Good-natured": "De buen carácter",
    Happy: "Feliz",
    Hardworking: "Trabajador",
    Independent: "Independiente",
    Intelligent: "Inteligente",
    Kind: "Amable",
    Lively: "Vivaz",
    Loyal: "Leal",
    Obedient: "Obediente",
    Outgoing: "Extrovertido",
    Patient: "Paciente",
    Playful: "Juguetón",
    Powerful: "Poderoso",
    Protective: "Protector",
    Quiet: "Silencioso",
    Reliable: "Confiable",
    Reserved: "Reservado",
    Responsive: "Receptivo",
    "Self-assured": "Seguro de sí",
    Sensitive: "Sensible",
    Sociable: "Sociable",
    Spirited: "Vivaz",
    Stubborn: "Terco",
    "Sweet-Tempered": "De temperamento dulce",
    Tenacious: "Tenaz",
    Territorial: "Territorial",
    Trainable: "Adiestrable",
    Vigilant: "Vigilante",
    Watchful: "Atento",
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const data = await getAllDogBreeds();
        setBreeds(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las razas de perros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = breed.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesTemperament =
      !filters.temperament ||
      (breed.temperament &&
        breed.temperament
          .toLowerCase()
          .includes(filters.temperament.toLowerCase()));
    const matchesOrigin =
      !filters.origin ||
      (breed.origin &&
        breed.origin.toLowerCase().includes(filters.origin.toLowerCase()));

    return matchesSearch && matchesTemperament && matchesOrigin;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Razas de Perros
      </h1>

      <div className="mb-6">
        <BreedFilters
          onFilterChange={handleFilterChange}
          temperamentOptions={temperamentOptions}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50 mb-4"></div>
          <p className="text-gray-500">Cargando razas de perros...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded text-center">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {filteredBreeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map((breed) => (
                <BreedCard
                  key={breed.id}
                  name={breed.name}
                  origin={breed.origin || "Desconocido"}
                  description={
                    breed.description || "Sin descripción disponible"
                  }
                  image={breed.image_url}
                  id={breed.id}
                  petType="perros"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg">
                No se encontraron resultados que coincidan con tu búsqueda.
              </p>
              {(filters.searchTerm ||
                filters.temperament ||
                filters.origin) && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() =>
                    setFilters({ searchTerm: "", temperament: "", origin: "" })
                  }
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DogsPage;
