import firebase from 'firebase';

export default function importCampaigns () {
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/");
		var campaigns = [];
		campaignRef.on("value", (data) => {
			if(data.val() !== null){
				Object.keys(data.val()).forEach(function(key, index){
	      			campaigns.push(data.val()[key]);
	    		});
			}
			resolve(campaigns);
		})
	});
}