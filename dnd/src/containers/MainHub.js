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
import importCampaigns from '../services/importCampaigns';
import importUserCampaigns from '../services/importUserCampaigns';
import firebase from 'firebase';

class MainHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			userID: firebase.auth().currentUser.uid,
		};
	}

	componentWillMount(){
		var hub = this;
		importUserCampaigns(this.state.userID).then(
			(campaigns) =>{
				hub.setState({
					userCampaigns: campaigns
				})
			}
		);
		
		importCampaigns().then(
			(campaigns) =>{
				hub.setState({
					campaigns: campaigns,
					loading: false
				})
			},
			(error) =>{
				console.log(error);
			}
		);
	}
	render(){
		if(this.state.loading){
			return(
				<div>Loading...</div>
			)
		}
		else{
			return(
				<div>
					<CreateCampaign userID={this.state.userID}/>
					<CampaignList campaigns={this.state.campaigns}/>
					<UserCampaignList campaigns={this.state.userCampaigns} userID={this.state.userID}/>
				</div>
			)
		}
	}
}
export default MainHub;