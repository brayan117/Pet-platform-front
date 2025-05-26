import { useCallback, useEffect, useState } from 'react';
import CompareBreedCard from '../components/CompareBreedCard/CompareBreedCard';
import { getAllCatBreeds, getCatImageById } from '../services/catsApi';
import { getAllDogBreeds, getDogImageById } from '../services/dogsApi';
import SimpleLoader from '../components/Loader/SimpleLoader';

const BreedComparatorPage = () => {
  const [petType, setPetType] = useState('perros');
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreed1, setSelectedBreed1] = useState('');
  const [selectedBreed2, setSelectedBreed2] = useState('');
  const [breed1Data, setBreed1Data] = useState(null);
  const [breed2Data, setBreed2Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      setError(null);
      try {
        const cats = await getAllCatBreeds();
        const dogs = await getAllDogBreeds();
        setCatBreeds(cats);
        setDogBreeds(dogs);

        if (petType === 'gatos' && cats.length > 0) {
          setSelectedBreed1(cats[0].id);
          setSelectedBreed2(cats[0].id);
        } 
        if (petType === 'perros' && dogs.length > 0) {
          setSelectedBreed1(dogs[0].id);
          setSelectedBreed2(dogs[0].id);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar las razas. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [petType]);

  const fetchBreedData = useCallback(
    async (breedId, petType, breeds) => {
      if (!breedId) return null;
      const breed = breeds.find(b => String(b.id) === String(breedId));
      if (!breed) return null;

      try {
        const imageUrl =
          petType === 'gatos'
            ? await getCatImageById(breedId)
            : await getDogImageById(parseInt(breedId, 10));
        return { ...breed, image_url: imageUrl };
      } catch {
        return { ...breed, image_url: '' };
      }
    },
    []
  );

  useEffect(() => {
    if (loading) return;

    const loadData = async () => {
      const breeds = petType === 'gatos' ? catBreeds : dogBreeds;
      const data = await fetchBreedData(selectedBreed1, petType, breeds);
      setBreed1Data(data);
    };

    loadData();
  }, [selectedBreed1, petType, catBreeds, dogBreeds, loading, fetchBreedData]);

  useEffect(() => {
    if (loading) return;

    const loadData = async () => {
      const breeds = petType === 'gatos' ? catBreeds : dogBreeds;
      const data = await fetchBreedData(selectedBreed2, petType, breeds);
      setBreed2Data(data);
    };

    loadData();
  }, [selectedBreed2, petType, catBreeds, dogBreeds, loading, fetchBreedData]);

  const breedsToDisplay = petType === 'gatos' ? catBreeds : dogBreeds;

  const handlePetTypeChange = (type) => {
    if (type === petType) return;
    setPetType(type);
    if (type === 'gatos' && catBreeds.length > 0) {
      setSelectedBreed1(catBreeds[0].id);
      setSelectedBreed2(catBreeds[0].id);
    }
    if (type === 'perros' && dogBreeds.length > 0) {
      setSelectedBreed1(dogBreeds[0].id);
      setSelectedBreed2(dogBreeds[0].id);
    }
    setBreed1Data(null);
    setBreed2Data(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Comparador de Razas</h1>

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-8">
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold mb-2">Selecciona el tipo de mascota</p>
          <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 shadow-sm">
            {['gatos', 'perros'].map((type) => (
              <button
                key={type}
                onClick={() => handlePetTypeChange(type)}
                className={`px-8 py-3 font-semibold transition-colors ${
                  petType === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-pressed={petType === type}
              >
                {type === 'gatos' ? 'Gatos' : 'Perros'}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <span className="text-center text-gray-500 text-lg font-medium"><SimpleLoader /></span>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold mb-6">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <label
                  htmlFor="breed1"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Primera Raza
                </label>
                <select
                  id="breed1"
                  value={selectedBreed1}
                  onChange={(e) => setSelectedBreed1(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {breedsToDisplay.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="breed2"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Segunda Raza
                </label>
                <select
                  id="breed2"
                  value={selectedBreed2}
                  onChange={(e) => setSelectedBreed2(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {breedsToDisplay.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CompareBreedCard breed={breed1Data} petType={petType} />
              <CompareBreedCard breed={breed2Data} petType={petType} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BreedComparatorPage;
