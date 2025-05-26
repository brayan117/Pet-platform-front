import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreedDetail from '../components/BreedDetail/BreedDetail';
import { getAllCatBreeds } from '../services/catsApi';

const CatDetailPage = () => {
  const { breedId } = useParams();
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreed = async () => {
      setLoading(true);
      setError(null);
      try {
        const allBreeds = await getAllCatBreeds();
        const selected = allBreeds.find(b => String(b.id) === breedId);
        if (!selected) {
          setError('Raza no encontrada');
          setBreed(null);
        } else {
          setBreed(selected);
        }
      } catch (err) {
        setError('No se pudo cargar la raza.');
        setBreed(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBreed();
  }, [breedId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {loading && (
        <div className="text-gray-500 text-lg font-medium mt-20">
          Cargando detalles...
        </div>
      )}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-4 mt-20 max-w-xl w-full text-center">
          Error: {error}
        </div>
      )}
      {!loading && !error && !breed && (
        <div className="text-gray-600 mt-20 text-center">
          Raza no encontrada.
        </div>
      )}
      {!loading && !error && breed && (
        <div className="w-full max-w-6xl">
          <BreedDetail breed={breed} petType="cat" />
        </div>
      )}
    </div>
  );
};

export default CatDetailPage;
