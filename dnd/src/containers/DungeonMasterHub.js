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
		}
	}

	componentWillMount(){
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			this.setState({
				campaignPlayers: campaignPlayers,
			})
		})
	}

	render(){
		const playerList = this.state.campaignPlayers.map((player) => {
			return(
				<li>{player.name} <PlayerSummary player={player}/></li>
				)
		})
		return(
			<div>
				<ul>
					{playerList}
				</ul>
			</div>
			);
	}
}

export default DungeonMasterHub;