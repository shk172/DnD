import firebase from 'firebase';

export default function getCampaign (campaignID) {
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID);
		campaignRef.on("value", function(campaign) {
        	resolve(campaign.val());
		}, function(error){
			console.log(error);
			reject(error);
		});
	})
}