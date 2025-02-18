import React from 'react';
import { useLocation } from 'react-router-dom';

const Movies: React.FC = () => {
  const location = useLocation();
  const { perfil } = location.state || {}; // Obtiene el perfil desde el estado

  if (!perfil) {
    return <div>No se ha seleccionado ningún perfil</div>;
  }

  return (
    <div>
      <h1>Películas para {perfil.nombre}</h1>
      <img src={perfil.imagen} alt={perfil.nombre} />
      {/* Aquí puedes agregar el contenido relacionado con las películas */}
    </div>
  );
};

export default Movies;
