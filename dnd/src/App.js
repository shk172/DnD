import React, { Component, PropTypes } from 'react';
import './App.css';
import './services/firebaseConfig';
import firebase from 'firebase';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';
import firebaseSignIn from './services/firebaseSignIn';
import firebaseSignUp from './services/firebaseSignUp';


import Authentication from './containers/Authentication';
//import Note from './containers/Note';
import Stats from './containers/Stats';

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
    if(this.state.error){
    	return(
    		<p>{this.state.errorMessage}</p>
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
              <Stats player={this.state.player} />
            </div>

            <div className="App-inventoryandmagic">
              <div className="App-inventory">
                <p>Inventory:</p>
                <p>Not yet implemented</p>
              </div>
              <div className="App-magicandskill">
                <p>Magics/Skill</p>
                <p>Not yet implemented</p>
              </div>
            </div>

            <div className="App-note">
              {/*<Note player={this.state.player}/>*/}
            </div> 
          </div>
        </div> 
      );      
    }
  }
}

export default App;
