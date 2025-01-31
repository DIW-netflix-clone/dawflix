import { FirebaseAuth } from "./firebaseInit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

// Tipado de los parámetros de las funciones
export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(FirebaseAuth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const signOut = () => {
  return firebaseSignOut(FirebaseAuth);
};
