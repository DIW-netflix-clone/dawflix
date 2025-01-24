import styles from "./AuthCard.module.scss";

import Logo from "../Logo";
import { TiArrowRightThick } from "react-icons/ti";

interface Props {
  isSignIn?: boolean;
}

const AuthCard = ({ isSignIn = false }: Props) => {
  return (
    <div className={styles.auth_card}>
      <Logo />
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        {!isSignIn && (
          <>
            <label htmlFor="username"></label>
            <input type="text" id="username" />
          </>
        )}
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
            New in Dawflix?
            <a>
              <br />
              SIGN UP
            </a>
          </p>
        ) : (
          <p >
            Already a member?
            <a href="/sign-in">
              <br />
              SIGN IN
            </a>
          </p>
        )}
        <button>
          <TiArrowRightThick size={100} />
        </button>
      </div>
    </div>
  );
};

export default AuthCard;
