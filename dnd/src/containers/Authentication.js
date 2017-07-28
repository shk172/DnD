import React, { Component } from 'react';
import '../services/firebaseConfig';
import firebaseSignIn from '../services/firebaseSignIn';
import firebaseSignUp from '../services/firebaseSignUp';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = {
  height: '35vh',
  width: '75vw',
  marginTop: '6vh',
  padding: 30,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#FFBB66',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'center',
};

class Authentication extends Component{
  constructor(props){
    super(props);
    this.state = {
      signUp: false,
      error: false,
      errorMessage: '',
      errorCode: '',
      email: '',
      password: '',
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.firebaseSignUp = this.firebaseSignUp.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
  }

  firebaseSignIn(event){
    firebaseSignIn(this.state.email, this.state.password).then(
      (playerRef) => {
      this.props.onUpdate({
          loading: false,
          loggedIn: true,
          playerRef: playerRef,
        });
      },
      (error) => {
        this.setState({
          error: true,
          errorMessage: error.message
        })
      }
    );
    event.preventDefault();
  }

  firebaseSignUp(event){
    firebaseSignUp(this.state.email, this.state.password)
    .then(
      (playerRef) =>{
        this.props.onUpdate({
          loading: false,
          loggedIn: true,
          playerRef: playerRef,
        });
      },
      (error) => {
        this.setState({
          error: true,
          errorMessage: error.message
        })
      }
    );
    event.preventDefault();
  }

  handleEmail(event){
    this.setState({email: event.target.value});
  }

  handlePassword(event){
    this.setState({password: event.target.value});
  }

  render(){
    return(
        <div className="App-auth">
          <div className="App-Welcome">
            <div className="App-Welcome-overlay">
              <h2>There Will Be Dragons.</h2>
              <h4>Dungeons and Dragons Campaign Management</h4>
            </div>
          </div>
          <Paper style={style} zDepth={3}>
            <div className="App-auth-signup">
              <p>{"Email: "}<TextField type="email" onChange={this.handleEmail}/> </p>
              <p>{"Password: "}<TextField type="password" onChange={this.handlePassword}/> </p>
              <RaisedButton 
                onTouchTap={this.firebaseSignIn} 
                style={{margin: '5px'}}
                label="Sign In" />
              <RaisedButton 
                onTouchTap={this.firebaseSignUp} 
                style={{margin: '5px'}} 
                label="Sign Up" />
            </div>
            <p>{this.state.errorMessage}</p>
          </Paper>
        </div>
    )      
  }
}

export default Authentication;