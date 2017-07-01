//Look at the Lists and Keys docs to fix the error

import React, { Component } from 'react';

class CampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
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
				return(
				<li>
					<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>{campaign.campaignTitle} {campaign.campaignID}</button>
				</li>);
			});
		}

		return(
			<div>
				Campaigns
				<ul>
					{campaignList}
				</ul>
			</div>
		)
	}
}
export default CampaignList;