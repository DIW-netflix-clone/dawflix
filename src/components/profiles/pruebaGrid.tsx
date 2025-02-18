import React, { useState, useEffect } from "react";
import styles from './pruebaGrid.module.scss'; // Archivo SCSS para estilos
import { isSignIn } from "@/firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirestoreDB } from "@/firebase/firebaseInit";

interface Perfil {
  id: number;
  nombre: string;
  imagen: string;
}

const PerfilGrid: React.FC = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newImagen, setNewImagen] = useState("");

  // Estado para almacenar el UID
  const [uid, setUid] = useState<string | null>(null);

  // Usamos useEffect para obtener el UID del usuario cuando el componente se monta
  useEffect(() => {
    const obtenerUid = async () => {
      const userUid = await isSignIn();  // Obtener UID si el usuario está autenticado
      setUid(userUid); // Guardamos el UID en el estado
    };

    obtenerUid();
  }, []);  // Se ejecuta solo una vez, cuando el componente se monta

  // Este useEffect se ejecutará cada vez que el estado `uid` cambie
  useEffect(() => {
    if (uid === null) {
      console.log("El usuario no está autenticado.");
    } else {
      console.log(`El usuario está autenticado, UID: ${uid}`);
    }
  }, [uid]);  // Esto asegura que se ejecutará cada vez que `uid` cambie

  // Si no hay perfiles, se abre el modal automáticamente
  useEffect(() => {
    if (perfiles.length === 0) {
      abrirModal();  // Abre el modal si no hay perfiles
    }
  }, [perfiles]);  // Solo se ejecuta cuando el array de perfiles cambia

  // Función para abrir el modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  const agregarPerfil = async () => {
    if (!uid) {
      console.error("El usuario no está autenticado. No se puede agregar el perfil.");
      return;
    }
  
    const nuevoPerfil: Perfil = {
      id: perfiles.length + 1, // Podrías usar Firestore para autogenerar IDs
      nombre: newNombre,
      imagen: newImagen,
    };
  
    setPerfiles([...perfiles, nuevoPerfil]);
    setNewNombre("");
    setNewImagen("");
  
    try {
      // Obtener el documento del usuario para ver si ya tiene perfiles
      const docRef = doc(FirestoreDB, "users", uid);
      const docSnap = await getDoc(docRef);
  
      // Obtener el email del usuario, que debe estar almacenado en la autenticación
      const userEmail = uid; // Si el uid es el email, reemplázalo si es necesario. Si tienes una referencia separada para email, obténla aquí
  
      if (docSnap.exists()) {
        // Si el usuario ya tiene perfiles, agregar el nuevo perfil a la lista existente
        const data = docSnap.data();
        const perfilesExistentes = data?.perfiles || [];
        const emailExistente = data?.email || userEmail; // Mantener el email si ya existe, o asignar el nuevo
  
        // Actualizar el documento con los perfiles anteriores y el nuevo perfil
        await setDoc(docRef, {
          email: emailExistente, // Guardar el email
          perfiles: [...perfilesExistentes, nuevoPerfil],
        });
        console.log("Perfil guardado en Firestore con éxito.");
      } else {
        // Si no existen perfiles, se eliminan los datos previos y se guarda el nuevo perfil
        await setDoc(docRef, {
          email: userEmail, // Guardar el email
          perfiles: [nuevoPerfil],
        });
        console.log("Nuevo perfil guardado en Firestore.");
      }
    } catch (error) {
      console.error("Error al guardar el perfil en Firestore:", error);
    }
  
    cerrarModal(); // Cerrar el modal después de añadir el perfil
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
