import React from 'react';

const CompareBreedCard = ({ breed, petType }) => {
  const defaultImage = "https://via.placeholder.com/300x200?text=No+hay+imagen+disponible";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-800">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
        {breed?.image_url ? (
          <img
            src={breed.image_url}
            alt={breed.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No hay imagen disponible</span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{breed?.name || 'Selecciona una raza'}</h3>
      
      {breed && (
        <div className="mt-4 text-left text-gray-700">
          {petType === 'perros' && breed.breed_group && (
            <p><strong>Grupo:</strong> {breed.breed_group}</p>
          )}
          {petType === 'perros' && breed.bred_for && (
            <p><strong>Criado para:</strong> {breed.bred_for}</p>
          )}
          {breed.temperament && (
            <p><strong>Temperamento:</strong> {breed.temperament}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareBreedCard;
