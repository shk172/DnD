import React, { Component } from 'react';
import '../App.css';
import Dies from './Dies';
import Stats from './Stats';

class CharacterHub extends Component {
   constructor(props){
    super(props);
    this.state={
      tab: this.props.tab,
      character: this.props.character,
      campaignID: this.props.campaignID,
    };
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

    if(this.props.tab === "Dice"){
      return(
        <div className="App">
          <div className="App-modules">
            <Dies 
              userID={this.state.userID} 
              campaignID={this.state.campaignID} 
              character={this.state.character}/>
          </div>
        </div> 
      )
    }

    else{
      return(
        <div className="App">
          <Stats character={this.state.character} />
        </div>
      )
    }
  }
}

export default CharacterHub;