import React, { Component } from 'react';
import firebase from 'firebase';
import getCampaign from '../services/getCampaign';
import hashCode from '../services/hashCode';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
  	height: 30,
  	backgroundColor: "#FFCA81",
  	overflow: "auto",
  }
};

class CreateCampaign extends Component{
	constructor(props){
		super(props);
		this.state={
			alert: false,
			create: false,
			campaignName: "",
			userID: this.props.userID,
			creatingCampaign: this.props.creatingCampaign,
		};

		this.closeAlert = this.closeAlert.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submitCampaign = this.submitCampaign.bind(this);
	}

	closeAlert(event){
		this.setState({
			alert: false,
			alertMessage: "",
		})
	}

	handleChange(event){
		this.setState({
			campaignName: event.target.value
		});
	}
	handleDialogClose(event){
		this.setState({
			create: false
		})
	}

	submitCampaign(event){
		if(this.state.campaignName.length === 0){
			console.log("No title entered");
			this.setState({
				alert: true,
				alertMessage: "Please enter a campaign name."
			});
		}
		else{
			/*
				Create the campaign entry
			*/
			var campaignRef = firebase.database().ref("Campaigns/");
		
			var campaign={};
			campaign.Players = {};
			campaign.campaignTitle = this.state.campaignName;
			
			var campaignID = campaignRef.push(campaign).key;
			firebase.database().ref("Campaigns/" + campaignID).update({campaignID: campaignID});


			/*
				Create a reference in the Player's database and set it to true to mark them as the DM
			*/
			var playerCampaignRef = firebase.database().ref("Players/" + this.state.userID + "/Campaigns/");
			var campaignObject = {};
			campaignObject[campaignID] = true;
			playerCampaignRef.update(campaignObject);
			this.props.onUpdate({
				createdCampaign: true,
			})
			this.setState({create: false});
		}
	}

	render(){
		return(
			<RaisedButton 
				style={styles.button}
				label="New Campaign"
				onTouchTap={()=>{this.setState({create: true})}}>
				<Dialog
		            open={this.state.create}
		            modal={false}
                    title="Create Campaign"
                    autoScrollBodyContent={true}
		            onRequestClose={this.handleDialogClose.bind(this)}>
		            <form>
						<label>Campaign Title:
						<input 
							type="text" 
							name="campaignName" 
							value={this.state.campaignName} 
							onChange={this.handleChange}/>
						</label>
						<FlatButton onTouchTap={this.submitCampaign}> Submit </FlatButton>
						<FlatButton	onTouchTap={()=>{this.setState({create: false})}}>	Cancel</FlatButton>
					</form>
		        </Dialog>
		        <Dialog
		        	open={this.state.alert}
		        	modal={false}
		        	onRequestClose={this.closeAlert}
		        	actions={<FlatButton onTouchTap={this.closeAlert}>Close</FlatButton>}>
		        	{this.state.alertMessage}
		        </Dialog>
			</RaisedButton>
		)
	}
}
export default CreateCampaign;