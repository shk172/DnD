import React, { Component } from 'react';

class CampaignDetailsPlayer extends Component{
	constructor(props){
		super(props);
		this.state={
			campaign: this.props.campaign,
		}
	}

	componentWillMount(){
		var numPlayers = Object.keys(this.state.campaign.Players).length;
		this.setState({numPlayers: numPlayers});
	}

	render(){
		return(
			<div className="App-modules">
				<div className="App-stats">
					<p>{this.state.campaign.campaignTitle}</p>
					<p>Number of players: {this.state.numPlayers}</p>
					<p>Current Location: Unknown</p>
				</div>
			</div>
		)
	}
}
export default CampaignDetailsPlayer;