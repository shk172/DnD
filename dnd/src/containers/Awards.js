import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Awards extends Component{
	constructor(props){
		super(props);
		this.state={
			awards: {},
			players: this.props.players,
		}
		this.sendAwards = this.sendAwards.bind(this);
	}

	componentWillMount(){
		var awards = this.state.awards;
		for(var i = 0; i < this.state.players.length; i++){
			awards[this.state.players[i].playerID] = {
				awardType: "AWARD_GOLD",
				awardAmount: 0,
			}
		}
		this.setState(awards);
	}

	handleAmountChange(id, event){
		var awards = this.state.awards;
		awards[id].awardAmount = event.target.value;
		this.setState({
			awards: awards
		});
	}
	handleTypeChange(playerID, event, target, value){
		var awards = this.state.awards;
		awards[playerID].awardType = value;
		this.setState({
			awards: awards
		})
	}

	sendAwards(){
		console.log("Sending...");
		this.props.sendAwards(this.state.awards);
	}

	render(){
		var players = [];
		if(this.state.players.length === 0){
			players = (<p>There is no player in this campaign</p>)
		}
		else{
			players = this.state.players.map((player)=>{
				return(
					<div style={{display: 'flex', flexDirection: 'row'}}key={player.Name}>
					<p>{player.Name}</p> 
					<DropDownMenu
						style={{width: 150}}
						value={this.state.awards[player.playerID].awardType}
						onChange={this.handleTypeChange.bind(this, player.playerID)}>
						<MenuItem primaryText="Gold" value="AWARD_GOLD"/>
						<MenuItem primaryText="EXP" value="AWARD_EXP"/>
					</DropDownMenu>
					<TextField 
						id={player.Name}
						type='number'
						style={{width: 50}}
						value={this.state.awards[player.playerID].awardAmount}
						onChange={this.handleAmountChange.bind(this, player.playerID)}/>
					</div>
				)
			})
		}
		return(
			<div className="App-stats">
				{players}
				<RaisedButton 
					label="Award Players"
					onTouchTap={this.sendAwards}/>
			</div>
		)
	}

}

export default Awards;