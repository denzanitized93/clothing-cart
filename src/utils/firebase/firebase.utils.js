// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const created_at = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        created_at
      });
    } catch(e) {
      console.log(e.message);
    }
  }

  return userDocRef;
};