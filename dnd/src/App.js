import React, { Component } from 'react';
import './App.css';
import fb from './firebaseConfig';
import firebase from 'firebase';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';

var userRef = null;
var user = {
  name: "",
  race: "",
  level: 1,
  money: 0,
  note: ""
};

class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
  }

  incrementLevel(event){
    if(user.level < 99){
      user.level += 1;
      var tmp = {};
      tmp.level = user.level;
      userRef.update(tmp);
    }
  }

  decrementLevel(event){
    if(user.level > 1){
      user.level -= 1;
      var tmp = {};
      tmp.level = user.level;
      userRef.update(tmp);
      console.log(user.level);
    }
  }

  render(){
    return (
      <div>
        <p>Stats:</p>
        <ul>
          <li>Name: {user.name}</li>
          <li>Race: {user.race}</li>
          <li>Level: {user.level}
            <button onClick={this.decrementLevel}> - </button>
            <button onClick={this.incrementLevel}> + </button>
          </li>
          <li>Money: {user.money}</li>
        </ul>
      </div>
    );
  }

}

class Note extends Component{
  constructor(props){
    super(props);
    this.onChange = (editorState) => {
      this.setState({editorState});
      var tmp ={}
      tmp.note = this.state.editorState.getCurrentContent().getPlainText();
      userRef.update(tmp);
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentWillMount(){
    console.log(user.note);
    if(user.note === ""){
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText("Type your notes here"))
      }); 
    }

    else{
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText(user.note))
      }); 
    }

  }
  render(){
    return(
      <div>
        <p>Note:</p>
        <Editor 
        editorState={this.state.editorState} 
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}/>
      </div>
    );
  }
}

class Authentication extends Component{
  constructor(props){
    super(props);
    this.state = {
      signUp: false,
      error: false,
      errorMessage: '',
      email: '',
      password: '',
      selectSignUp: true
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.firebaseSignUp = this.firebaseSignUp.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.raceChange = this.raceChange.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.setSignUp = this.setSignUp.bind(this);
    this.setSignIn = this.setSignIn.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
  }

  firebaseSignIn(event){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      this.setState({
        errorMessage: error.message,
        error: true});
    });
    firebase.auth().onAuthStateChanged((userProfile) => {
      if (userProfile) {
        console.log("Successfully signed in");
      }
      userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
      this.props.onUpdate({loggedIn: true});
      this.importInfo();
    });
    event.preventDefault();
  }

  firebaseSignUp(event){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        // Handle Errors here.
      var errorCode = error.code;
      this.setState({
        errorMessage: error.message,
        error: true});
    });

    if(!this.state.error){
      console.log("You have successfully signed up");
      this.setState({signUp: true});
    }
    event.preventDefault();
  }

  handleEmail(event){
    this.setState({email: event.target.value});
    console.log(this.state.email);
  }

  handlePassword(event){
    this.setState({password: event.target.value});
  }

  importInfo(){
    userRef.on("value", (dataSnapshot) => {
      user.name = dataSnapshot.val().name;
      user.race = dataSnapshot.val().race;
      user.level = dataSnapshot.val().level;
      user.note = dataSnapshot.val().note;
      user.money = dataSnapshot.val().money;
      this.props.onUpdate({loading: false});
    });
  }

  raceChange(event){
    this.setState({tempRace: event.target.value});
  }
  nameChange(event){
    this.setState({tempName: event.target.value});
  }

  submitInfo(event){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    firebase.auth().onAuthStateChanged((userProfile) => {
      if (userProfile) {
        console.log("Successfully signed in");
      }
      userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
      userRef.set({
        name: this.state.tempName,
        race: this.state.tempRace,
        level: 1,
        note: '',
        money: 0,
      });
      this.setState({signUp: false});
      this.props.onUpdate({loggedIn: true});
      this.importInfo();
    });
    event.preventDefault();
  }

  setSignUp(){
    this.setState({selectSignUp: true});
    console.log(this.state.selectSignUp);
  }
  setSignIn(){
    this.setState({selectSignUp: false})
    console.log(this.state.selectSignUp);
  }
  showSignUp(boolean){
    if(boolean){
      return(
        <form className="App-auth-signup" onSubmit={this.firebaseSignUp}>
              <label>
                <p>Sign Up</p>
                <p>Email: <input type="text" onChange={this.handleEmail}/> </p>
                <p>Password: <input type="text" onChange={this.handlePassword}/> </p>
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
                <p>Email: <input type="text" onChange={this.handleEmail}/></p>
                <p>Password: <input type="text" onChange={this.handlePassword}/></p>
              </label>
              <input type="submit" value="Submit"/>
            </form>  
        )
    }

  }
  render(){
    if(this.state.error){
      return(
        <p>{this.state.errorMessage}</p>
        )
    }
    if(this.state.signUp){
      return(
        <div>
          <form onSubmit={this.submitInfo}>
            <label>
              <p>Name:</p>
              <input type="text" value={this.state.tempName} onChange={this.nameChange}/>
              <p>Race:</p>
              <input type="text" value={this.state.tempRace} onChange={this.raceChange}/>
              </label>
              <p> Name: {this.state.tempName}</p>
              <p> Race: {this.state.tempRace}</p> 
              <input type="submit" value="Submit Info"/>
          </form>     
        </div>
        )
    }
    else{
      return(
          <div className="App-auth">
            <button onClick={this.setSignUp}>Sign Up</button>
            <button onClick={this.setSignIn}>Sign In</button>
            {this.showSignUp(this.state.selectSignUp)}
          </div>
      )      
    }
  }
}

class App extends Component {
   constructor(props){
    super(props);
    this.state={
      loading: true,
      loggedIn: false,
      email: "",
      password: ""
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
    else{
      return(
        <div className="App">
          <div className="App-header">
            <img src="https://firebasestorage.googleapis.com/v0/b/dungeonsanddragons-f7213.appspot.com/o/Images%2Flogo.png?alt=media&token=cdbed6e2-0a19-4d37-8144-ba8c61e2d5ec" className="App-logo" alt="logo" />
          </div>  

          <div className="App-modules">
            <div className="App-stats">
              <Stats/>
            </div>

            <div className="App-inventory">
              <p>Inventory:</p>
            </div>

            <div className="App-note">
              <Note/>
            </div> 
          </div>
        </div> 
      );      
    }
  }
}

export default App;
