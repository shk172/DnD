import firebase from 'firebase';
import getCampaign from './getCampaign';

export default function importUserCampaigns () {
	return new Promise(function(resolve, reject) {
		var playerCampaignRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid + "/Campaigns/");
		var campaigns = [];
		playerCampaignRef.on("value", (data) => {
			if(data !== null){
				var counter = 0;
				Object.keys(data.val()).forEach(function(key, index){
	      			getCampaign(key).then((campaign)=>{
	      				console.log(campaigns);
	      				console.log(campaign);
	      				campaigns.push(campaign);
	      				counter++;
	      				if(counter >= Object.keys(data.val()).length){
			    			console.log(campaigns);
				    		resolve(campaigns);
			    		}
	      			})
	    		});
			}
		})
	});
}