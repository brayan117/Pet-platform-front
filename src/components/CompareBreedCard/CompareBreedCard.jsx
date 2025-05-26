import PropTypes from 'prop-types';

const CompareBreedCard = ({ breed, petType }) => {
  const defaultImage = "https://via.placeholder.com/300x200?text=No+hay+imagen+disponible";

  if (!breed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-700">
        <p className="text-lg font-medium">Selecciona una raza para comparar</p>
      </div>
    );
  }

  const catProperties = [
    { label: 'Origen', value: breed.origin },
    { label: 'Temperamento', value: breed.temperament },
    { label: 'Esperanza de Vida', value: breed.life_span },
    { label: 'Peso (kg)', value: breed.weight?.metric },
    { label: 'Nivel de Energía', value: breed.energy_level },
    { label: 'Sin Pelo', value: typeof breed.hairless === 'boolean' ? (breed.hairless ? 'Sí' : 'No') : null },
    { label: 'Inteligencia', value: breed.intelligence },
  ];

  const dogProperties = [
    { label: 'Grupo', value: breed.breed_group },
    { label: 'Criado para', value: breed.bred_for },
    { label: 'Temperamento', value: breed.temperament },
    { label: 'Esperanza de Vida', value: breed.life_span },
    { label: 'Origen', value: breed.origin },
    { label: 'Peso (kg)', value: breed.weight?.metric },
    { label: 'Altura (cm)', value: breed.height?.metric },
  ];

  const propertiesToShow = petType === 'gatos' ? catProperties : dogProperties;

  return (
    <article
      className="bg-white p-6 rounded-lg shadow-lg text-gray-800 flex flex-col items-center"
      aria-label={`Detalles de la raza ${breed.name}`}
    >
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-5 overflow-hidden">
        <img
          src={breed.image_url || defaultImage}
          alt={breed.name ? `Imagen de ${breed.name}` : 'Imagen no disponible'}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = defaultImage)}
        />
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">{breed.name || 'Nombre no disponible'}</h3>

      <section className="w-full max-w-md text-left space-y-2 text-gray-700">
        {propertiesToShow
          .filter(prop => prop.value)
          .map(({ label, value }) => (
            <p key={label} className="text-sm">
              <strong className="font-semibold">{label}:</strong> {value}
            </p>
          ))}
        {propertiesToShow.every(prop => !prop.value) && (
          <p className="text-sm italic text-gray-500">No hay más información disponible.</p>
        )}
      </section>
    </article>
  );
};

CompareBreedCard.propTypes = {
  breed: PropTypes.object,
  petType: PropTypes.oneOf(['gatos', 'perros']).isRequired,
};

export default CompareBreedCard;
