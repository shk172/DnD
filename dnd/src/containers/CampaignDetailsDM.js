import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class CampaignDetailsDM extends Component{
	constructor(props){
		super(props);
		this.state={
			campaign: this.props.campaign,
			players: this.props.players,
			open: {},
			position: {},
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

	handleListClick(name, target){
		var open = this.state.open;
		if(open[name] === undefined || open[name] === false){
			open[name] = true;
			
			var position = this.state.position;
			position[name] = target.currentTarget;

			this.setState({open: open, position: position});
		}
		else{
			open[name] = false;
			this.setState(open);
		}
	}
	render(){
		var list = this.state.players.map((player)=>{
			return(
				<ListItem key={player.Name} primaryText={player.Name} onTouchTap={this.handleListClick.bind(this, player.Name)}>
					<Popover
						open={(this.state.open[player.Name] === undefined) ? false : this.state.open[player.Name]}
						anchorEl={this.state.position[player.Name]}
        				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        				targetOrigin={{horizontal: 'left', vertical: 'top'}}
        				onRequestClose={this.handleListClick.bind(this, player.Name)}>
						<Menu>
							<MenuItem>Whisper
							</MenuItem>
						</Menu>
					</Popover>
				</ListItem>
				)
		});
		return(
			<div className="App-modules">
				<div className="App-stats">
					<p>Campaign Title: {this.state.campaign.campaignTitle}</p>
					<p>Number of players: {this.state.numPlayers}</p>
					<p>Current Location: Unknown</p>
				</div>
				<div className="App-stats">
					<List>
						<p>Participating Players</p>
						{list}
					</List>
				</div>
			</div>
		)
	}
}
export default CampaignDetailsDM;