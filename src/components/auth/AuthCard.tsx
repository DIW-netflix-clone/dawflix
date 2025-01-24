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
        {isSignIn && (
          <>
            <label htmlFor="email/username">Email / Username</label>
            <input type="text" id="email/username"></input>
          </>
        )}
        {!isSignIn && (
          <>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
            <label htmlFor="username">Username</label>
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
            New Here?
            <a>
              <br />
              SIGN UP
            </a>
          </p>
        ) : (
          <p >
            Already 
            <br />
            a member?
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
