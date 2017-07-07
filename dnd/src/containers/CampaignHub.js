import React, { Component } from 'react';
import firebase from 'firebase';

import CharacterHub from './CharacterHub';
import CharacterInfoForm from './CharacterInfoForm';
import Dies from './Dies';

import importPlayerCharacter from '../services/importPlayerCharacter';

class CampaignHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			userID: this.props.userID,
			campaignID: this.props.campaignID,
			characterCreate: false,
		};
		this.onUpdate = this.onUpdate.bind(this);
		this.updateDiceResult = this.updateDiceResult.bind(this);
	}

	componentWillMount(){
		importPlayerCharacter(this.state.userID, this.state.campaignID).then(
			(character)=>{
				if(Object.keys(character).length > 1){
					this.setState({
						character: character,
						loading: false,
					})
				}
				
				else{
					this.setState({
						characterCreate: true,
						loading: false,
					})
				}
			});
	}

	onUpdate(data){
   	this.setState(data);
  }

  updateDiceResult(){
  	var playerCampaignRef = firebase.database().ref("Players/" + this.state.userID + "/Campaigns/" + this.state.campaignID);
  	playerCampaignRef.on("value", (data)=>{

  	});
  }

	render(){
		if(this.state.loading){
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

		else{
			return(
				<div>
					<CharacterHub character={this.state.character}/>
					<Dies userID={this.state.userID} campaignID={this.state.campaignID} characterName={this.state.character.name}/>
				</div>
			)
		}
		
	}
}
export default CampaignHub;