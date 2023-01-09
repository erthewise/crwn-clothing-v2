import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCeMvLr9Nk_Yek_HUTZIEV-zSYTEqCPr-E",
  authDomain: "crwn-clothing-db-bf2aa.firebaseapp.com",
  projectId: "crwn-clothing-db-bf2aa",
  storageBucket: "crwn-clothing-db-bf2aa.appspot.com",
  messagingSenderId: "587174906961",
  appId: "1:587174906961:web:8705fe36136410f4477c70"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { 
        displayName,
        email,
        createdAt,
       });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}