import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Authentication from './containers/Authentication';
import CreateCampaign from './containers/CreateCampaign';
import MainHub from './containers/MainHub';

class App extends Component {
   constructor(props){
    super(props);
    this.state={
      loading: true,
      createdCampaign: false,
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
    const Title = (<FlatButton onTouchTap={console.log("touched?")}>There Will Be Dragons</FlatButton>)
    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{vertical: 'bottom'}}
      >
        <MenuItem
          primaryText={this.state.user.email}/>
        <MenuItem 
          primaryText="Sign out" 
          onTouchTap={this.signOut}/>
      </IconMenu>
    );

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
              title={Title}
              iconElementLeft={<Logged/>}
              iconElementRight={
                <CreateCampaign 
                  userID={this.state.user.uid}
                  creatingCampaign={this.state.createdCampaign}
                  onUpdate={this.onUpdate}/>}
            />
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