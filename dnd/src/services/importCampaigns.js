import firebase from 'firebase';

export default function importCampaigns () {
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/");
		var campaigns = [];
		campaignRef.once("value", (data) => {
			if(data.val() !== null){
				data.forEach(function(campaign){
	      			campaigns.push(campaign.val());
	    		});
	    		resolve(campaigns);
			}
			else{
				resolve(campaigns);
			}
			
		})
	});
}