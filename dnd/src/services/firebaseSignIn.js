import firebase from 'firebase';

export default function firebaseSignIn (email, password) {
	return new Promise(function(resolve, reject) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch((error) => {
      reject(error);
	  })
	  .then(
	  	() => {
	  		firebase.auth().onAuthStateChanged(function(user) {
	  			if(user){
	  				console.log("You have successfully signed in: " + firebase.auth().currentUser.uid);
          	var userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
          	resolve(userRef);  
	  			}
					else{
						console.log("Error signing in");
					}
		    });
		}, 
		(error) => {
			console.log("rejected");
		});
	});
}