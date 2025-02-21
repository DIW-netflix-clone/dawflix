import styles from "@/styles/pages/Logos.module.scss";
import logo from "@/assets/logo.svg"

const LogoText = () => {
  return (
    <div className={styles.containerText}>
      <h1>
        DAW<span>FLIX</span>
      </h1>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className={styles.containerIcon}>
      <img src={logo} alt="Logo"/>
    </div>
  )    
}

export default LogoText;