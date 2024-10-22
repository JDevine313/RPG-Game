import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo44i07FWAzlmYYak8Ni3qy4JY8vLy9jQ",
  authDomain: "rpg-game-9f7c2.firebaseapp.com",
  projectId: "rpg-game-9f7c2",
  storageBucket: "rpg-game-9f7c2.appspot.com",
  messagingSenderId: "406415929866",
  appId: "1:406415929866:web:09239d2a345bca059b65f3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
