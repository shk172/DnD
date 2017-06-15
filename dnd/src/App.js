import React, { Component, PropTypes } from 'react';
import './App.css';
import Authentication from './containers/Authentication';
import MainHub from './containers/MainHub';

/*
	Layout of the app:
		App:
			-Authentication
			-MainHub
				=CreateCampaign
				=CampaignList
				=UserCampaignList
					-CampaignHub
						=Map
						=CharacterHub
							-Stats
							-Note
							-Inventory
							-MagicAndAbilities
						=CreateCharacter
							-CharacterInfoForm
*/

class App extends Component {
   constructor(props){
    super(props);
    this.state={
      loading: true,
      loggedIn: false,
      email: "",
      password: "",
      playerRef: {},
    };
    this.onUpdate = this.onUpdate.bind(this);
  } 
  
  onUpdate(data){
    this.setState(data);
  }

  render() {
    if(!this.state.loggedIn){
      return(
        <div>
          <Authentication onUpdate={this.onUpdate}/>
        </div>
      );
    }
    if(this.state.loading){
      return(
        <p>Loading...</p>
        )
    }
    if(this.state.error){
    	return(
    		<p>{this.state.errorMessage}</p>
    	)
    }
    else{
      return(
        <div>
        	<MainHub playerRef={this.state.playerRef}/>
        </div> 
      );      
    }
  }
}

export default App;
