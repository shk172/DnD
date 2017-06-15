import React, { Component, PropTypes } from 'react';
import '../services/firebaseConfig';
import firebase from 'firebase';
import firebaseSignIn from '../services/firebaseSignIn';
import firebaseSignUp from '../services/firebaseSignUp';
import CharacterInfoForm from './CharacterInfoForm';

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
      selectSignUp: true,
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.firebaseSignUp = this.firebaseSignUp.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
    this.setSignUp = this.setSignUp.bind(this);
    this.setSignIn = this.setSignIn.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
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

  setSignUp(){
    this.setState({selectSignUp: true});
  }

  setSignIn(){
    this.setState({selectSignUp: false});
  }

  showSignUp(boolean){
    if(boolean){
      return(
        <form className="App-auth-signup" onSubmit={this.firebaseSignUp}>
          <label>
            <p>Sign Up</p>
            <p>Email: <input type="email" onChange={this.handleEmail}/> </p>
            <p>Password: <input type="password" onChange={this.handlePassword}/> </p>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      )
    }
    else{
      return(
        <form className="App-auth-signin" onSubmit={this.firebaseSignIn}>
          <label>
            <p>Sign In</p>
            <p>Email: <input type="email" onChange={this.handleEmail}/></p>
            <p>Password: <input type="password" onChange={this.handlePassword}/></p>
          </label>
          <input type="submit" value="Submit"/>
        </form>  
        )
    }
  }

  render(){
    if(this.state.error){
      return(
          <div className="App-auth">
            <div className="App-auth-buttons">
              <button onClick={this.setSignUp} className="App-auth-signupbutton">Sign Up</button>
              <button onClick={this.setSignIn} className="App-auth-signinbutton">Sign In</button>
            </div>
            {this.showSignUp(this.state.selectSignUp)}
            <p className="error">{this.state.errorMessage}</p>
          </div>
        )
    }
    else{
      return(
          <div className="App-auth">
            <div className="App-auth-buttons">
              <button onClick={this.setSignUp} className="App-auth-signupbutton">Sign Up</button>
              <button onClick={this.setSignIn} className="App-auth-signinbutton">Sign In</button>
            </div>
            {this.showSignUp(this.state.selectSignUp)}
          </div>
      )      
    }
  }
}

export default Authentication;