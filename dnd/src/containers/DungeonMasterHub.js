import React, { Component } from 'react';


import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';

import Awards from './Awards';
import CampaignDetailsDM from './CampaignDetailsDM';
import CharacterInfoForm from './CharacterInfoForm';
import DungeonMasterDice from './DungeonMasterDice';
import PlayerSummary from './PlayerSummary';
import PlayerDetails from './PlayerDetails';

import firebase from 'firebase';
import getCampaign from '../services/getCampaign';
import importCampaignPlayers from '../services/importCampaignPlayers';
import importCampaignNPCs from '../services/importCampaignNPCs';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  tab:{
  	backgroundColor: '#D17400',
  },

  gridList: {
  	display: 'flex',
  	backgroundColor: '#D17400',
  	flex: 1,
  	margin: 20,
    height: 240,
    overflowY: 'auto',
  },

  dies: {
  	display: 'flex',
  	flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  createNPC: {
  	display: 'flex',
  	flex: 1,
  },

  characterDetailButton: {
  	color: 'white',
  }
};

class DungeonMasterHub extends Component{
	constructor(props){
		super(props);
		this.state={
			campaignID: this.props.campaignID,
			userID: this.props.userID,
			campaignPlayers: [],
			npcs: [],
			loading: true,
			popover: {},
			diceResult: {
				4: 1,
				6: 1,
				8: 1,
				10: 1,
				12: 1,
				20: 1,
				100: 1,
			},
			diceRolls: [],
			npcCreate: false,
			tab: "TAB_CAMPAIGN",
			dungeonMaster: {
				Name: "Dungeon Master"
			}
		}
		this.createNewNPC = this.createNewNPC.bind(this);
		this.importCharacters = this.importCharacters.bind(this);
		this.listenForNPCUpdates = this.listenForNPCUpdates.bind(this);
		this.listenForPlayerUpdates = this.listenForPlayerUpdates.bind(this);
		this.listenForDiceUpdates = this.listenForDiceUpdates.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.pageRender = this.pageRender.bind(this);
		this.rollDice = this.rollDice.bind(this);
    this.sendAwards = this.sendAwards.bind(this);
	}

	componentWillMount(){
		this.importCharacters();
	}

	createNewNPC(){
		this.setState({npcCreate: true})
	}

	handleCardOpen(name, event){
		var popover = this.state.popover;
		if(this.state.popover[name] !== true){
			popover[name] = true;
			popover["target"] = event.currentTarget;
			this.setState(popover);
		}
		else{
			popover[name] = false;
			this.setState(popover);
		}
	}

	handleTabChange(tab){
		this.setState({tab: tab});
	}

