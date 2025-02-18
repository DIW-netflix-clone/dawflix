import styles from "./DiscoverLayout.module.scss";
import { Link, Outlet, useLocation } from "react-router";

const DiscoverLayout = () => {
  const path = useLocation().pathname;
  console.log(path)

  return (
    <>
      <div className={styles.container}>
        <div>logo</div>
        <nav className={styles.nav}>
          <Link to={"/films"} className={ `${styles.link} ${path === "/films" ? styles.active : ""}`}>
            Films
          </Link>
          <Link to={"/series"} className={`${styles.link} ${path === "/series" ? styles.active : ""}`}>
            Series
          </Link>
          <Link
            to={"/categories"}
            className={`${styles.link} ${path === "/categories" ? styles.active : ""}`}
          >
            Categories
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default DiscoverLayout;
