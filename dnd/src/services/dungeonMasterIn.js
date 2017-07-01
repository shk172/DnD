import firebase from 'firebase';

export default function dungeonMasterIn (userID, campaignID) {
	return new Promise(function(resolve, reject) {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				var playerCampaignRef = firebase.database().ref("Players/" + userID + "/Campaigns/" + campaignID);
				var isDungeonMaster = false;
				playerCampaignRef.on("value", function(campaign) {
					var exists = (campaign.val() !== null);
					if(exists) {
						if(campaign.val().dungeonMasterIn){
							isDungeonMaster = true;
							resolve(isDungeonMaster);
						}
						else{
							resolve(isDungeonMaster);
						}
					}

					else{
						console.log(isDungeonMaster);
						resolve(isDungeonMaster);
					}
				}, function(error){
					console.log(error);
					reject(error);
				});
			}
			else{
				console.log("You are currently signed out.");
				console.log(user);
			}
		});
	});
}