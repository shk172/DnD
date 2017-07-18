import firebase from 'firebase';

export default function getCampaign (campaignID) {
	return new Promise(function(resolve, reject) {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				var campaignRef = firebase.database().ref("Campaigns/" + campaignID);
				campaignRef.once("value", function(campaign) {
		        	resolve(campaign.val());
				}, function(error){
					console.log(error);
					reject(error);
				});
			}
			else{
				console.log("You are signed out.");
			}
		});
	})
}