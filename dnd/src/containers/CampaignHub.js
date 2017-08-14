import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';

import CharacterHub from './CharacterHub';
import CharacterInfoForm from './CharacterInfoForm';

import determinePlayerCharacterImport from '../actions/determinePlayerCharacterImport';
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

class Campaign extends Component{
  constructor(props){
    super(props);
    this.state={
      added: "",
      userID: this.props.userID,
      campaignID: this.props.campaignID,
      characterCreate: false,
      tab: "TAB_DETAILS",
      campaignTitle: this.props.campaignTitle,
    };
    this.props.initialize(this.state.userID, this.state.campaignID);
    this.onUpdate = this.onUpdate.bind(this);
  }
  
  handleTabChange(tab){
    this.setState({tab: tab});
  }
  
  onUpdate(data){
      this.setState(data);
  }

  render(){
    if(!this.props.campaignInfo.loaded || 
      !this.props.playerInfo.loaded){
      return(
        <div>Loading...</div>
        )
    }
    if(this.props.playerInfo.characterCreate === true){
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
            character={this.props.playerInfo.character} 
            campaign={this.props.campaignInfo.campaign}/>
        </div>
      )
    }
    
  }
}

//mapDispatchToProps puts any function that can be called 
//by the component to its props. Whenever the function is called
//the dispatch function sends the result of the variable provided
//to the reducers, which will then change the state in mapStateToProps.
const mapDispatchToProps = dispatch => {
  return{
    initialize: (userID, campaignID) => {
      dispatch(determinePlayerCharacterImport(userID, campaignID));
    }
  }
}

//mapStateToProps puts everything under its 
//return to this component's props
//State is processed in the reducers
const mapStateToProps = state => {
  console.log(state.campaignInfo);
  return{
    campaignInfo: state.campaignInfo,
    playerInfo: state.playerInfo,
  }
}

const CampaignHub = connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaign)

export default CampaignHub;