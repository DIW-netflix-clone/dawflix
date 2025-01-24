import styles from "./MainLayout.module.scss";

import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
};

export default MainLayout;
