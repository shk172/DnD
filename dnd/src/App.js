import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBeO7P_e3VnIQdM4ZqPvqX_UxqoJQx_TTE",
    authDomain: "dungeonsanddragons-f7213.firebaseapp.com",
    databaseURL: "https://dungeonsanddragons-f7213.firebaseio.com",
    storageBucket: "dungeonsanddragons-f7213.appspot.com",
    messagingSenderId: "982520002784"
  };

const fb = firebase  
  .initializeApp(config)
  .database()
  .ref();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Seylan',
      race: 'Dragonborn',
      level: 2,
      tempName: ''
    };
    this.nameChange = this.nameChange.bind(this);
    this.submitName = this.submitName.bind(this);
  }


  nameChange(event){
    this.setState({tempName: event.target.value});
  }
  submitName(event){
    var ref = fb.database.ref("Players/SangHee");
    var tmp = {};
    tmp.name = this.state.tempName;
    ref.update(tmp);

    this.setState({name: this.state.tempName});
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>Name: {this.state.name}</p>
        <p>Race: {this.state.race}</p>
        <p>Level: {this.state.level}</p>
        <form onSubmit={this.submitName}>
          <label>
            Edit Name:
            <input type="text" value={this.state.tempName} onChange={this.nameChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      
    );
  }
}

export default App;
