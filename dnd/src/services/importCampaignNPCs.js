import firebase from 'firebase';
import importPlayerCharacter from './importPlayerCharacter';

export default function importCampaignNPCs(campaignID){
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID + "/NPCs");
		var campaignNPCs = [];
		campaignRef.on("value", (data) => {
			if(data.val() !== null){
				var npcCounter = 0;
				Object.keys(data.val()).forEach(function(key, index){
					campaignNPCs.push(data.val()[key]);
					npcCounter++;
						if(npcCounter === Object.keys(data.val()).length){
							resolve(campaignNPCs);
						}
	    		});
			}
			else{
				resolve(campaignNPCs);
			}
		});
	});
}