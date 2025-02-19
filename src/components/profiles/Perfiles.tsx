import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import styles from '@/styles/pages/Perfiles.module.scss'; // Archivo SCSS para estilos
import { isSignIn } from "@/firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirestoreDB } from "@/firebase/firebaseInit";
import {v4 as uuidv4} from "uuid";
import Carousel from "../carrousel/carousel";

interface Perfil {
  id: string;
  nombre: string;
  imagen: string;
}

const PerfilGrid: React.FC = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newImagen, setNewImagen] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook para navegar entre páginas

  useEffect(() => {
    const obtenerUid = async () => {
      const userUid = await isSignIn();
      setUid(userUid);
    };
    obtenerUid();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const obtenerPerfiles = async () => {
      try {
        const docRef = doc(FirestoreDB, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const perfilesGuardados = data?.perfiles || [];
          setPerfiles(perfilesGuardados);

          if (perfilesGuardados.length === 0) {
            abrirModal();
          }
        } else {
          abrirModal();
        }
      } catch (error) {
        console.error("Error al obtener perfiles de Firestore:", error);
      }
    };

    obtenerPerfiles();
  }, [uid]);

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  const agregarPerfil = async () => {
    if (!uid) {
      console.error("El usuario no está autenticado. No se puede agregar el perfil.");
      return;
    }

    const nuevoPerfil: Perfil = {
      id: uuidv4(), // Puedes generar un ID más robusto
      nombre: newNombre,
      imagen: newImagen,
    };

    const nuevosPerfiles = [...perfiles, nuevoPerfil];
    setPerfiles(nuevosPerfiles);
    setNewNombre("");
    setNewImagen("");

    try {
      const docRef = doc(FirestoreDB, "users", uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      await setDoc(docRef, {
        ...data,
        perfiles: nuevosPerfiles,
      });

      console.log("Perfil guardado en Firestore con éxito.");
    } catch (error) {
      console.error("Error al guardar el perfil en Firestore:", error);
    }

    cerrarModal();
  };

  // Función para manejar la selección de un perfil
  const seleccionarPerfil = (perfil: Perfil) => {
    // Redirigir a la pantalla 'movies' pasando los datos del perfil como estado
    navigate("/films", { state: { perfil } });
  };

  // Imágenes para elegir
  const imagenes = [
    "/logo-user1.webp",
    "/logo-user2.webp",
    "/logo-user3.webp",
    "/logo-user4.webp",
  ];

  return (
    <div className={styles.perfil_grid_container}>
      <div className={styles.perfil_grid}>
        {perfiles.map((perfil) => (
          <div
            key={perfil.id}
            className={styles.perfil_card}
            onClick={() => seleccionarPerfil(perfil)} // Al hacer clic, redirigir a la página de 'movies'
          >
            <img src={perfil.imagen} alt={perfil.nombre} />
            <p className={styles.perfil_name}>{perfil.nombre}</p>
          </div>
        ))}

        
      </div>
      <button className={styles.add_button} onClick={abrirModal}>
          Añadir Perfil
      </button>
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
    <Carousel/>
    </div>
  );
};

export default PerfilGrid;
