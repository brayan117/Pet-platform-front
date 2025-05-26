import { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getCatImageUrlsById } from '../../services/catsApi';
import { getDogImageUrlsById } from '../../services/dogsApi';
import './BreedDetail.css'; // si quieres añadir estilos personalizados

const BreedDetail = ({ breed, petType }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        let data = [];
        if (petType === "cat") {
          data = await getCatImageUrlsById(breed.id);  
        } else {
          data = await getDogImageUrlsById(breed.id);  
        }
        setImages(data);
        setError(null);
      } catch (err) {
        setError(`Error al cargar imágenes para ${breed.name}.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (breed && breed.id) {
      fetchImages();
    }
  }, [breed, petType]);

  if (!breed) return null;

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-gray-500">Cargando imágenes...</span>
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-red-500">{error}</p>
            </div>
          ) : images.length > 0 ? (
            <Slider {...settings}>
              {images.map((imgUrl, index) => (
                <div key={index} className="px-2">
                  <img
                    src={imgUrl}
                    alt={`${breed.name} ${index + 1}`}
                    className="w-full h-64 object-contain rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{breed.name}</h1>
          <p className="text-sm text-gray-500 mb-6">Origen: {breed.origin || 'Desconocido'}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Descripción</h3>
            <p className="text-gray-600">{breed.description || 'No hay descripción disponible.'}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Temperamento</h3>
            <p className="text-gray-600">{breed.temperament || 'No hay información de temperamento disponible.'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Esperanza de vida</h4>
              <p className="text-gray-600">{breed.life_span || 'N/A'}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Peso</h4>
              <p className="text-gray-600">{breed.weight?.metric || 'N/A'} kg</p>
            </div>
            
            {petType === 'dog' && (
              <>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Grupo de raza</h4>
                  <p className="text-gray-600">{breed.breed_group || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Criado para</h4>
                  <p className="text-gray-600">{breed.bred_for || 'N/A'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedDetail;
