import React, { Component } from 'react';
import firebase from 'firebase';
import getCampaign from '../services/getCampaign';
import hashCode from '../services/hashCode';

class CreateCampaign extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignName: "",
			userID: this.props.userID
		};
		this.handleChange = this.handleChange.bind(this);
		this.submitCampaign = this.submitCampaign.bind(this);
	}

	handleChange(event){
		this.setState({
			campaignName: event.target.value
		});
	}

	submitCampaign(event){
		var campaignID = hashCode(this.state.userID + this.state.campaignName)
		var campaignRef = firebase.database().ref("Campaigns/" + campaignID);
		getCampaign(campaignID).then((result) => {
				var exists = (result !== null);
				if(exists){
					console.log("A campaign with this name already exists. Please try using another name.");
				}
				else{
					var campaign={};
					campaign.campaignTitle = this.state.campaignName;
					campaign.campaignID = campaignID;
					campaign.dungeonMasters = [this.state.userID];
					campaignRef.update(campaign);
					console.log(campaign);
				}
		});
		event.preventDefault();
	}

	render(){
		if(this.state.create){
			return(
				<div>
					<form onSubmit={this.submitCampaign}>
						<label>Campaign Title:
							<input type="text" name="campaignName" value={this.state.campaignName} onChange={this.handleChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
				</div>
			)
		}

		else{
			return(
				<div>
					<button 
						onClick={()=>{this.setState({create: true})}}>
						Create a new campaign</button>
				</div>
			)
		}
	}
}
export default CreateCampaign;