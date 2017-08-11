import React, { Component } from 'react';

class CampaignDetailsPlayer extends Component{
	constructor(props){
		super(props);
		this.state={
			campaign: this.props.campaign,
		}
	}

	componentWillMount(){
		if(this.state.campaign.Players !== null && typeof(this.state.campaign.Players) !== 'undefined'){
			var numPlayers = Object.keys(this.state.campaign.Players).length;
			this.setState({numPlayers: numPlayers});
		}
		else{
			this.setState({numPlayers: 0});
		}
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