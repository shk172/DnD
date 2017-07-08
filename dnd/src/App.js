import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import Authentication from './containers/Authentication';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MainHub from './containers/MainHub';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

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
    }
    injectTapEventPlugin();
    this.onUpdate = this.onUpdate.bind(this);
    this.signOut = this.signOut.bind(this);
  } 

  componentWillMount(){
    var app = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        app.setState({
          user: firebase.auth().currentUser,
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
          loading: true,
        });
        console.log("You are logged out.");
      }
    });
  }

  onUpdate(data){
    this.setState(data);
  }

  signOut(){
    this.setState({
      loading: true,
      loggedIn: false,
    });

    firebase.auth().signOut();
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
           <AppBar
              style={styles.bar}
              title="There Will Be Dragons"
              iconElementRight={
                <FlatButton label="Sign Out" onTouchTap={this.signOut}/>}
            />
            <img src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-113a3.appspot.com/o/Images%2Flogo.png?alt=media&token=34df0685-ad92-44c5-a423-40357408a830" className="App-logo" alt="logo" />
            {this.state.user.email}
        	<MainHub onUpdate={this.onUpdate}/>
        </div> 
      );      
    }

    else{
      return(
        <p>Loading...</p>
        )
    }
  }
}
const styles = {
  bar: {
    backgroundColor: '#D17400',
  },
};
export default App;