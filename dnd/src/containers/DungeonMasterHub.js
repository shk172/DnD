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
			console.log(campaignPlayers);
		})
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
			</div>
			);
	}
}

export default DungeonMasterHub;