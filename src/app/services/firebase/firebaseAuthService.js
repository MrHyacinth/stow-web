import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import firebaseConfig from "./firebaseConfig";

class FirebaseAuthService {
  auth;
  firestore;
  database;
  storage;

  googleProvider;
  facebookProvider;
  twitterProvider;

  constructor() {

    this.init();
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();

    this.database  = firebase.database();
    this.storage = firebase.storage();
    
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.twitterProvider = new firebase.auth.TwitterAuthProvider();
  }

  init = () => {
    firebase.initializeApp(firebaseConfig);
  };

  checkAuthStatus = callback => {
    this.auth.onAuthStateChanged(callback);
  };

  signUpWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  passwordReset = (email) => {
    return this.auth.sendPasswordResetEmail(email);
  };

  signInWithPopup = media => {
    switch (media) {
      case "google":
        return this.auth.signInWithPopup(this.googleProvider);

      case "facebook":
        return this.auth.signInWithPopup(this.facebookProvider);

      case "twitter":
        return this.auth.signInWithPopup(this.twitterProvider);

      default:
        break;
    }
  };

  signInWithPhoneNumber = phoneNumber => {
    return this.auth.signInWithPhoneNumber(phoneNumber);
  };

  saveUserData = async (uid,userData) => {
    let setUser = await
    this.firestore
    .collection('users')
    .doc(uid)
    .set({
      ...userData
    })
    .then(async res => {

      const { email, firstName, lastName, phone } = userData;
      const displayName = firstName + ' ' + lastName;

      let updP = 
        await 
        this.auth
        .currentUser
        .updateProfile({
          displayName,
          email,
          phone,
        });
        
      return updP;
    })
    return setUser;
  };


  getUserData = docId => {
    //   generally it's better to use uid for docId
    this.firestore
      .collection("users")
      .doc(docId)
      .get()
      .then(doc => {
        console.log(doc.data());
      });
  };

  getAllUser = () => {
    this.firestore
      .collection("users")
      .get()
      .then(docList => {
        docList.forEach(doc => {
          console.log(doc.data());
        });
      });
  };

  signOut = () => {
    return this.auth.signOut();
  };
}

const instance = new FirebaseAuthService();

export default instance;
