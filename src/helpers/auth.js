import firebase from 'firebase';
import { auth } from '../services/firebase';

export function signup(_email, _password){
  return auth.createUserWithEmailAndPassword(_email, _password);
}

export function signin(_email, _password){
  return auth.signInWithEmailAndPassword(_email, _password);
}

export function signinGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}

export function signout(){
  return auth.signOut();
}