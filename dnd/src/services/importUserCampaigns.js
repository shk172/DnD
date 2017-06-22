import firebase from 'firebase';

export default function importUserCampaigns () {
	return new Promise(function(resolve, reject) {
		var playerCampaignRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid + "/Campaigns/");
		var campaigns = [];
		playerCampaignRef.on("value", (data) => {
			if(data !== null){
				Object.keys(data.val()).forEach(function(key, index){
	      		campaigns.push(data.val()[key]);
	    	});
	    	resolve(campaigns);
			}
		})
	});
}