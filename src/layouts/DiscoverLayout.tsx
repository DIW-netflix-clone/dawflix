import { LogoIcon } from "@/components/Logos";
import styles from "./DiscoverLayout.module.scss";
import { Link, Outlet, useLocation } from "react-router";

const DiscoverLayout = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const { perfil } = location.state || {};
  console.log(perfil);
  if (!perfil) {
    return <div>No se ha seleccionado ningún perfil</div>;
  }


  return (
    <>
      <div className={styles.container}>
        <LogoIcon/>
        <nav className={styles.nav}>
          <Link to={"/films"} state={{perfil}} className={ `${styles.link} ${path === "/films" ? styles.active : ""}`}>
            Films
          </Link>
          <Link to={"/series"} state={{perfil}} className={`${styles.link} ${path === "/series" ? styles.active : ""}`}>
            Series
          </Link>
          <Link
            to={"/categories"} state={{perfil}}
            className={`${styles.link} ${path === "/categories" ? styles.active : ""}`}
          >
            Categories
          </Link>
          <Link to={"/profiles"} className={styles.link}><img src={perfil.imagen} alt={perfil.nombre} /></Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default DiscoverLayout;
