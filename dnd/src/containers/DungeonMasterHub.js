import React, { Component } from 'react';

import CharacterInfoForm from './CharacterInfoForm';
import Dies from './Dies';
import PlayerSummary from './PlayerSummary';

import firebase from 'firebase';
import importCampaignPlayers from '../services/importCampaignPlayers';
import importCampaignNPCs from '../services/importCampaignNPCs';

class DungeonMasterHub extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignID: this.props.campaignID,
			userID: this.props.userID,
			campaignPlayers: [],
			npcs: [],
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
			npcCreate: false,
		}

		this.createNewNPC = this.createNewNPC.bind(this);
		this.listenForUpdates = this.listenForUpdates.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	componentWillMount(){
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			this.setState({
				campaignPlayers: campaignPlayers,
			});
		})
		.then(()=>{
			importCampaignNPCs(this.state.campaignID).then((npcs)=>{
				this.setState({npcs: npcs});
				console.log(npcs);
			});
		});
	}

	createNewNPC(){
		this.setState({npcCreate: true})
	}

	onUpdate(data){
		var npcs = this.state.npcs;
		npcs.push(data.character);
		data.npcs = npcs;
		this.setState(data);
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value] = Math.floor(Math.random() * value) + 1;
		this.setState(diceResult);
	}

	render(){
		if(this.state.npcCreate){
			return(
				<CharacterInfoForm 
						userID={this.state.userID} 
						campaignID={this.state.campaignID}
						onUpdate={this.onUpdate}
						characterType="NPCs"/>)
		}

		else{
			var playerList = [];
			if(this.state.campaignPlayers.length === 0){
				playerList = (<p>There is no player in this campaign</p>);
			}

			else{
				playerList = this.state.campaignPlayers.map((player) => {
					return(
						<div className="App-DM-PlayerListElement"><h3>{player.name}</h3> <PlayerSummary player={player}/></div>
						)
				});
			}

			var npcList = [];
			if(this.state.npcs.length === 0){
				npcList = (<p>There is no NPC in this campaign</p>);
			}

			else{
				npcList = this.state.npcs.map((npc) => {
					return(
						<div className="App-DM-PlayerListElement"><h3>{npc.name}</h3> <PlayerSummary player={npc}/></div>
						)
				});
			}
			
			var diceRolls = [];
			if(this.state.diceRolls.length !== 0){
				diceRolls = this.state.diceRolls.map((result)=>{
					return(
						<div>{result.name} {result.roll}</div>
						)
				})
			}

			return(
				<div>
					<div className="App-DM-Hub">
						<div className="App-DM-List">
							<div>Players</div>
							{playerList}
						</div>
						<div className="App-DM-List">
							<p>NPCs</p>
							<button onClick={this.createNewNPC}>Create a new NPC</button>
							{npcList}
						</div>
						<div className="App-DM-DiceRolls">
							{diceRolls}
						</div>
					</div>
					<Dies userID={this.state.userID} campaignID={this.state.campaignID} characterName="DM"/>
				</div>
				);
		}
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