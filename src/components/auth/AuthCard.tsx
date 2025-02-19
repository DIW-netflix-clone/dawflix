import styles from "@/styles/pages/AuthCard.module.scss";

import Logo from "../Logo";
import { TiArrowRightThick } from "react-icons/ti";
import { createUser, signIn } from "@/firebase/auth";
import {useState} from "react";

interface Props {
  isSignIn?: boolean;
}

// función asíncrona para hashear la contraseña en SHA-256
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); 
  const hashArray = Array.from(new Uint8Array(hashBuffer)); 
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const AuthCard =  ({ isSignIn = false }: Props) => {
  const [message, setMessage] = useState<string>("");

  const onSubmit = async  (): Promise<void> => {
    // correo y contraseña
    const inputPassword = (document.getElementById("password") as HTMLInputElement).value;
    const inputEmail = (document.getElementById("email") as HTMLInputElement).value;

    // Comprobar que los inputs no estén vacíos
    if (inputPassword === "" || inputEmail === "") {
      alert("Please fill in both email and password fields.");
      return;
    }

    // Si no estás en página inicio sesión, comprobar contraseñas iguales
    if (!isSignIn) {
      const confirmPassword = (
        document.getElementById("confirm-password") as HTMLInputElement
      ).value;

      if (inputPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    // hashear contraseña
    const hashedPassword = await hashPassword(inputPassword);

    /*
    si estás en inicio de sesión, comprobar si es exitoso y mandar a películas
    si estás en registro, comprobar si es exitoso y mandar a inicio de sesión
    */
    try {
      if (isSignIn) {
        await signIn(inputEmail, hashedPassword); 
        setMessage("Login successful!"); 
        setTimeout(() => {
          window.location.href ="/profiles";
        }, 1000); 
      } else {
        await createUser(inputEmail, hashedPassword); 
        setMessage("Registration successful!"); 
        setTimeout(() => {
          window.location.href ="/sign-in";
        }, 1000);
      }
      // si error mostrar mensaje de error
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.auth_card}>
      <Logo />
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        {!isSignIn && (
          <>
            <label htmlFor="confirm-password">Confirm password</label>
            <input type="password" id="confirm-password" />
          </>
        )}
      </form>
      <div className={styles.actions}>
        {isSignIn ? (
          <p>
            New Here?
            <a href="/sign-up">
              <br />
              SIGN UP
            </a>
          </p>
        ) : (
          <p>
            Already
            <br />a member?
            <a href="/sign-in">
              <br />
              SIGN IN
            </a>
          </p>
        )}
        <button onClick={onSubmit}>
          <TiArrowRightThick size={100}  />
        </button>
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>

  );
};

export default AuthCard;
