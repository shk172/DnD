import firebase from 'firebase';
import importPlayerCharacter from './importPlayerCharacter';

export default function importCampaignPlayers(campaignID){
	return new Promise(function(resolve, reject) {
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID + "/Players");
		var campaignPlayers = [];
		campaignRef.on("value", (data) => {
			if(data.val() !== null){
				Object.keys(data.val()).forEach(function(key, index){
					importPlayerCharacter(key, campaignID).then((player)=>{
						campaignPlayers.push(player);
					})
	    	});
	    	resolve(campaignPlayers);
			}
			else{
				resolve(campaignPlayers);
			}
		});
	});
}