import { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import BreedCardSkeleton from "../components/BreedCard/BreedCardSkeleton";
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
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        🐶 Razas de Perros
      </h1>

      <div className="mb-6">
        <BreedFilters
          onFilterChange={handleFilterChange}
          temperamentOptions={temperamentOptions}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <BreedCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <BreedCard
                key={breed.id}
                name={breed.name}
                origin={breed.origin || "Desconocido"}
                description={breed.description || "Sin descripción disponible"}
                image={
                  breed.image_url ||
                  "https://via.placeholder.com/300?text=Sin+Imagen"
                }
                id={breed.id}
                petType="perros"
              />
            ))}
          </div>

          {filteredBreeds.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">
              No se encontraron resultados que coincidan con tu búsqueda.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default DogsPage;
