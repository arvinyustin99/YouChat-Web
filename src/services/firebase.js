import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBXnNWB9SMRkkt1EyDkvB4FZD23g58Yxes',
  authDomain: 'youchat-aae79.firebaseapp.com',
  projectId: 'youchat-aae79',
  databaseURL: 'https://youchat-aae79-default-rtdb.firebaseio.com/'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const db = firebase.firestore();


/* This is for providing data in App Context, so the app knows who is taking control */
export const generateUserDocument = async (user, additionalData) => {
  if (!user) {
    return;
  }

  const userReference = db.doc(`users/${user.uid}`);
  const snapshot = await userReference.get();
  if (!snapshot.exists){
    /* if user doesn't have displayName, extract from email */
    const username = user && user.displayName
      ? user.displayName
      : user.email.substring(0, user.email.lastIndexOf("@"));
    try{
      await db.collection(`users`).doc(user.uid).set({
        username ,
        ...additionalData});
      //await userReference.set({ username, ...additionalData });
    } catch(err){
      console.error(err);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) {
    return null;
  }

  try{
    const userDocument = await db.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    }
  } catch(err){
    console.error(err);
  }
}