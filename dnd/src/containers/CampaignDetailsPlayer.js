import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class CampaignDetailsPlayer extends Component{
	constructor(props){
		super(props);
		this.state={
			open: {},
			position: {},
		}
		console.log(this.props.players)
	}

	componentWillMount(){
		if(this.props.campaign.Players !== null && typeof(this.props.campaign.Players) !== 'undefined'){
			var numPlayers = Object.keys(this.props.campaign.Players).length;
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
		var list = this.props.players.map((player)=>{
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
					<p>{this.props.campaign.campaignTitle}</p>
					<p>Number of players: {this.state.numPlayers}</p>
					<p>Current Location: Unknown</p>
				</div>
				<div className="App-stats">
					<p>Other Players in this Campaign:</p>
					{list}
				</div>
			</div>
		)
	}
}
export default CampaignDetailsPlayer;