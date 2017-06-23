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

import CampaignHub from './CampaignHub';

class MainHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			inCampaign: false,
			userID: firebase.auth().currentUser.uid,
			campaignOpen: false,
		};
		this.chooseCampaign = this.chooseCampaign.bind(this);
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

	chooseCampaign(campaignID){
		this.setState({
			campaignID: campaignID,
			campaignOpen: true,
		})
	}

	render(){
		if(this.state.loading){
			return(
				<div>Loading...</div>
			)
		}
		if(this.state.campaignOpen){
			return(
				<CampaignHub userID={this.state.userID} campaignID={this.state.campaignID}/>
			)
		}
		else{
			return(
				<div>
					<CreateCampaign userID={this.state.userID}/>
					<CampaignList campaigns={this.state.campaigns} chooseCampaign={this.chooseCampaign}/>
					<UserCampaignList campaigns={this.state.userCampaigns} userID={this.state.userID} chooseCampaign={this.chooseCampaign}/>
				</div>
			)
		}
	}
}
export default MainHub;