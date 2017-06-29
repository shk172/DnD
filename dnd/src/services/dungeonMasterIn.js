import firebase from 'firebase';
import getCampaign from './getCampaign';

export default function dungeonMasterIn (userID, campaignID) {
	return new Promise(function(resolve, reject) {
		var playerCampaignRef = firebase.database().ref("Players/" + userID + "/Campaigns/" + campaignID);
		var isDungeonMaster = false;
		playerCampaignRef.on("value", function(campaign) {
			var exists = (campaign.val() !== null);

			if(exists) {
				if(campaign.val().dungeonMasterIn){
					isDungeonMaster = true;
					resolve(isDungeonMaster);
				}
			}

			else{resolve(isDungeonMaster);}
		}, function(error){
			console.log(error);
			reject(error);
		});
	});
}