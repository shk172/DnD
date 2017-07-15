import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';

import firebase from 'firebase';

class DungeonMasterDice extends Component{
	constructor(props){
		super(props);
		this.state={
        character: this.props.character,
	      campaignID: this.props.campaignID,
	      diceResult: {
	        4: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        6: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        8: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        10: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        12: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        20: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	        100: {
	        	name: '',
	        	description: '',
	        	roll: '',
	        },
	      },
	      userID: this.props.userID,
	    };
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value].name = this.state.character.Name;
		diceResult[value].description = "This player rolled a d" + value + ".";
		diceResult[value].roll = Math.floor(Math.random() * value) + 1;
		var playerDiceRef = firebase.database().ref("/Campaigns/" + this.state.campaignID + "/DiceResults/" + this.state.character.Name);
		playerDiceRef.set(diceResult[value]);
		this.setState(diceResult);
	}

	render(){
		return(
			<List className="App-Dice">
				<p>Dies</p>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 4)} 
					primaryText="d4"
					secondaryText={this.state.diceResult[4].roll}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 6)} 
					primaryText="d6"
					secondaryText={this.state.diceResult[6].roll}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 8)} 
					primaryText="d8"
					secondaryText={this.state.diceResult[8].roll}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 10)} 
					primaryText="d10"
					secondaryText={this.state.diceResult[10].roll}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 12)} 
					primaryText="d12"
					secondaryText={this.state.diceResult[12].roll}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 20)} 
					primaryText="d20"
					secondaryText={this.state.diceResult[20].roll}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 100)} 
					primaryText="d100"
					secondaryText={this.state.diceResult[100].roll}/> 
			</List>)
	}
}

export default DungeonMasterDice;