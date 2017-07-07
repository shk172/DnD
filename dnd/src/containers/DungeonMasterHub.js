import React, { Component } from 'react';

import Dies from './Dies';
import PlayerSummary from './PlayerSummary';

import firebase from 'firebase';
import importCampaignPlayers from '../services/importCampaignPlayers';
class DungeonMasterHub extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignID: this.props.campaignID,
			userID: this.props.userID,
			campaignPlayers: [],
			diceResult: {
				4: 1,
				6: 1,
				8: 1,
				10: 1,
				12: 1,
				20: 1,
				100: 1,
			},
			diceRolls: [],
		}
		this.listenForUpdates = this.listenForUpdates.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	componentWillMount(){
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			this.setState({
				campaignPlayers: campaignPlayers,
			});
		});
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value] = Math.floor(Math.random() * value) + 1;
		this.setState(diceResult);
	}

	render(){
		var playerList = [];
		if(this.state.campaignPlayers.length === 0){
			playerList = (<p>There is no player in this campaign</p>);
		}

		else{
			playerList = this.state.campaignPlayers.map((player) => {
				return(
					<li><h3>{player.name}</h3> <PlayerSummary player={player}/></li>
					)
			});
		}
		
		var diceRolls = [];
		if(this.state.diceRolls.length !== 0){
			diceRolls = this.state.diceRolls.map((result)=>{
				console.log(this.state.diceRolls);
				return(
					<p>{result.name} {result.roll}</p>
					)
			})
		}

		return(
			<div>
				<ul>
					{playerList}
					{diceRolls}
				</ul>
				<Dies userID={this.state.userID} campaignID={this.state.campaignID} characterName="DM"/>
			</div>
			);
	}

	componentDidMount(){
		this.listenForUpdates();
	}

	listenForUpdates() {
		var app = this;
	  const diceResultRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/DiceResults");
	  diceResultRef.on("value", (results)=>{
	  	var diceRolls = [];
	  	results.forEach((player)=>{		
	  		var diceResult = {
	  			name: player.key,
	  			roll: player.val(),
	  		}
	  		diceRolls.push(diceResult);
	  		app.setState({
	  			diceRolls: diceRolls
	  		})
			});
	  });
	}		
}

export default DungeonMasterHub;