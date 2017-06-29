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
						<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>{campaign.campaignTitle} {campaign.campaignID} DM</button>
					</li>);
				}
				else{
					return(
					<li>
						<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>{campaign.campaignTitle} {campaign.campaignID}</button>
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