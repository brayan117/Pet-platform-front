import { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard/BreedCard";
import { getAllDogBreeds, getDogImageById } from "../services/dogsApi";
import BreedCardSkeleton from "../components/BreedCard/BreedCardSkeleton";
import BreedFilters from "../components/Filters/BreedFilters";

const DogsPage = () =>{

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
        "Adaptable": "Adaptable",
        "Adventurous": "Aventurero",
        "Affectionate": "Afectuoso",
        "Aggressive": "Agresivo",
        "Alert": "Alerta",
        "Amiable": "Amable",
        "Assertive": "Asertivo",
        "Attentive": "Atento",
        "Bold": "Audaz",
        "Brave": "Valiente",
        "Calm": "Tranquilo",
        "Cheerful": "Alegre",
        "Clever": "Ingenioso",
        "Confident": "Seguro de sí mismo",
        "Courageous": "Valeroso",
        "Devoted": "Devoto",
        "Dignified": "Digno",
        "Docile": "Dócil",
        "Eager": "Entusiasta",
        "Energetic": "Enérgico",
        "Even Tempered": "De temperamento equilibrado",
        "Faithful": "Fiel",
        "Fearless": "Intrépido",
        "Friendly": "Amistoso",
        "Gentle": "Gentil",
        "Good-natured": "De buen carácter",
        "Happy": "Feliz",
        "Hardworking": "Trabajador",
        "Independent": "Independiente",
        "Intelligent": "Inteligente",
        "Kind": "Amable",
        "Lively": "Vivaz",
        "Loyal": "Leal",
        "Obedient": "Obediente",
        "Outgoing": "Extrovertido",
        "Patient": "Paciente",
        "Playful": "Juguetón",
        "Powerful": "Poderoso",
        "Protective": "Protector",
        "Quiet": "Silencioso",
        "Reliable": "Confiable",
        "Reserved": "Reservado",
        "Responsive": "Receptivo",
        "Self-assured": "Seguro de sí",
        "Sensitive": "Sensible",
        "Sociable": "Sociable",
        "Spirited": "Vivaz",
        "Stubborn": "Terco",
        "Sweet-Tempered": "De temperamento dulce",
        "Tenacious": "Tenaz",
        "Territorial": "Territorial",
        "Trainable": "Adiestrable",
        "Vigilant": "Vigilante",
        "Watchful": "Atento"
    };

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                setLoading(true);
                const data = await getAllDogBreeds();
                setBreeds(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las razas de perros');
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
            <h1 className="text-2xl font-bold mb-4">Razas de Perros</h1>
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
            <h1 className="text-2xl font-bold mb-4">Razas de Perros</h1>
            
            {/* Barra de búsqueda */}
            <BreedFilters onFilterChange={handleFilterChange} temperamentOptions={temperamentOptions}/>

            {/* Lista de Razas */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    filteredBreeds.map(breed => {
                        //const imageUrl =  getDogImageById(breed.id);
                        return (
                            <BreedCard
                                key={breed.id}
                                name={breed.name}
                                origin={breed.origin || 'Desconocido'}
                                description={breed.description || 'Sin descripcion disponible'}
                                image={breed.image_url || 'Sin imagen'}
                                id={breed.id}
                                petType="perros"
                            />
                        )
                    })
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

export default DogsPage;
