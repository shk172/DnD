import React, { Component } from 'react';
import importCampaignPlayers from '../services/importCampaignPlayers';
import PlayerSummary from './PlayerSummary';

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
		}
	}

	componentWillMount(){
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			this.setState({
				campaignPlayers: campaignPlayers,
			})
			console.log(campaignPlayers);
		})
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

		return(
			<div>
				<ul>
					{playerList}
				</ul>
				<div className="App-Dice">
					Dies <br/>
					{this.state.diceResult[4]} <button onClick={this.rollDice.bind(this, 4)}>d4</button> <br/>
					{this.state.diceResult[6]} <button onClick={this.rollDice.bind(this, 6)}>d6</button> <br/>
					{this.state.diceResult[8]} <button onClick={this.rollDice.bind(this, 8)}>d8</button> <br/>
					{this.state.diceResult[10]} <button onClick={this.rollDice.bind(this, 10)}>d10</button> <br/>
					{this.state.diceResult[12]} <button onClick={this.rollDice.bind(this, 12)}>d12</button> <br/>
					{this.state.diceResult[20]} <button onClick={this.rollDice.bind(this, 20)}>d20</button> <br/>
					{this.state.diceResult[100]} <button onClick={this.rollDice.bind(this, 100)}>d100</button> <br/>
				</div>
			</div>
			);
	}
}

export default DungeonMasterHub;