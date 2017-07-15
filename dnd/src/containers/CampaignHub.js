import React, { Component } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import CharacterHub from './CharacterHub';
import CharacterInfoForm from './CharacterInfoForm';

import importPlayerCharacter from '../services/importPlayerCharacter';

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

class CampaignHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			userID: this.props.userID,
			campaignID: this.props.campaignID,
			characterCreate: false,
			tab: "Character",
			campaignTitle: this.props.campaignTitle,
		};
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentWillMount(){
		importPlayerCharacter(this.state.userID, this.state.campaignID).then(
			(character)=>{
				if(Object.keys(character).length > 1){
					console.log("character exists");
					this.setState({
						character: character,
						loading: false,
					})
				}
				
				else{
					console.log("character does not exist");
					this.setState({
						characterCreate: true,
						loading: false,
					})
				}
			});
	}
	
	handleTabChange(tab){
	  this.setState({tab: tab});
	}
	
	onUpdate(data){
   		this.setState(data);
	}

	render(){
		if(this.state.loading){
			return(
				<div>Loading...</div>
				)
		}
		if(this.state.characterCreate === true){
			return(
				<CharacterInfoForm 
					tab={this.state.tab}
					userID={this.state.userID} 
					campaignID={this.state.campaignID}
					onUpdate={this.onUpdate}
					characterType="Players"/>
			)
		}

		else{
			return(
				<div>
					<Tabs>
			            <Tab 
			              style={styles.tab}
			              label="Character"
			              onActive={this.handleTabChange.bind(this, "Character")}/>
			            <Tab 
			              style={styles.tab}
			              label="Dice"
			              onActive={this.handleTabChange.bind(this, "Dice")}/>
			        </Tabs>
					<CharacterHub 
						tab={this.state.tab}
						character={this.state.character} 
						campaignID={this.state.campaignID}/>
				</div>
			)
		}
		
	}
}
export default CampaignHub;