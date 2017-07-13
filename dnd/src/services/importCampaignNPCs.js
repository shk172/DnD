import firebase from 'firebase';

export default function importCampaignNPCs(campaignID){
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID + "/NPCs");
		var campaignNPCs = [];
		campaignRef.once("value", (data) => {
			if(data.val() !== null){
				var npcCounter = 0;
				Object.keys(data.val()).forEach(function(key, index){
					console.log(key);
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