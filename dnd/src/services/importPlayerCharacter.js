import firebase from 'firebase';

export default function importPlayerCharacter (userID, campaignID) {
	return new Promise(function(resolve, reject) {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				var campaignRef = firebase.database().ref("Players/" + userID + "/Campaigns/" + campaignID);
			  	var player = {};
			  	var stats = {};
			  	var savingThrows = {};
			  	var skills = {};

			    campaignRef.on("value", (data) => {
					if(data.val() === null || Object.keys(data.val()).length <= 1){
						resolve(player);
					}
					else{
			      player.name = data.val().name;
			      player.race = data.val().race;
			      player.level = data.val().level;
			      player.note = data.val().note;
			      player.money = data.val().money;
			      player.health = data.val().health;
			      player.armorClass = data.val().armorClass;
			      player.speed = data.val().speed;

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
				}, function(error){
					reject(error);
				});
			}
			else{
				console.log("You are currently signed out.");
			}
		})
	});
}