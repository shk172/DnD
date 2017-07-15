import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Authentication from './containers/Authentication';
import MainHub from './containers/MainHub';

const styles = {
  bar: {
    backgroundColor: '#D17400',
  },
  title: {
    cursor: 'pointer',
    color: 'white',
  },
};

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
              title={<Link to='/' style={{textDecoration: 'none'}} ><span style={styles.title}>There Will Be Dragons</span></Link>}
              iconElementLeft={<Logged/>}
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

export default App;