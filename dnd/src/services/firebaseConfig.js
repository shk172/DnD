import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBOZa_hzFknyaCeZ9WQapUv3sQJ1mDi75U",
    authDomain: "dungeonsanddragons-113a3.firebaseapp.com",
    databaseURL: "https://dungeonsanddragons-113a3.firebaseio.com",
    projectId: "dungeonsanddragons-113a3",
    storageBucket: "dungeonsanddragons-113a3.appspot.com",
    messagingSenderId: "583177564096"
  };

const fb = firebase  
  .initializeApp(config)
  .database()
  .ref();

export default fb;