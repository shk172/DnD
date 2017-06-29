//Things to include here:
/*
**1) Creating a new campaign
**2) Joining another campaign
**3) Searching existing campaigns
**4) The campaigns the player is currently in right now
**5) List of campaigns user has created
*/

import React, { Component } from 'react';

import UserCampaignList from './UserCampaignList';
import importCampaigns from '../services/importCampaigns';
import importUserCampaigns from '../services/importUserCampaigns';
import firebase from 'firebase';

import CreateCampaign from './CreateCampaign';
import CampaignList from './CampaignList';
import CampaignHub from './CampaignHub';
import CharacterInfoForm from './CharacterInfoForm';

class MainHub extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignsLoading: true,
			userCampaignsLoading: true,
			inCampaign: false,
			userID: firebase.auth().currentUser.uid,
			characterCreate: false,
			campaignOpen: false,
		};
		this.enterNewCampaign = this.enterNewCampaign.bind(this);
		this.enterExistingCampaign = this.enterExistingCampaign.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentWillMount(){
		var hub = this;
		importUserCampaigns(this.state.userID).then(
			(userCampaigns) =>{
				hub.setState({
					userCampaigns: userCampaigns,
					userCampaignsLoading: false,
				})
				importCampaigns().then(
					(campaigns) =>{
						var redundancyTable = {};

						var tempCampaigns = [];
						var campaignCounter = 0;
						var userCampaignCounter = 0;

						for(var userCampaign in userCampaigns){
							redundancyTable[userCampaign.campaignID] = userCampaign;
							userCampaignCounter++;
						}
						
						if(userCampaignCounter === userCampaigns.length){
							for(var campaign in campaigns){
								if(redundancyTable[campaign.campaignID] == null){
									tempCampaigns.push(campaign);
								}
								campaignCounter++;
							}
						}
						
						if(campaignCounter === campaigns.length){
							hub.setState({
								campaigns: tempCampaigns,
								campaignsLoading: false,
							});
						}
					},
					(error) =>{
						console.log(error);
					}
				);
			},
			(error) =>{
				console.log(error);
			}
		);
	}

	enterNewCampaign(campaignID){
		this.setState({
			campaignID: campaignID,
			characterCreate: true,
		});
	}

	enterExistingCampaign(campaignID){
		this.setState({
			campaignID: campaignID,
			campaignOpen: true,
		});
	}

	onUpdate(data){
    this.setState(data);
  }

	render(){
		if(this.state.campaignsLoading){
			return(
				<div>Loading...</div>
			)
		}
		if(this.state.userCampaignsLoading){
			return(
				<div>Loading...</div>
			)
		}
		if(this.state.characterCreate){
			return(
				<CharacterInfoForm 
					userID={this.state.userID} 
					campaignID={this.state.campaignID}
					onUpdate={this.onUpdate}/>
			)
		}

		if(this.state.campaignOpen){
			return(
				<CampaignHub 
					userID={this.state.userID} 
					campaignID={this.state.campaignID}/>
			)
		}
		else{

			return(
				<div>
					<CreateCampaign userID={this.state.userID}/>
					<CampaignList 
						campaigns={this.state.campaigns} 
						enterNewCampaign={this.enterNewCampaign}/>
					<UserCampaignList 
						campaigns={this.state.userCampaigns} 
						userID={this.state.userID} 
						enterExistingCampaign={this.enterExistingCampaign}/>
				</div>
			)
		}
	}
}
export default MainHub;