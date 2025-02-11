import { doc, setDoc } from "firebase/firestore";
import { FirebaseAuth, FirestoreDB } from "./firebaseInit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, } from "firebase/auth"
export const createUser = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const userid = response.user.uid;
    await setDoc(doc(FirestoreDB, "users", userid), { email: email });
    return userid;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const signIn = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
  return response.user.uid;
};

export const signOut = () => {
  return firebaseSignOut(FirebaseAuth);
};
