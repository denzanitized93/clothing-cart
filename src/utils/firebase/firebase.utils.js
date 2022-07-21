// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLXK95Wgv3Rza-V-IQICFpZJrIteMIJx8",
  authDomain: "crwn-clothing-db-c9d5b.firebaseapp.com",
  projectId: "crwn-clothing-db-c9d5b",
  storageBucket: "crwn-clothing-db-c9d5b.appspot.com",
  messagingSenderId: "623508548645",
  appId: "1:623508548645:web:3fcd778e63cab207a1e3cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserFromAuth = async (userAuth, additionaInfo = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const created_at = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        created_at,
        ...additionaInfo
      });
    } catch(e) {
      console.log(e.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);