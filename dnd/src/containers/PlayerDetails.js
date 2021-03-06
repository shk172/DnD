import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

class PlayerDetails extends Component{
	constructor(props){
		super(props);
		this.state={
			player: this.props.player,
		}
	}

	render(){
		var playerStats = Object.keys(this.state.player.Stats);
		var playerSTs = Object.keys(this.state.player.SavingThrows);
		var playerSkills = Object.keys(this.state.player.Skills);

		var playerStatsMap = playerStats.map((key)=>{
			return(
				<div>{key}: {this.state.player.Stats[key]}</div>);
		});

		var playerSTsMap = playerSTs.map((key) =>{
			return(
				<div>{key}: {this.state.player.SavingThrows[key]} </div>);
		});

		var playerSkillsMap = playerSkills.map((key) =>{
			return(
				<div>{key}: {this.state.player.Skills[key]} </div>);
		});

		return(
			<div>
				<h3> Stats </h3>
				{playerStatsMap}<br/>
				<Divider/>
				<h3> Saving Throws </h3>
				{playerSTsMap}<br/>
				<Divider/>
				<h3> Skills </h3>
				{playerSkillsMap}<br/>
			</div>
			);
	}
}

export default PlayerDetails;