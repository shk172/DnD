import React, { Component } from 'react';
import dungeonMasterIn from '../services/dungeonMasterIn';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
			userID: this.props.userID
		}
	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	chooseCampaignAsDM(campaignID){
		this.props.enterExistingCampaignAsDM(campaignID);
	}
	render(){
		var campaignList = {};
		if(this.state.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
		}

		else{
			campaignList = this.state.campaigns.map((campaign) => {
				if(dungeonMasterIn(this.state.userID, campaign.campaignID)){
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
			});
		}

		return(
			<div>
				Your Campaigns
				<ul>
					{campaignList}
				</ul>
			</div>
		)
	}
}
export default UserCampaignList;