	importCharacters(){
		var cPlayers = [];
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			cPlayers = campaignPlayers;
		}).then(()=>{
			importCampaignNPCs(this.state.campaignID).then((npcs)=>{
		        var npcsObject = npcs;
		        getCampaign(this.state.campaignID).then((campaign)=>{
		            this.setState({
		              campaignPlayers: cPlayers,
		              campaign: campaign,
		              npcs: npcsObject,
		              loading: false,
		            });
		        })
			});
		});
	}

	onUpdate(data){
		this.setState(data);
	}

	pageRender(tab, playerList, npcList, diceRolls){
		if(tab === "TAB_CHARACTERS"){
			return(
				<div style={styles.root}>
					<div>
						<GridList
							cellHeight={155}
							style={styles.gridList}>
							<Subheader>Player Characters</Subheader>
							{playerList}
						</GridList>
						<GridList
							cellHeight={155}
							style={styles.gridList}>
							<Subheader>NPCs</Subheader>
							{npcList}
						</GridList>
					</div>
					<RaisedButton 
						style={styles.createNPC}
						onTouchTap={this.createNewNPC}>
						Create a new NPC
					</RaisedButton>
				</div>
			)
		}
		else if(tab === "TAB_DICE"){
			return(
				<div className="App-modules">
					<DungeonMasterDice userID={this.state.userID} 
							campaignID={this.state.campaignID} 
							character={this.state.dungeonMaster}/>
					<div className="App-stats">
						<p>Dice Results</p>
						{diceRolls}
					</div>
				</div>
			)
		}
	    else if(tab === "TAB_AWARDS"){
	      return(
	        <div className="App-modules">
	          <Awards 
	            players={this.state.campaignPlayers}
	            sendAwards={this.sendAwards}/>
	        </div>
	      )
	    }
	    else{
	      return(
	        <div><CampaignDetailsDM campaign={this.state.campaign} players={this.state.campaignPlayers}/></div>
	        )
	    }
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value] = Math.floor(Math.random() * value) + 1;
		this.setState(diceResult);
	}

  sendAwards(awards){
    Object.keys(awards).forEach((playerID)=>{
      var playerRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/Players/" + playerID); 
      playerRef.once("value", (data)=>{
        var player = data.val();
        switch(awards[playerID].awardType){
          case "AWARD_EXP":
            player.Exp += +awards[playerID].awardAmount;
            playerRef.update(player);
            break;
          case "AWARD_GOLD":
            player.Money += +awards[playerID].awardAmount;
            playerRef.update(player);
            break;
          default:
            player.Money += +awards[playerID].awardAmount;
            playerRef.update(player);
            break;
        }
      })
    })
  };
  

	render(){
		if(this.state.npcCreate){
			return(
				<CharacterInfoForm 
						userID={this.state.userID} 
						campaignID={this.state.campaignID}
						onUpdate={this.onUpdate}
						characterType="NPCs"/>)
		}

		if(!this.state.loading){
			var playerList = [];
			if(this.state.campaignPlayers.length === 0){
				playerList = (<p>There is no player in this campaign</p>);
			}

			else{
				playerList = this.state.campaignPlayers.map((player) => {
					return(
						<GridTile
							cols={0.5}
							title={player.Name}
							actionIcon={
            				<FlatButton 
								label="Details" 
								labelStyle={{fontSize: '10px'}}
								style={styles.characterDetailButton}
								onTouchTap={this.handleCardOpen.bind(this, player.Name)}>
								<Dialog
							    	open={this.state.popover[player.Name]}
							    	modal={false}
						        	title={player.Name}
						        	autoScrollBodyContent={true}
						      		onRequestClose={this.handleCardOpen.bind(this, player.Name)}>
					          		<PlayerSummary player={player}/><br/>
					          		<Divider/>
									<PlayerDetails player={player}/><br/>
					    		</Dialog>
							</FlatButton>}> 
							<img role="presentation" src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-113a3.appspot.com/o/Images%2Fno_avatar.png?alt=media&token=c9e2956c-1f73-4f2c-9135-e13b2f108a9f"/>
						</GridTile>
					)
				});
			}

			var npcList = [];
			if(this.state.npcs.length === 0){
				npcList = (<p>There is no NPC in this campaign</p>);
			}

			else{
				npcList = this.state.npcs.map((npc) => {
					return(
						<GridTile
							cols={0.5}
							title={npc.Name}
							actionIcon={
                				<FlatButton 
									label="Details" 
									labelStyle={{fontSize: '10px'}}
									style={styles.characterDetailButton}
									onTouchTap={this.handleCardOpen.bind(this, npc.Name)}>
									<Dialog
					                    open={this.state.popover[npc.Name]}
					                    modal={false}
					                    title={npc.Name}
					                    autoScrollBodyContent={true}
					                    onRequestClose={this.handleCardOpen.bind(this, npc.Name)}>
					                    <PlayerSummary player={npc}/><br/>
					                    <Divider/>
					                    <PlayerDetails player={npc}/><br/>
					                </Dialog>
                				</FlatButton>}>
							<img role="presentation" src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-113a3.appspot.com/o/Images%2Fno_avatar.png?alt=media&token=c9e2956c-1f73-4f2c-9135-e13b2f108a9f"/>
						</GridTile>
						)
				});
			}

			var diceRolls;
			if(this.state.diceRolls.length !== 0){
				diceRolls = this.state.diceRolls.map((result)=>{
					return(
						<div className="App-Dice-Section">
							{result.name} rolled a {result.dice} and got {result.roll} on {result.time}.
						</div>
						)
				})
			}

			return(
				<div className="App">
					<Tabs>
				        <Tab
				          style={styles.tab}
				          label="Campaign"
				          onActive={this.handleTabChange.bind(this, "TAB_CAMPAIGN")}/>
						<Tab 
							style={styles.tab}
							label="Characters"
							onActive={this.handleTabChange.bind(this, "TAB_CHARACTERS")}/>
						<Tab 
							style={styles.tab}
							label="Dice"
							onActive={this.handleTabChange.bind(this, "TAB_DICE")}/>
			            <Tab
			              style={styles.tab}
			              label="Awards"
			              onActive={this.handleTabChange.bind(this, "TAB_AWARDS")}/>
					</Tabs>
					{this.pageRender(this.state.tab, playerList, npcList, diceRolls)}
				</div>
				);
		}
		else{
			return(
			<p>Loading...</p>)
		}
	}

	componentDidMount(){
		this.listenForDiceUpdates();
		this.listenForNPCUpdates();
	}

	listenForPlayerUpdates(){
		const playersRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/Players");
		playersRef.on("value", (players)=>{
			this.importCharacters();
		})
	}

	listenForNPCUpdates(){
		const npcRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/NPCs");
		npcRef.on("value", (npcs)=>{
			this.importCharacters();
		})
	}

	listenForDiceUpdates() {
		var app = this;
		var newRoll = false;
		const diceResultRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/DiceResults");
		diceResultRef.on("child_added", (results)=>{
			if(newRoll === false) return;
		  	var diceRolls = this.state.diceRolls;
			var diceResult = {
	  			name: results.val().name,
	  			roll: results.val().roll,
	  			dice: "d" + results.val().dice,
	  			time: results.val().time,
	  		}
	  		diceRolls.push(diceResult);
	  		app.setState({
	  			diceRolls: diceRolls
	  		})
		});

		diceResultRef.on("child_changed", (results)=>{
			if(newRoll === false) return;
		  	var diceRolls = this.state.diceRolls;
			var diceResult = {
	  			name: results.val().name,
	  			roll: results.val().roll,
	  			dice: "d" + results.val().dice,
	  			time: results.val().time,
	  		}
	  		diceRolls.push(diceResult);
	  		app.setState({
	  			diceRolls: diceRolls
	  		})
		});

		diceResultRef.once("value", (results)=>{
			newRoll = true;
		})
	}		
}

export default DungeonMasterHub;