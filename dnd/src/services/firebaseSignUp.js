import './firebaseConfig';
import firebase from 'firebase';

export default function firebaseSignUp (email, password) {
  return new Promise(function(resolve, reject) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("You have successfully signed up: " + firebase.auth().currentUser.uid);
          var userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
          userRef.update({
            userID: firebase.auth().currentUser.uid,
          })
          resolve(userRef);
        }
        else{
          console.log("Error Signing up");
        }
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
}