import React, { Component } from 'react';
import './App.css';
import fb from './firebaseConfig';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';

const ref = fb.database.ref("Players/SangHee");

var user = {};

class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {
      tempName: '',
      tempRace: '',
    };
    this.nameChange = this.nameChange.bind(this);
    this.raceChange = this.raceChange.bind(this);
    this.submitName = this.submitName.bind(this);
    this.submitRace = this.submitRace.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
  }
  raceChange(event){
    this.setState({tempRace: event.target.value});
  }
  nameChange(event){
    this.setState({tempName: event.target.value});
  }

  incrementLevel(event){
    if(this.state.level < 99){
      this.setState({level: this.state.level + 1});
      event.preventDefault();
      console.log(this.state.level);
      var tmp = {};
      tmp.level = this.state.level;
      ref.update(tmp);
    }
    
  }
  decrementLevel(event){
    if(this.state.level > 1){
      this.setState({level: this.state.level - 1});
      var tmp = {};
      tmp.level = this.state.level;
      ref.update(tmp);
    }
    
  }

  submitName(event){
    var tmp = {};
    tmp.name = this.state.tempName;
    ref.update(tmp);

    this.setState({name: this.state.tempName});
    event.preventDefault();
  }

  submitRace(event){
    var tmp = {};
    tmp.race = this.state.tempRace;
    ref.update(tmp);

    this.setState({race: this.state.tempRace});
    event.preventDefault();
  }
  render(){
    return (
      <div>
        <p>Name: {user.name}</p>
        <p>Race: {user.race}</p>

        <div>
          <button onClick={this.decrementLevel}> - </button>
          Level: {user.level}
          <button onClick={this.incrementLevel}> + </button>
        </div>

        <form onSubmit={this.submitName}>
          <label>
            Edit Name:
            <input type="text" value={this.state.tempName} onChange={this.nameChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>

        <form onSubmit={this.submitRace}>
          <label>
            Edit Race:
            <input type="text" value={this.state.tempRace} onChange={this.raceChange}/>
            </label>
          <input type="submit" value="Submit"/>
        </form>          
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
      ref.update(tmp);
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
    this.setState({
      editorState: EditorState.createWithContent(
      ContentState.createFromText(user.note))
    }) 
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



class App extends Component {
   constructor(props){
    super(props);
    this.state={
      loading: true,
    };
  } 
  componentWillMount(){
    ref.on("value", (dataSnapshot) => {
      user.name = dataSnapshot.val().name;
      user.race = dataSnapshot.val().race;
      user.level = dataSnapshot.val().level;
      user.note = dataSnapshot.val().note;
      user.stats = dataSnapshot.val().stats;
      user.money = dataSnapshot.val().money;
      user.health = dataSnapshot.val().health;
      user.speed = dataSnapshot.val().speed;
      this.setState({
        loading: false,
      });
    });
    
  }
  render() {
    if(this.state.loading){
      return(
        <p>Loading...</p>
      );
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
