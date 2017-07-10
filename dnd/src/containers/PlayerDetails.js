import React, { Component } from 'react';

class PlayerDetails extends Component{
	constructor(props){
		super(props);
		this.state={
			player: this.props.player,
		}
	}

	render(){
		var playerStats = Object.keys(this.state.player.stats);
		var playerSTs = Object.keys(this.state.player.savingThrows);
		var playerSkills = Object.keys(this.state.player.skills);

		var playerStatsMap = playerStats.map((key)=>{
			return(
				<div>{key}: {this.state.player.stats[key]}</div>);
		});

		var playerSTsMap = playerSTs.map((key) =>{
			return(
				<div>{key}: {this.state.player.savingThrows[key]} </div>);
		});

		var playerSkills = playerSkills.map((key) =>{
			return(
				<div>{key}: {this.state.player.skills[key]} </div>);
		});

		return(
			<div>
				{playerStatsMap}
				{playerSTsMap}
				{playerSkills}
			</div>
			);
	}
}

export default PlayerDetails;