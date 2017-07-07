import React, {Component} from 'react';
import firebase from 'firebase';

class Dies extends Component{
	constructor(props){
		super(props);
		this.state={
	      characterName: this.props.characterName,
	      campaignID: this.props.campaignID,
	      diceResult: {
	        4: 1,
	        6: 1,
	        8: 1,
	        10: 1,
	        12: 1,
	        20: 1,
	        100: 1,
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
			<div className="App-Dice">
				Dies <br/>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 4)}>d4</button> {this.state.diceResult[4]}<br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 6)}>d6</button> {this.state.diceResult[6]}<br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 8)}>d8</button> {this.state.diceResult[8]}<br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 10)}>d10</button> {this.state.diceResult[10]}<br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 12)}>d12</button> {this.state.diceResult[12]}  <br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 20)}>d20</button> {this.state.diceResult[20]}<br/>
				</div>
				<div className="App-Dice-Section">
					<button onClick={this.rollDice.bind(this, 100)}>d100</button> {this.state.diceResult[100]}<br/>
				</div>
			</div>)
	}
}

export default Dies;