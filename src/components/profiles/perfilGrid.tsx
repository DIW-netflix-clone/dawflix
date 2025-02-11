import React, { useState } from "react";
import styles from './perfilGrid.module.scss'; // Archivo SCSS para estilos

interface Perfil {
  id: number;
  nombre: string;
  imagen: string;
}

const PerfilGrid: React.FC = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([
    { id: 1, nombre: "Juan Pérez", imagen: "https://placehold.co/64" },
    { id: 2, nombre: "Ana Gómez", imagen: "https://placehold.co/64" },
    { id: 3, nombre: "Luis Martínez", imagen: "https://placehold.co/64" },
    { id: 4, nombre: "María Rodríguez", imagen: "https://placehold.co/64" },
  ]);

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newImagen, setNewImagen] = useState("");

  // Función para abrir el modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  // Función para añadir un perfil
  const agregarPerfil = () => {
    const nuevoPerfil: Perfil = {
      id: perfiles.length + 1,
      nombre: newNombre,
      imagen: newImagen,
    };
    setPerfiles([...perfiles, nuevoPerfil]);
    setNewNombre("");
    setNewImagen("");
    cerrarModal();  // Cerrar el modal después de añadir el perfil
  };

  // Imágenes para elegir
  const imagenes = [
    "https://placehold.co/64",
    "https://placehold.co/64/ff0000",
    "https://placehold.co/64/00ff00",
    "https://placehold.co/64/0000ff",
  ];

  return (
    <div className={styles.perfil_grid_container}>
      <div className={styles.perfil_grid}>
        {perfiles.map((perfil) => (
          <div key={perfil.id} className={styles.perfil_card}>
            <img src={perfil.imagen} alt={perfil.nombre} />
            <div className={styles.perfil_name}>{perfil.nombre}</div>
          </div>
        ))}

        <button className={styles.add_button} onClick={abrirModal}>
          Añadir Perfil
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Nuevo Perfil</h2>
            <input
              type="text"
              placeholder="Escribe el nombre"
              value={newNombre}
              onChange={(e) => setNewNombre(e.target.value)}
            />
            <div className={styles.image_selector}>
              <h3>Selecciona una imagen</h3>
              <div className={styles.image_list}>
                {imagenes.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className={`${styles.image_item} ${newImagen === imagen ? styles.selected : ""}`}
                    onClick={() => setNewImagen(imagen)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.modal_buttons}>
              <button onClick={cerrarModal}>Cancelar</button>
              <button onClick={agregarPerfil} disabled={!newNombre || !newImagen}>
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilGrid;
