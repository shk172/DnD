import firebase from 'firebase';
import importPlayerCharacter from './importPlayerCharacter';

export default function importCampaignPlayers(campaignID){
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID + "/Players");
		var campaignPlayers = [];
		campaignRef.once("value", (data) => {
			if(data.val() !== null && typeof(data.val() !== 'undefined')){
				var playerCounter = 0;
				Object.keys(data.val()).forEach((player)=>{
					campaignPlayers.push(data.val()[player]);
					playerCounter++;
					if(playerCounter === Object.keys(data.val()).length){
						resolve(campaignPlayers);
					}
				})
			}

			else{
				resolve(campaignPlayers);
			}
		});
	});
}