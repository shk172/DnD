import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link, withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
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
    color: 'white',
  },
};

class AppClass extends Component {
   constructor(props){
    super(props);
    this.state={
      loading: true,
    }
    injectTapEventPlugin();
    this.reset = this.props.reset.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.signOut = this.signOut.bind(this);
  } 

  componentWillMount(){
    this.reset();
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
        //console.log("You are logged in");
      }
      else{
        app.setState({
          loggedIn: false,
          email: "",
          password: "",
          loading: true,
        });
        //console.log("You are logged out.");
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
      <div>
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
        <Link to='/' 
          onClick={this.reset}
          style={{textDecoration: 'none'}}>
          <IconButton iconClassName="material-icons">home</IconButton>
        </Link>
      </div>
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
              title={<a style={styles.title}>{this.props.title.title}</a>}
              iconElementLeft={<Logged/>}
              iconElementRight={<div style={{marginTop: 5}}></div>}
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


const resetTitle = () => {
  return{
    type: "RESET"
  }
}
//mapDispatchToProps puts any function that can be called 
//by the component to its props. Whenever the function is called
//the dispatch function sends the result of the variable provided
//to the reducers, which will then change the state in mapStateToProps.
const mapDispatchToProps = dispatch => {
  return{
    reset: () => {
      dispatch(resetTitle())
    }
  }
}


//mapStateToProps puts everything under its 
//return to this component's props
//State is processed in the reducers
const mapStateToProps = state => {
  return{
    title: state.pageTitle
  }
}

const App = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppClass));

export default App;