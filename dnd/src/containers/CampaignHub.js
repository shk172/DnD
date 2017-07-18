import React, { Component } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import CharacterHub from './CharacterHub';
import CharacterInfoForm from './CharacterInfoForm';

import getCampaign from '../services/getCampaign';
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
      tab: "TAB_DETAILS",
      campaignTitle: this.props.campaignTitle,
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillMount(){
    importPlayerCharacter(this.state.userID, this.state.campaignID).then(
      (character)=>{
        if(Object.keys(character).length > 1){
          console.log("character exists");
          var character = character;
          getCampaign(this.state.campaignID).then((campaign)=>{
            this.setState({
              campaign: campaign,
              character: character,
              loading: false,
            });
          })
        }
        
        else{
          console.log("character does not exist");
          getCampaign(this.state.campaignID).then((campaign)=>{
            this.setState({
              campaign: campaign,
              characterCreate: true,
              loading: false,
            });
            console.log(this.state.campaign);
          })
        }
      })
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
              label="Campaign Details"
              onActive={this.handleTabChange.bind(this, "TAB_DETAILS")}/>
            <Tab 
              style={styles.tab}
              label="Character"
              onActive={this.handleTabChange.bind(this, "TAB_CHARACTER")}/>
            <Tab 
              style={styles.tab}
              label="Dice"
              onActive={this.handleTabChange.bind(this, "TAB_DICE")}/>
          </Tabs>
          <CharacterHub 
            tab={this.state.tab}
            character={this.state.character} 
            campaign={this.state.campaign}/>
        </div>
      )
    }
    
  }
}
export default CampaignHub;