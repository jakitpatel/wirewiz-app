import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCoejB7PYp6_vB3oCPfsLshE9dhWCZeLuM",
  authDomain: "bank-demo-app.firebaseapp.com",
  databaseURL: "https://bank-demo-app.firebaseio.com",
  projectId: "bank-demo-app",
  storageBucket: "bank-demo-app.appspot.com",
  messagingSenderId: "67801441591",
  appId: "1:67801441591:web:8848f93424f2545c8366b2"
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  isInitialized() {
    console.log("isInitialized");
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  getCurrentUsername() {
    //console.log("getCurrentUsername");
    //console.log(this.auth);
    return this.auth.currentUser && this.auth.currentUser.email;
  }
}

export default new Firebase();
