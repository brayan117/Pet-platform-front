import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllDogBreeds } from '../services/dogsApi';
import BreedDetail from '../components/BreedDetail/BreedDetail';
import SimpleLoader from '../components/Loader/SimpleLoader';

const DogDetailPage = () => {
  const { breedId } = useParams();
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreed = async () => {
      try {
        setLoading(true);
        const allBreeds = await getAllDogBreeds();
        const selected = allBreeds.find(b => b.id == breedId);
        setBreed(selected);
      } catch (err) {
        setError("No se pudo cargar la raza.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreed();
  }, [breedId]);

  if (error) return <p>Error: {error}</p>;
  if (!breed || loading) return <SimpleLoader />;

  return (
    <div className="p-4">
      <BreedDetail 
        breed={breed} 
        petType="dog"
      />
    </div>
  );
};

export default DogDetailPage;
