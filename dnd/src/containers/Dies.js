import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';

import firebase from 'firebase';

class Dies extends Component{
	constructor(props){
		super(props);
		this.state={
	      characterName: this.props.characterName,
	      campaignID: this.props.campaignID,
	      diceResult: {
	        4: '',
	        6: '',
	        8: '',
	        10: '',
	        12: '',
	        20: '',
	        100: '',
	      },
	      userID: this.props.userID,
	    };
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value] = Math.floor(Math.random() * value) + 1;
		var playerDiceRef = firebase.database().ref("/Campaigns/" + this.state.campaignID + "/DiceResults/" + this.state.characterName);
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
					secondaryText={this.state.diceResult[4]}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 6)} 
					primaryText="d6"
					secondaryText={this.state.diceResult[6]}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 8)} 
					primaryText="d8"
					secondaryText={this.state.diceResult[8]}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 10)} 
					primaryText="d10"
					secondaryText={this.state.diceResult[10]}/>
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 12)} 
					primaryText="d12"
					secondaryText={this.state.diceResult[12]}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 20)} 
					primaryText="d20"
					secondaryText={this.state.diceResult[20]}/> 
				<ListItem 
					className="App-Dice-Section"
					onTouchTap={this.rollDice.bind(this, 100)} 
					primaryText="d100"
					secondaryText={this.state.diceResult[100]}/> 
			</List>)
	}
}

export default Dies;