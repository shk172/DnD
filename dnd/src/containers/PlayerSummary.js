import React, { Component } from 'react';

class PlayerSummary extends Component{
	constructor(props){
		super(props);
		this.state={
			player: this.props.player,
		}
	}

	render(){
		console.log(this.state.player);
		return(
			<div>
				<p>Level: {this.state.player.level}</p>
				<p>Health: {this.state.player.health}</p>
			</div>
			);
	}
}

export default PlayerSummary;