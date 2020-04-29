import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyD-rg9P0go5h20oe54lVoFVdo6J3KSEzME",
    authDomain: "crown-db-a8b42.firebaseapp.com",
    databaseURL: "https://crown-db-a8b42.firebaseio.com",
    projectId: "crown-db-a8b42",
    storageBucket: "crown-db-a8b42.appspot.com",
    messagingSenderId: "53683044084",
    appId: "1:53683044084:web:a20c81c5527bc40f6128a1",
    measurementId: "G-YZ5JR9N0KZ"
  };

export const createUserProfileDocument=async (userAuth, additionalData)=>{
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  console.log(snapShot);

  if(!snapShot.exists){
    const {displayName, email}=userAuth;
    const createdAt=new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;