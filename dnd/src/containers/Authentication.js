import React, { Component, PropTypes } from 'react';
import './App.css';
import fb from './services/firebaseConfig';
import firebase from 'firebase';
import firebaseSignIn from './services/firebaseSignIn';
import firebaseSignUp from './services/firebaseSignUp';

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

      tempStrength: 0,
      tempDexterity: 0,
      tempConstitution: 0,
      tempIntelligence: 0,
      tempWisdom: 0,
      tempCharisma: 0,

      tempStrengthST: 0,
      tempDexterityST: 0,
      tempConstitutionST: 0,
      tempIntelligenceST: 0,
      tempWisdomST: 0,
      tempCharismaST: 0,

      tempAcrobatics: 0,
      tempAnimalHandling: 0,
      tempArcana: 0,
      tempAthletics: 0,
      tempDeception: 0,
      tempHistory: 0,
      tempInsight: 0,
      tempIntimidation: 0,
      tempInvestigation: 0,
      tempMedicine: 0,
      tempNature: 0,
      tempPerception: 0,
      tempPerformance: 0,
      tempPersuasion: 0,
      tempReligion: 0,
      tempSleightOfHand: 0,
      tempStealth: 0,
      tempSurvival: 0
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.firebaseSignUp = this.firebaseSignUp.bind(this);
    this.firebaseSignIn = this.firebaseSignIn.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.raceChange = this.raceChange.bind(this);
    this.statChange = this.statChange.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.setSignUp = this.setSignUp.bind(this);
    this.setSignIn = this.setSignIn.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
  }

  firebaseSignIn(event){
    firebaseSignIn(this.state.email, this.state.password);
    event.preventDefault();
  }

  firebaseSignUp(event){
    firebaseSignUp(this.state.email, this.state.password)
    	.then((userRef) =>{
    		this.setState({signUp: true});
    	});
    event.preventDefault();
  }

  handleEmail(event){
    this.setState({email: event.target.value});
  }

  handlePassword(event){
    this.setState({password: event.target.value});
  }

  importInfo(ref){
  	var player = {};
  	var stats = {};
  	var savingThrows = {};
  	var skills = {};
    ref.on("value", (dataSnapshot) => {
      player.name = dataSnapshot.val().name;
      player.race = dataSnapshot.val().race;
      player.level = dataSnapshot.val().level;
      player.note = dataSnapshot.val().note;
      player.money = dataSnapshot.val().money;
      player.health = dataSnapshot.val().health;
      player.armorClass = dataSnapshot.val().armorClass;
      player.speed = dataSnapshot.val().speed;

      stats.strength = dataSnapshot.val().strength;
      stats.dexterity = dataSnapshot.val().dexterity;
      stats.constitution = dataSnapshot.val().constitution;
      stats.intelligence = dataSnapshot.val().intelligence;
      stats.wisdom = dataSnapshot.val().wisdom;
      stats.charisma = dataSnapshot.val().charisma;

      savingThrows.strengthST = dataSnapshot.val().strengthST;
      savingThrows.dexterityST = dataSnapshot.val().dexterityST;
      savingThrows.constitutionST = dataSnapshot.val().constitutionST;
      savingThrows.intelligenceST = dataSnapshot.val().intelligenceST;
      savingThrows.wisdomST = dataSnapshot.val().wisdomST;
      savingThrows.charismaST = dataSnapshot.val().charismaST;

      skills.acrobatics = dataSnapshot.val().acrobatics;
      skills.animalHandling = dataSnapshot.val().animalHandling;
      skills.arcana = dataSnapshot.val().arcana;
      skills.athletics = dataSnapshot.val().athletics;
      skills.deception = dataSnapshot.val().deception;
      skills.history = dataSnapshot.val().history;
      skills.insight = dataSnapshot.val().insight;
      skills.intimidation = dataSnapshot.val().intimidation;
      skills.investigation = dataSnapshot.val().investigation;
      skills.medicine = dataSnapshot.val().medicine;
      skills.nature = dataSnapshot.val().nature;
      skills.perception = dataSnapshot.val().perception;
      skills.performance = dataSnapshot.val().performance;
      skills.persuasion = dataSnapshot.val().persuasion;
      skills.religion = dataSnapshot.val().religion;
      skills.sleightOfHand = dataSnapshot.val().sleightOfHand;
      skills.stealth = dataSnapshot.val().stealth;
      skills.survival = dataSnapshot.val().survival; 

      player.skills = skills;
      player.stats = stats;
      player.savingThrows = savingThrows;     
      this.props.onUpdate({
      	loading: false,
      	player: player,
      });
    });
  }

  raceChange(event){
    this.setState({tempRace: event.target.value});
  }
  nameChange(event){
    this.setState({tempName: event.target.value});
  }
  statChange(event){
    switch(event.target.name){
      //Stats
      case "Strength":
        this.setState({tempStrength: event.target.value});
        break;
      case "Dexterity":
        this.setState({tempDexterity: event.target.value});
        break;
      case "Constitution":
        this.setState({tempConstitution: event.target.value});
        break;
      case "Intelligence":
        this.setState({tempIntelligence: event.target.value});
        break;
      case "Wisdom":
        this.setState({tempWisdom: event.target.value});
        break;
      case "Charisma":
        this.setState({tempCharisma: event.target.value});
        break;

      //Saving Throws
      case "StrengthST":
        this.setState({tempStrengthST: event.target.value});
        break;
      case "DexterityST":
        this.setState({tempDexterityST: event.target.value});
        break;
      case "ConstitutionST":
        this.setState({tempConstitutionST: event.target.value});
        break;
      case "IntelligenceST":
        this.setState({tempIntelligenceST: event.target.value});
        break;
      case "WisdomST":
        this.setState({tempWisdomST: event.target.value});
        break;
      case "CharismaST":
        this.setState({tempCharismaST: event.target.value});
        break;

      //Skills
      case "Acrobatics":
        this.setState({tempAcrobatics: event.target.value});
        break;
      case "AnimalHandling":
        this.setState({tempAnimalHandling: event.target.value});
        break;
      case "Arcana":
        this.setState({tempArcana: event.target.value});
        break;
      case "Athletics":
        this.setState({tempAthletics: event.target.value});
        break;
      case "Deception":
        this.setState({tempDeception: event.target.value});
        break;
      case "History":
        this.setState({tempHistory: event.target.value});
        break;
      case "Insight":
        this.setState({tempInsight: event.target.value});
        break;
      case "Intimidation":
        this.setState({tempIntimidation: event.target.value});
        break;
      case "Investigation":
        this.setState({tempInvestigation: event.target.value});
        break;
      case "Medicine":
        this.setState({tempMedicine: event.target.value});
        break;
      case "Nature":
        this.setState({tempNature: event.target.value});
        break;
      case "Perception":
        this.setState({tempPerception: event.target.value});
        break;
      case "Performance":
        this.setState({tempPerformance: event.target.value});
        break;
      case "Persuasion":
        this.setState({tempPersuasion: event.target.value});
        break;
      case "Religion":
        this.setState({tempReligion: event.target.value});
        break;
      case "SleightOfHand":
        this.setState({tempSleightOfHand: event.target.value});
        break;
      case "Stealth":
        this.setState({tempStealth: event.target.value});
        break;
      case "Survival":
        this.setState({tempSurvival: event.target.value});
        break;
    }
    console.log(event.target.name);
  }
  submitInfo(event){
	var userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
	var player = {};
  	var stats = {};
  	var savingThrows = {};
  	var skills = {};
	player.name = this.state.tempName;
	player.race= this.state.tempRace;
	player.level= 1;
	player.health = 20;
	player.note = '';
	player.money = 0;

	stats.strength = this.state.tempStrength;
	stats.dexterity = this.state.tempDexterity;
	stats.constitution = this.state.tempConstitution;
	stats.intelligence = this.state.tempIntelligence;
	stats.wisdom = this.state.tempWisdom;
	stats.charisma = this.state.tempCharisma;

	savingThrows.strengthST = this.state.tempStrengthST;
	savingThrows.dexterityST = this.state.tempDexterityST;
	savingThrows.constitutionST = this.state.tempConstitutionST;
	savingThrows.intelligenceST = this.state.tempIntelligenceST;
	savingThrows.wisdomST = this.state.tempWisdomST;
	savingThrows.charismaST = this.state.tempCharismaST;

	skills.acrobatics = this.state.tempAcrobatics;
	skills.animalHandling = this.state.tempAnimalHandling;
	skills.arcana = this.state.tempArcana;
	skills.athletics = this.state.tempAthletics;
	skills.deception = this.state.tempDeception;
	skills.history = this.state.tempHistory;
	skills.insight = this.state.tempInsight;
	skills.intimidation = this.state.tempIntimidation;
	skills.investigation = this.state.tempInvestigation;
	skills.medicine = this.state.tempMedicine;
	skills.nature = this.state.tempNature;
	skills.perception = this.state.tempPerception;
	skills.performance = this.state.tempPerformance;
	skills.persuasion = this.state.tempPersuasion;
	skills.religion = this.state.tempReligion;
	skills.sleightOfHand = this.state.tempSleightOfHand;
	skills.stealth = this.state.tempStealth;
	skills.survival = this.state.tempSurvival;

	player.skills = skills;
	player.stats = stats;
	player.savingThrows = savingThrows;
	userRef.update(player);

	this.setState({signUp: false});
	this.props.onUpdate({
		loggedIn: true,
		player: player,
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
    if(this.state.signUp){
      return(
        <div className="App">
          <form onSubmit={this.submitInfo}>
            <label>
              <div>
                <p>Name: <input type="text" value={this.state.tempName} onChange={this.nameChange}/></p>
                <p>Race: <input type="text" value={this.state.tempRace} onChange={this.raceChange}/></p>
                
                <p>Stats</p>
                <p>Strength: <input type="number" name="Strength" value={this.state.tempStrength} onChange={this.statChange}/></p>
                <p>Dexterity: <input type="number" name="Dexterity" value={this.state.tempDexterity} onChange={this.statChange}/></p>
                <p>Constitution: <input type="number" name="Constitution" value={this.state.tempConstitution} onChange={this.statChange}/></p>
                <p>Intelligence: <input type="number" name="Intelligence" value={this.state.tempIntelligence} onChange={this.statChange}/></p>
                <p>Wisdom: <input type="number" name="Wisdom" value={this.state.tempWisdom} onChange={this.statChange}/></p>
                <p>Charisma: <input type="number" name="Charisma" value={this.state.tempCharisma} onChange={this.statChange}/></p>
                
                <p>Saving Throws</p>
                <p>Strength: <input type="number" name="StrengthST" value={this.state.tempStrengthST} onChange={this.statChange}/></p>
                <p>Dexterity: <input type="number" name="DexterityST" value={this.state.tempDexterityST} onChange={this.statChange}/></p>
                <p>Constitution: <input type="number" name="ConstitutionST" value={this.state.tempConstitutionST} onChange={this.statChange}/></p>
                <p>Intelligence: <input type="number" name="IntelligenceST" value={this.state.tempIntelligenceST} onChange={this.statChange}/></p>
                <p>Wisdom: <input type="number" name="WisdomST" value={this.state.tempWisdomST} onChange={this.statChange}/></p>
                <p>Charisma: <input type="number" name="CharismaST" value={this.state.tempCharismaST} onChange={this.statChange}/></p>
              </div>
                
              <div>
                <p>Modifiers</p>
                <p>Acrobatics: <input type="number" name="Acrobatics" value={this.state.tempAcrobatics} onChange={this.statChange}/></p>
                <p>Animal Handling: <input type="number" name="AnimalHandling" value={this.state.tempAnimalHandling} onChange={this.statChange}/></p>
                <p>Arcana: <input type="number" name="Arcana" value={this.state.tempArcana} onChange={this.statChange}/></p>
                <p>Athletics: <input type="number" name="Athletics" value={this.state.tempAthletics} onChange={this.statChange}/></p>
                <p>Deception: <input type="number" name="Deception" value={this.state.tempDeception} onChange={this.statChange}/></p>
                <p>History: <input type="number" name="History" value={this.state.tempHistory} onChange={this.statChange}/></p>
                <p>Insight: <input type="number" name="Insight" value={this.state.tempInsight} onChange={this.statChange}/></p>
                <p>Intimidation: <input type="number" name="Intimidation" value={this.state.tempIntimidation} onChange={this.statChange}/></p>
                <p>Investigation: <input type="number" name="Investigation" value={this.state.tempInvestigation} onChange={this.statChange}/></p>
                <p>Medicine: <input type="number" name="Medicine" value={this.state.tempMedicine} onChange={this.statChange}/></p>
                <p>Nature: <input type="number" name="Nature" value={this.state.tempNature} onChange={this.statChange}/></p>
                <p>Perception: <input type="number" name="Perception" value={this.state.tempPerception} onChange={this.statChange}/></p>
                <p>Performance: <input type="number" name="Performance" value={this.state.tempPerformance} onChange={this.statChange}/></p>
                <p>Persuasion: <input type="number" name="Persuasion" value={this.state.tempPersuasion} onChange={this.statChange}/></p>
                <p>Religion: <input type="number" name="Religion" value={this.state.tempReligion} onChange={this.statChange}/></p>
                <p>Sleight of Hand: <input type="number" name="SleightOfHand" value={this.state.tempSleightOfHand} onChange={this.statChange}/></p>
                <p>Stealth: <input type="number" name="Stealth" value={this.state.tempStealth} onChange={this.statChange}/></p>
                <p>Survival: <input type="number" name="Survival" value={this.state.tempSurvival} onChange={this.statChange}/></p>
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