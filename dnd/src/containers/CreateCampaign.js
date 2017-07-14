import React, { Component } from 'react';
import firebase from 'firebase';
import getCampaign from '../services/getCampaign';
import hashCode from '../services/hashCode';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
  	height: 30,
  	backgroundColor: "#FFCA81"
  }
};

class CreateCampaign extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignName: "",
			userID: this.props.userID,
			creatingCampaign: this.props.creatingCampaign,
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
		var playerCampaignRef = firebase.database().ref("Players/" + this.state.userID + "/Campaigns/" + campaignID);
		getCampaign(campaignID).then((result) => {
			var exists = (result !== null);
			if(exists){
				console.log("A campaign with this name already exists. Please try using another name.");
			}
			else{
				var campaign={};
				campaign.Players = {};
				campaign.campaignTitle = this.state.campaignName;
				campaign.campaignID = campaignID;
				campaign.Players[this.state.userID] = true;
				campaignRef.update(campaign);
				playerCampaignRef.update({
					dungeonMasterIn: true,
				})
				this.props.onUpdate({
					createdCampaign: true,
				})
				this.setState({create: false});
			}
		});
		event.preventDefault();
	}

	render(){
		if(this.state.create){
			return(
				<form onSubmit={this.submitCampaign}>
					<label>Campaign Title:
						<input type="text" name="campaignName" value={this.state.campaignName} onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Submit"/>
					<button
					onClick={()=>{this.setState({create: false})}}>
					Cancel</button>
				</form>
			)
		}

		else{
			return(
				<RaisedButton 
					style={styles.button}
					label="New Campaign"
					onTouchTap={()=>{this.setState({create: true})}}/>
			)
		}
	}
}
export default CreateCampaign;