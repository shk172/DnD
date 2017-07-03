import React, { Component } from 'react';

import dungeonMasterIn from '../services/dungeonMasterIn';

import CreateCampaign from './CreateCampaign';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
			userID: this.props.userID,
			loading: false,
			campaignList: [],
		}
	}

	componentWillMount(){

	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	chooseCampaignAsDM(campaignID){
		this.props.enterExistingCampaignAsDM(campaignID);
	}
	render(){
		var campaignList = [];
		if(this.state.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
		}

		else{
			var app = this;
			var campaignCounter = 0;
			campaignList = this.state.campaigns.map((campaign) => {
				if(campaign.Players[this.state.userID] == true){
					return(
						<div className="App-List-Elements">
							<p>{campaign.campaignTitle} DM</p>
							<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>Enter</button>
							<button onClick={this.chooseCampaignAsDM.bind(this, campaign.campaignID)}>Enter as DM</button>
						</div>
					);
				}

				else{
					return(
						<div className="App-List-Elements">
							<p>{campaign.campaignTitle}</p>
							<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>Enter</button>
						</div>
					);
				}
			});
			console.log(campaignList);
		}

		if(!this.state.loading){
			return(
				<div className="App-User-Campaign-List">
					Your Campaigns
					<ul>
						{campaignList}
					</ul>
					<CreateCampaign 
							userID={this.state.userID}
							creatingCampaign={this.state.createdCampaign}
							onUpdate={this.onUpdate}/>
				</div>
		)}
		else{
			return(
				<div>
				Loading...
				</div>
				)
		}
	}
}
export default UserCampaignList;