import { useContext, useState } from 'react';
import { FaHeart, FaPaw, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext/FavoritesContext';

const BreedCard = ({ name, origin, description, image, id, petType }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const tipoMascotaString = petType === 'gatos' ? 'gato' : 'perro';
  const favorito = isFavorite(id, tipoMascotaString);

  const [imgError, setImgError] = useState(false);

  const handleToggleFavorite = async () => {
    const willBeFavorite = !favorito;
    await toggleFavorite(id, tipoMascotaString);

    setTimeout(() => {
      alert(willBeFavorite ? '¡Favorito agregado correctamente!' : '¡Favorito eliminado correctamente!');
      window.location.reload();
    }, 250);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full">
      
      {!imgError && image ? (
        <img
          src={image}
          alt={`Imagen de la raza ${name}`}
          className="w-full h-48 object-contain bg-gray-100"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
          <FaPaw className="text-6xl mb-3" />
          <span className="text-sm">Imagen no disponible</span>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">Origen: {origin}</p>
          <p className="text-sm text-gray-700 line-clamp-4">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/${petType}/${id}`}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Ver detalles
          </Link>

          <button
            onClick={handleToggleFavorite}
            className="text-red-500 text-xl hover:scale-110 transition"
            title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {favorito ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
