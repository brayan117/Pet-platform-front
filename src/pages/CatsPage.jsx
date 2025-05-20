import { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import { getAllCatBreeds } from "../services/catsApi";
import BreedFilters from "../components/Filters/BreedFilters";
import BreedCardSkeleton from "../components/BreedCard/BreedCardSkeleton";

const CatsPage = () =>{
    
    const [searchTerm, setSearchTerm] = useState('');
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
            searchTerm: '',
            temperament: '',
            origin: ''
    });

    // Map de temperamentos para pasarlo al componente de BreedFIlter
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
        Vocal: "Maullador"
    };


    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                setLoading(true);
                const data = await getAllCatBreeds();
                setBreeds(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las razas de gatos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBreeds();
    }, []); // Array vacío significa que se ejecuta solo una vez al montar    
    console.log(breeds);
    
    const filteredBreeds = breeds.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesTemperament = !filters.temperament || 
                                    (breed.temperament && breed.temperament.toLowerCase().includes(filters.temperament.toLowerCase()));
        const matchesOrigin = !filters.origin || 
                               (breed.origin && breed.origin.toLowerCase().includes(filters.origin.toLowerCase()));
    
        return matchesSearch && matchesTemperament && matchesOrigin;
    });

    if (loading) {
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Razas de gatos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <BreedCardSkeleton key={index} />
                ))}
            </div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        );
      }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Razas de Gatos</h1>
            
            {/* Barra de búsqueda */}
            <BreedFilters onFilterChange={handleFilterChange} temperamentOptions={temperamentOptions}/>

            {/* Lista de Razas */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    filteredBreeds.map(breed => (
                        <BreedCard
                            key={breed.id}
                            name={breed.name}
                            origin={breed.origin || 'Desconocido'}
                            description={breed.description || 'Sin descripcion disponible'}
                            image={breed.image_url}
                            id={breed.id}
                            petType="gatos"
                        />
                    ))
                }
            </div>

                {/* MEnsaje si no hay resuultados */}
            
            {
                filteredBreeds.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No se encontraron resultados que coincidan con "{searchTerm}"
                    </p>
                )
            }

        </div>
    )
}

export default CatsPage;
