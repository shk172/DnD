import React, { Component } from 'react';


import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';

import CharacterInfoForm from './CharacterInfoForm';
import Dies from './Dies';
import PlayerSummary from './PlayerSummary';
import PlayerDetails from './PlayerDetails';

import firebase from 'firebase';
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
			tab: "Characters",
		}

		this.createNewNPC = this.createNewNPC.bind(this);
		this.listenForUpdates = this.listenForUpdates.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.pageRender = this.pageRender.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	componentWillMount(){
		var cPlayers = [];
		importCampaignPlayers(this.state.campaignID).then((campaignPlayers)=>{
			cPlayers = campaignPlayers;
		}).then(()=>{
			importCampaignNPCs(this.state.campaignID).then((npcs)=>{
				this.setState({
					npcs: npcs,
					campaignPlayers: cPlayers,
					loading: false,
				})
			});
		});
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

	onUpdate(data){
		this.setState(data);
	}

	pageRender(tab, playerList, npcList, diceRolls){
		if(tab === "Characters"){
			return(
				<div style={styles.root}>
					<div>
						<GridList
							cellHeight={155}
							style={styles.gridList}>
							<Subheader>Players</Subheader>
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
		else if(tab === "Dies"){
			return(
				<div style={styles.dies}>
					<Dies userID={this.state.userID} campaignID={this.state.campaignID} characterName="DM"/>
					<div className="App-Dice">
						<p>Dice Results</p>
						{diceRolls}
					</div>
				</div>
			)
		}
	}

	rollDice(value){
		var diceResult = this.state.diceResult;
		diceResult[value] = Math.floor(Math.random() * value) + 1;
		this.setState(diceResult);
	}

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
							title={player.name}
							actionIcon={<FlatButton 
														label="Details" 
														labelStyle={{fontSize: '10px'}}
														style={styles.characterDetailButton}
														onTouchTap={this.handleCardOpen.bind(this, player.name)}>
														<Popover
															anchorEl={this.state.popover["target"]}
										          open={this.state.popover[player.name]}
										          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
										          targetOrigin={{horizontal: 'right', vertical: 'top'}}
										          onRequestClose={this.handleCardOpen.bind(this, player.name)}>
										        	<Card>
																<CardHeader
																	subtitle={<PlayerSummary player={player}/>}
																	actAsExpander={true}
																	showExpandableButton={true}/>
																<CardText expandable={true}>
																	<PlayerDetails player={player}/>
																</CardText>
															</Card>
										        </Popover>
													</FlatButton>}> 
							<img src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-113a3.appspot.com/o/Images%2Fno_avatar.png?alt=media&token=c9e2956c-1f73-4f2c-9135-e13b2f108a9f"/>
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
							title={npc.name}
							actionIcon={<FlatButton 
														label="Details" 
														labelStyle={{fontSize: '10px'}}
														style={styles.characterDetailButton}
														onTouchTap={this.handleCardOpen.bind(this, npc.name)}>
														<Popover
															anchorEl={this.state.popover["target"]}
										          open={this.state.popover[npc.name]}
										          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
										          targetOrigin={{horizontal: 'right', vertical: 'top'}}
										          onRequestClose={this.handleCardOpen.bind(this, npc.name)}>
										        	<Card>
																<CardHeader
																	subtitle={<PlayerSummary player={npc}/>}
																	actAsExpander={true}
																	showExpandableButton={true}/>
																<CardText expandable={true}>
																	<PlayerDetails player={npc}/>
																</CardText>
															</Card>
										        </Popover>
													</FlatButton>}> 
							<img src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-113a3.appspot.com/o/Images%2Fno_avatar.png?alt=media&token=c9e2956c-1f73-4f2c-9135-e13b2f108a9f"/>
						</GridTile>
						)
				});
			}
			
			var diceRolls = [];
			if(this.state.diceRolls.length !== 0){
				diceRolls = this.state.diceRolls.map((result)=>{
					return(
						<div className="App-Dice-Section">
							{result.name} {result.roll}
						</div>
						)
				})
			}

			return(
				<div>
					<Tabs>
						<Tab 
							style={styles.tab}
							label="Characters"
							onActive={this.handleTabChange.bind(this, "Characters")}/>
						<Tab 
							style={styles.tab}
							label="Dies"
							onActive={this.handleTabChange.bind(this, "Dies")}/>
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
		this.listenForUpdates();
	}

	listenForUpdates() {
		var app = this;
	  const diceResultRef = firebase.database().ref("Campaigns/" + this.state.campaignID + "/DiceResults");
	  diceResultRef.on("value", (results)=>{
	  	var diceRolls = [];
	  	results.forEach((player)=>{		
	  		var diceResult = {
	  			name: player.key,
	  			roll: player.val(),
	  		}
	  		diceRolls.push(diceResult);
	  		app.setState({
	  			diceRolls: diceRolls
	  		})
			});
	  });
	}		
}

export default DungeonMasterHub;



/*<Popover>
									
								</Popover>*/