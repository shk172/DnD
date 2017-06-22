import React, { Component, PropTypes } from 'react';
import './App.css';
import firebase from 'firebase';
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
      loading: true
    }
    this.onUpdate = this.onUpdate.bind(this);
  } 

  componentWillMount(){
    var app = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        app.setState({
          loggedIn: true,
          email: "",
          password: "",
          loading: false,
        });
        console.log("You are logged in");
      }
      else{
        app.setState({
          loggedIn: false,
          email: "",
          password: "",
          loading: false,
        });
      }
    });
  }

  onUpdate(data){
    this.setState(data);
  }

  render() {
    if(!this.state.loggedIn && this.state.loggedIn !== undefined){
      return(
        <div>
          <Authentication onUpdate={this.onUpdate}/>
        </div>
      );
    }
    
    else if(this.state.error){
    	return(
    		<p>{this.state.errorMessage}</p>
    	)
    }

    else if(!this.state.loading){
      return(
        <div>
        	<MainHub/>
        </div> 
      );      
    }

    else{
      console.log(this.state);
      return(
        <p>Loading...</p>
        )
    }
  }
}

export default App;
