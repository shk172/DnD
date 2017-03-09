import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

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

const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};
// const ui = new firebaseui.auth.AuthUI(fb.auth());
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);

export default fb;