import React, { useState, useEffect } from 'react';
import { getAllCatBreeds, getCatImageById } from '../services/catsApi';
import { getAllDogBreeds, getDogImageById } from '../services/dogsApi';
import CompareBreedCard from '../components/CompareBreedCard/CompareBreedCard';

const BreedComparatorPage = () => {
  const [petType, setPetType] = useState('perros'); 
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreed1, setSelectedBreed1] = useState('');
  const [selectedBreed2, setSelectedBreed2] = useState('');
  const [breed1Data, setBreed1Data] = useState(null);
  const [breed2Data, setBreed2Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const cats = await getAllCatBreeds();
        const dogs = await getAllDogBreeds();
        setCatBreeds(cats);
        setDogBreeds(dogs);
        // Set initial selected breeds if available
        if (cats.length > 0) setSelectedBreed1(cats[0].id);
        if (dogs.length > 0) setSelectedBreed2(dogs[0].id);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchBreedData = async () => {
      if (petType === 'gatos' && selectedBreed1) {
        const breed = catBreeds.find(b => b.id === selectedBreed1);
        if (breed) {
          const imageUrl = await getCatImageById(selectedBreed1);
          setBreed1Data({ ...breed, image_url: imageUrl });
        }
      } else if (petType === 'perros' && selectedBreed1) {
        const breedIdNum = parseInt(selectedBreed1, 10); // Convert to integer for dogs
        const breed = dogBreeds.find(b => b.id === breedIdNum);
        if (breed) {
          const imageUrl = await getDogImageById(breedIdNum); // Pass integer ID to API call
          setBreed1Data({ ...breed, image_url: imageUrl });
        }
      } else {
        setBreed1Data(null);
      }

      if (petType === 'gatos' && selectedBreed2) {
        const breed = catBreeds.find(b => b.id === selectedBreed2);
        if (breed) {
          const imageUrl = await getCatImageById(selectedBreed2);
          setBreed2Data({ ...breed, image_url: imageUrl });
        }
      } else if (petType === 'perros' && selectedBreed2) {
        const breedIdNum = parseInt(selectedBreed2, 10); // Convert to integer for dogs
        const breed = dogBreeds.find(b => b.id === breedIdNum);
        if (breed) {
          const imageUrl = await getDogImageById(breedIdNum); // Pass integer ID to API call
          setBreed2Data({ ...breed, image_url: imageUrl });
        }
      } else {
        setBreed2Data(null);
      }
    };

    if (!loading) {
      fetchBreedData();
    }
  }, [selectedBreed1, selectedBreed2, petType, catBreeds, dogBreeds, loading]);

  const breedsToDisplay = petType === 'gatos' ? catBreeds : dogBreeds;

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-gray-800"> {/* Changed to light theme */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Comparador de Razas</h1> {/* Changed text color */}

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8"> {/* Changed to light theme */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Selecciona las razas a comparar</h2> {/* Changed text color */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Mascota</label> {/* Changed text color */}
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-lg font-medium ${
                petType === 'gatos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setPetType('gatos');
                setSelectedBreed1(catBreeds.length > 0 ? catBreeds[0].id : '');
                setSelectedBreed2(catBreeds.length > 0 ? catBreeds[0].id : '');
              }}
            >
              Gatos
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium ${
                petType === 'perros' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setPetType('perros');
                setSelectedBreed1(dogBreeds.length > 0 ? dogBreeds[0].id : '');
                setSelectedBreed2(dogBreeds.length > 0 ? dogBreeds[0].id : '');
              }}
            >
              Perros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="breed1" className="block text-gray-700 text-sm font-bold mb-2">Primera Raza</label>
            <select
              id="breed1"
              className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBreed1}
              onChange={(e) => setSelectedBreed1(e.target.value)}
            >
              {breedsToDisplay.map(breed => (
                <option key={breed.id} value={breed.id}>{breed.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="breed2" className="block text-gray-700 text-sm font-bold mb-2">Segunda Raza</label>
            <select
              id="breed2"
              className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBreed2}
              onChange={(e) => setSelectedBreed2(e.target.value)}
            >
              {breedsToDisplay.map(breed => (
                <option key={breed.id} value={breed.id}>{breed.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompareBreedCard breed={breed1Data} petType={petType} />
        <CompareBreedCard breed={breed2Data} petType={petType} />
      </div>
    </div>
  );
};

export default BreedComparatorPage;
