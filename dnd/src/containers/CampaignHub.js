import React, { Component } from 'react';
import firebase from 'firebase';

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
		};
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentWillMount(){
		importPlayerCharacter(this.state.userID, this.state.campaignID).then(
			(character)=>{
				if(Object.keys(character).length > 1){
					this.setState({
						character: character,
						loading: false,
					})
				}
				
				else{
					this.setState({
						characterCreate: true,
						loading: false,
					})
				}
			});
	}

	onUpdate(data){
   	this.setState(data);
  }

  handleTabChange(tab){
		this.setState({tab: tab});
	}

	render(){
		if(this.state.loading){
			return(
				<div>Loading...</div>
				)
		}

		if(this.state.characterCreate){
			return(
				<CharacterInfoForm 
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
							label="Characters"
							onActive={this.handleTabChange.bind(this, "Characters")}/>
						<Tab 
							style={styles.tab}
							label="Dies"
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