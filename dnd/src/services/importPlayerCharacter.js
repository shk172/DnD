import firebase from 'firebase';

export default function importPlayerCharacter (userID, campaignID) {
	return new Promise(function(resolve, reject) {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				var campaignRef = firebase.database().ref("Campaigns/" + campaignID + "/Players/" + userID);
			  	var player = {};
			  	var Stats = {};
			  	var SavingThrows = {};
			  	var Skills = {};

			    campaignRef.once("value", (data) => {
					if(data.val() === null || Object.keys(data.val()).length <= 1){
						console.log("No character found");
						resolve(player);
					}
					else{
			      player.Name = data.val().Name;
			      player.Race = data.val().Race;
			      player.Level = data.val().Level;
			      player.Note = data.val().Note;
			      player.Money = data.val().Money;
			      player.Health = data.val().Health;
			      player.Exp = data.val().Exp;
			      player.ArmorClass = data.val().ArmorClass;
			      player.Initiative = data.val().Initiative;
			      player.Speed = data.val().Speed;

			      Object.keys(data.val().Stats).forEach(function(key, index){
			      	Stats[key]= data.val().Stats[key];
			      });

			      Object.keys(data.val().Skills).forEach(function(key, index){
			      	Skills[key]= data.val().Skills[key];
			      });

			      Object.keys(data.val().SavingThrows).forEach(function(key, index){
			      	SavingThrows[key]= data.val().SavingThrows[key];
			      });

			      player.Skills = Skills;
			      player.Stats = Stats;
			      player.SavingThrows = SavingThrows;
			      player.playerID = data.val().playerID;
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