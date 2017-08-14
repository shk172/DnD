import React, { Component } from 'react';
import '../App.css';

import CampaignDetailsPlayer from './CampaignDetailsPlayer';
import Dies from './Dies';
import Stats from './Stats';

class CharacterHub extends Component {
   constructor(props){
    super(props);
    this.state={
      tab: this.props.tab,
      character: this.props.character,
      campaign: this.props.campaign,
    };
    console.log(this.state);
    this.onUpdate = this.onUpdate.bind(this);
  } 

  onUpdate(data){
    this.setState(data);
  }

  render() {
    if(this.state.loading){
      return(
        <p>Loading...</p>
        )
    }

    if(this.props.tab === "TAB_DICE"){
      return(
        <div className="App">
          <div className="App-modules">
            <Dies 
              userID={this.state.userID} 
              campaignID={this.state.campaign.campaignID} 
              character={this.state.character}/>
          </div>
        </div> 
      )
    }

    if(this.props.tab === "TAB_CHARACTER") {
      return(
        <div className="App">
          <Stats character={this.state.character} />
        </div>
      )
    }

    else{
      return(
        <div className="App">
          <CampaignDetailsPlayer
            campaign={this.state.campaign}/>
        </div>)
    }
  }
}

export default CharacterHub;