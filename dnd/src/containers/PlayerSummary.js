import React, { Component } from 'react';

class PlayerSummary extends Component{
	constructor(props){
		super(props);
		this.state={
			player: this.props.player,
		}
	}

	render(){
		var players = Object.keys(this.state.player);
		var playerSummary = players.map((key)=>{
			if(typeof(this.state.player[key]) !== 'object' && 
				this.state.player[key] !== null && 
				typeof(this.state.player[key]) !== 'undefined' &&
				key !== "note" && key !== "campaignID"){
				return(
					<div>{key}: {this.state.player[key]}</div>);
			}
		});
		return(
			<div>
				{playerSummary}
			</div>
			);
	}
}

export default PlayerSummary;