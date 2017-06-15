//Things to include here:
/*
**1) Creating a new campaign
**2) Joining another campaign
**3) Searching existing campaigns
**4) The campaigns the player is currently in right now
**5) List of campaigns user has created
*/

import React, { Component } from 'react';
import CreateCampaign from './CreateCampaign';
import CampaignList from './CampaignList';
import UserCampaignList from './UserCampaignList';

class MainHub extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: [],
			userCampagins: [],
		}
	}
/*
	**function to import all campaigns in the database
	**Each campaign will have its own campaign hubs
	importCampaigns(){

	}
*/


	render(){
		return(
			<div>
				<CreateCampaign/>
				<CampaignList campaigns={this.state.campaigns}/>
				<UserCampaignList campaigns={this.state.userCampaigns}/>
			</div>
		)
	}
}
export default MainHub;