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
      showingStats: true
    };
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.showStats = this.showStats.bind(this);
    this.showSkills = this.showSkills.bind(this);
    this.showStatsOrSkills = this.showStatsOrSkills.bind(this);
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
    }
  }
  showStats(){
    this.setState({showingStats: true});
  }
  showSkills(){
    this.setState({showingStats: false});
  }
  
  showStatsOrSkills(boolean){
    if(boolean){
      return(
        <div>
          <ul>
            <li>Name: {user.name}</li>
            <li>Race: {user.race}</li>
            <li>Level: {user.level} 
              <button onClick={this.decrementLevel}> - </button>
              <button onClick={this.incrementLevel}> + </button>
            </li>
            <li>Health: {user.health}</li>
            <li>Money: {user.money}</li>
          </ul>
          <br/>
          Stats:
          <ul>
            <li>Strength: {user.strength}</li>
            <li>Dexterity: {user.dexterity}</li>
            <li>Constitution: {user.constitution}</li>
            <li>Intelligence: {user.intelligence}</li>
            <li>Wisdom: {user.wisdom}</li>
            <li>Charisma: {user.charisma}</li>
          </ul>
        </div>
      )      
    }
    else{
      return(
        <div>
          Skills:
          <ul>
            <li>Acrobatics: {user.acrobatics}</li>
            <li>Animal Handling: {user.animalHandling}</li>
            <li>Arcana: {user.arcana}</li>
            <li>Athletics: {user.athletics}</li>
            <li>Deception: {user.deception}</li>
            <li>History: {user.history}</li>
            <li>Insight: {user.insight}</li>
            <li>Intimidation: {user.intimidation}</li>
            <li>Investigation: {user.investigation}</li>
            <li>Medicine: {user.medicine}</li>
            <li>Nature: {user.nature}</li>
            <li>Perception: {user.perception}</li>
            <li>Performance: {user.performance}</li>
            <li>Persuasion: {user.persuasion}</li>
            <li>Religion: {user.religion}</li>
            <li>Sleight of Hand: {user.sleightOfHand}</li>
            <li>Stealth: {user.stealth}</li>
            <li>Survival: {user.survival}</li>
          </ul>
        </div>
      )
    }

  }
  render(){
    return (
      <div>
        <div>
          <button onClick={this.showStats} className="App-auth-signupbutton">Sign Up</button>
          <button onClick={this.showSkills} className="App-auth-signinbutton">Sign In</button>
        </div>
        {this.showStatsOrSkills(this.state.showingStats)}
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
      errorCode: '',
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
      this.setState({
        errorMessage: error.message,
        errorCode: error.code,
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
      this.setState({
        errorMessage: error.message,
        errorCode: error.code,
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
      user.health = dataSnapshot.val().health;

      user.strength = dataSnapshot.val().strength;
      user.dexterity = dataSnapshot.val().dexterity;
      user.constitution = dataSnapshot.val().constitution;
      user.intelligence = dataSnapshot.val().intelligence;
      user.wisdom = dataSnapshot.val().wisdom;
      user.charisma = dataSnapshot.val().charisma;
      this.props.onUpdate({loading: false});
    });
  }

  raceChange(event){
    this.setState({tempRace: event.target.value});
  }
  nameChange(event){
    this.setState({tempName: event.target.value});
  }
  statChange(event){
    this.setState({tempStrength: event.target.value});
  }
  submitInfo(event){
    console.log(this.state.tempStrength);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage + " " + errorCode);
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
        health: 20,
        note: '',
        money: 0,

        strength: this.state.tempStrength,
        dexterity: this.state.tempDexterity,
        constitution: this.state.tempConstitution,
        intelligence: this.state.tempIntelligence,
        wisdom: this.state.tempWisdom,
        charisma: this.state.tempCharisma,

        strengthST: this.state.tempStrengthST,
        dexterityST: this.state.tempDexterityST,
        constitutionST: this.state.tempConstitutionST,
        intelligenceST: this.state.tempIntelligenceST,
        wisdomST: this.state.tempWisdomST,
        charismaST: this.state.tempCharismaST,

        acrobatics: this.state.tempAcrobatics,
        animalHandling: this.state.tempAnimalHandling,
        arcana: this.state.tempArcana,
        athletics: this.state.tempAthletics,
        deception: this.state.tempDeception,
        history: this.state.tempHistory,
        insight: this.state.tempInsight,
        intimidation: this.state.tempIntimidation,
        investigation: this.state.tempInvestigation,
        medicine: this.state.tempMedicine,
        nature: this.state.tempNature,
        perception: this.state.tempPerception,
        performance: this.state.tempPerformance,
        persuasion: this.state.tempPersuasion,
        religion: this.state.tempReligion,
        sleightOfHand: this.state.tempSleightOfHand,
        stealth: this.state.tempStealth,
        survival: this.state.tempSurvival
      });
      this.setState({signUp: false});
      this.props.onUpdate({loggedIn: true});
      this.importInfo();
    });
    event.preventDefault();
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
        <p>{this.state.errorMessage}</p>
        )
    }
    if(this.state.signUp){
      return(
        <div className="App">
          <form onSubmit={this.submitInfo}>
            <label>
              <div>
                <p>Name: <input type="text" value={this.state.tempName} onChange={this.nameChange}/> {this.state.tempName}</p>
                <p>Race: <input type="text" value={this.state.tempRace} onChange={this.raceChange}/></p>
                
                <p>Stats</p>
                <p>Strength: <input type="number" stat={this.state.tempStrength} onChange={this.statChange}/></p>
                <p>Dexterity: <input type="number" value={this.state.tempDexterity} /></p>
                <p>Constitution: <input type="number" value={this.state.tempConstitution} /></p>
                <p>Intelligence: <input type="number" value={this.state.tempIntelligence} /></p>
                <p>Wisdom: <input type="number" value={this.state.tempWisdom} /></p>
                <p>Charisma: <input type="number" value={this.state.tempCharisma} /></p>
                
                <p>Saving Throws</p>
                <p>Strength: <input type="number" value={this.state.tempStrengthST}/></p>
                <p>Dexterity: <input type="number" value={this.state.tempDexterityST} /></p>
                <p>Constitution: <input type="number" value={this.state.tempConstitutionST} /></p>
                <p>Intelligence: <input type="number" value={this.state.tempIntelligenceST} /></p>
                <p>Wisdom: <input type="number" value={this.state.tempWisdomST} /></p>
                <p>Charisma: <input type="number" value={this.state.tempCharismaST} /></p>
              </div>
                
              <div>
                <p>Modifiers</p>
                <p>Acrobatics: <input type="number" value={this.state.tempAcrobatics}/></p>
                <p>Animal Handling: <input type="number" value={this.state.tempAnimalHandling} /></p>
                <p>Arcana: <input type="number" value={this.state.tempArcana} /></p>
                <p>Athletics: <input type="number" value={this.state.tempAthletics} /></p>
                <p>Deception: <input type="number" value={this.state.tempDeception} /></p>
                <p>History: <input type="number" value={this.state.tempHistory} /></p>
                <p>Insight: <input type="number" value={this.state.tempInsight}/></p>
                <p>Intimidation: <input type="number" value={this.state.tempIntimidation} /></p>
                <p>Investigation: <input type="number" value={this.state.tempInvestigation} /></p>
                <p>Medicine: <input type="number" value={this.state.tempMedicine} /></p>
                <p>Nature: <input type="number" value={this.state.tempNature}/></p>
                <p>Perception: <input type="number" value={this.state.tempPerception} /></p>
                <p>Performance: <input type="number" value={this.state.tempPerformance} /></p>
                <p>Persuasion: <input type="number" value={this.state.tempPersuasion} /></p>
                <p>Religion: <input type="number" value={this.state.tempReligion}/></p>
                <p>Sleight of Hand: <input type="number" value={this.state.tempSleightOfHand} /></p>
                <p>Stealth: <input type="number" value={this.state.tempStealth} /></p>
                <p>Survival: <input type="number" value={this.state.tempSurvival} /></p>
              </div>  

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
              <Note/>
            </div> 
          </div>
        </div> 
      );      
    }
  }
}

export default App;
