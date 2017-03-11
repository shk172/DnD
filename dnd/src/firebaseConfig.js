import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBeO7P_e3VnIQdM4ZqPvqX_UxqoJQx_TTE",
    authDomain: "dungeonsanddragons-f7213.firebaseapp.com",
    databaseURL: "https://dungeonsanddragons-f7213.firebaseio.com",
    storageBucket: "dungeonsanddragons-f7213.appspot.com",
    messagingSenderId: "982520002784"
  };

const fb = firebase  
  .initializeApp(config)
  .database()
  .ref();

export default fb;