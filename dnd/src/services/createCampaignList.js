import React from 'react';
import firebase from 'firebase';
import dungeonMasterIn from './dungeonMasterIn';

export default function createCampaignList (userID, campaigns) {
	return new Promise(function(resolve, reject) {
		var campaignCounter = 0;
		var campaignList = {};
		campaignList = campaigns.map((campaign) => {
			var isDM = false;
			dungeonMasterIn(userID, campaign.campaignID).then((result) => {
				isDM = result;
				if(isDM){
					return(
					<li>
						<p>{campaign.campaignTitle} DM</p>
						<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>Enter</button>
						<button onClick={this.chooseCampaignAsDM.bind(this, campaign.campaignID)}>Enter as DM</button>
					</li>);
				}

				else{
					return(
					<li>
						<p>{campaign.campaignTitle}</p>
						<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>Enter</button>
					</li>);
				}
			}).then(()=>{
				campaignCounter++;
			});		
		});
		resolve(campaignList);
	});
}