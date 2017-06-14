import './firebaseConfig';
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
  				if (user) {
			      var userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
				  	var player = {};
				  	var stats = {};
				  	var savingThrows = {};
				  	var skills = {};
				    userRef.on("value", (data) => {
				    	//if the user is signed in
				    	if(data.val() !== null){
					      player.name = data.val().name;
					      player.race = data.val().race;
					      player.level = data.val().level;
					      player.note = data.val().note;
					      player.money = data.val().money;
					      player.health = data.val().health;
					      player.armorClass = data.val().armorClass;
					      player.speed = data.val().speed;
					      console.log(data.val().stats);
					      Object.keys(data.val().stats).forEach(function(key, index){
					      	stats[key]= data.val().stats[key];
					      });
					      Object.keys(data.val().skills).forEach(function(key, index){
					      	skills[key]= data.val().skills[key];
					      });
					      Object.keys(data.val().savingThrows).forEach(function(key, index){
					      	savingThrows[key]= data.val().savingThrows[key];
					      });

					      player.skills = skills;
					      player.stats = stats;
					      player.savingThrows = savingThrows;
					      resolve(player);
					    }
					  });
		    	} 
		    	else{
		    		
		    	}    
		    });
      	//this.props.onUpdate({loggedIn: true});
			}, 
		(error) => {
			console.log("rejected");
		});
	});
}