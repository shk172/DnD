import firebase from 'firebase';
import getCampaign from './getCampaign';

export default function dungeonMasterIn (userID) {
	return new Promise(function(resolve, reject) {
		var playerCampaignRef = firebase.database().ref("Players/" + userID + "/dungeonMasterIn/");
		var campaigns = [];
		playerCampaignRef.on("value", function(campaignIDs) {
			var exists = (campaignIDs.val() !== null);

			if(exists) {
				var counter = 0;
				for(var campaignID in campaignIDs.val()) {
					getCampaign(campaignIDs.val()[campaignID]).then((campaign)=>{
						campaigns.push(campaign);
						counter++;
						if(counter >= campaignIDs.val().length){
							resolve(campaigns);
						}
					});	
				}
			}

			else{resolve(campaigns);}
		}, function(error){
			console.log(error);
			reject(error);
		});
	});
}