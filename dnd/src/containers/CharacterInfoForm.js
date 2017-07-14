import React, { Component } from 'react';
import firebase from 'firebase';
/*
Consult React docs' forms section again before working on this
*/

class CharacterInfoForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			Name: "",
	  		Race: "Dragonborn",

	  		Stats: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
			Strength: 0,
		    Dexterity: 0,
		    Constitution: 0,
		    Intelligence: 0,
		    Wisdom: 0,
		    Charisma: 0,

		    SavingThrows: ["StrengthST", "DexterityST", "ConstitutionST", "IntelligenceST", "WisdomST", "CharismaST"],
		    StrengthST: 0,
		    DexterityST: 0,
		    ConstitutionST: 0,
		    IntelligenceST: 0,
		    WisdomST: 0,
		    CharismaST: 0,

		    Skills: ["Acrobatics", "AnimalHandling", "Arcana", "Athletics", "Deception", "History", "Insight", 
		    "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion",
		    "SleightOfHand", "Stealth", "Survival"],
		    Acrobatics: 0,
		    AnimalHandling: 0,
		    Arcana: 0,
		    Athletics: 0,
		    Deception: 0,
		    History: 0,
		    Insight: 0,
		    Intimidation: 0,
		    Investigation: 0,
		    Medicine: 0,
		    Nature: 0,
		    Perception: 0,
		    Performance: 0,
		    Persuasion: 0,
		    Religion: 0,
		    SleightOfHand: 0,
		    Stealth: 0,
		    Survival: 0,

		    userID: this.props.userID,
		    campaignID: this.props.campaignID,
		    characterType: this.props.characterType,
	  	};
	  console.log(this.state)
    this.nameChange = this.nameChange.bind(this);
    this.raceChange = this.raceChange.bind(this);
    this.statChange = this.statChange.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
	}

	submitInfo(event){
	  var character = {};

	  character.Name = this.state.Name;
	  character.Race = this.state.Race;
	  character.Level= 1;
	  character.Health = 20;
	  character.Note = '';
	  character.Money = 0;

	  character.Skills = {};
	  character.Stats = {};
	  character.SavingThrows = {};

	  this.state.Stats.forEach((stat)=>{
	  	character.Stats[stat] = this.state[stat];
	  })

	  this.state.SavingThrows.forEach((savingThrows)=>{
	  	character.SavingThrows[savingThrows] = this.state[savingThrows];
	  })

	  this.state.Skills.forEach((skill)=>{
	  	character.Skills[skill] = this.state[skill];
	  })
	  
	  console.log(character);

	  character.campaignID = this.state.campaignID;

	  if(this.state.characterType === "Players"){
	  	var playerCampaignRef = firebase.database().ref("Players/" + this.state.userID + "/Campaigns/" + this.state.campaignID);
	  	playerCampaignRef.update(character);

			//if the player doesn't already have a DM tag, add one as a non-DM - creating a new character will not change the DM status.
	  	var campaignPlayerRef = firebase.database().ref("Campaigns/" + this.state.campaignID  + "/Players/");
		  campaignPlayerRef.on("value", (data)=>{
		  	if(data.val()[this.state.userID] === null || data.val()[this.state.userID] === undefined){
		  		var player = {};
		  		player[this.state.userID] = false;
		  		campaignPlayerRef.update(player);
		  	}
		  });
		this.props.onUpdate({
		  	characterCreate: false,
		  	character: character,
		  })
	  }

	  else{
	  	var campaignNPCRef = firebase.database().ref("Campaigns/" + this.state.campaignID  + "/NPCs/");
	  	var player = {};
	  	player[character.Name] = character;
	  	campaignNPCRef.update(player);
	  	this.props.onUpdate({
		  	npcCreate: false,
		  	character: character,
		  })
	  }

    event.preventDefault();
  }

  raceChange(event){
    this.setState({
    	Race: event.target.value
    });
  }

  nameChange(event){
    this.setState({Name: event.target.value});
  }

  statChange(event){
    var stat = {};
    stat[event.target.name] = event.target.value;
    this.setState(stat);
  }

	render(){
		return(
			<div>
	      <form onSubmit={this.submitInfo}>
	        <label>
	          <div>
	            <p>Name: <input type="text" value={this.state.Name} onChange={this.nameChange}/></p>
	            <p>Race: 
	            <select value={this.state.Race} onChange={this.raceChange}>
	            	<option value="Dragonborn">Dragonborn</option>
	            	<option value="Dwarf">Dwarf</option>
	            	<option value="Elf">Elf</option>
	            	<option value="Gnome">Gnome</option>
	            	<option value="Half-Elf">Half-Elf</option>
	            	<option value="Half-Orc">Half-Orc</option>
	            	<option value="Halfling">Halfling</option>
	            	<option value="Human">Human</option>
	            	<option value="Tiefling">Tiefling</option>
	            </select>
	            </p>
	            
	            <p>Stats</p>
	            <p>Strength: <input type="number" name="Strength" value={this.state.Strength} onChange={this.statChange}/></p>
	            <p>Dexterity: <input type="number" name="Dexterity" value={this.state.Dexterity} onChange={this.statChange}/></p>
	            <p>Constitution: <input type="number" name="Constitution" value={this.state.Constitution} onChange={this.statChange}/></p>
	            <p>Intelligence: <input type="number" name="Intelligence" value={this.state.Intelligence} onChange={this.statChange}/></p>
	            <p>Wisdom: <input type="number" name="Wisdom" value={this.state.Wisdom} onChange={this.statChange}/></p>
	            <p>Charisma: <input type="number" name="Charisma" value={this.state.Charisma} onChange={this.statChange}/></p>
	            
	            <p>Saving Throws</p>
	            <p>Strength: <input type="number" name="StrengthST" value={this.state.StrengthST} onChange={this.statChange}/></p>
	            <p>Dexterity: <input type="number" name="DexterityST" value={this.state.DexterityST} onChange={this.statChange}/></p>
	            <p>Constitution: <input type="number" name="ConstitutionST" value={this.state.ConstitutionST} onChange={this.statChange}/></p>
	            <p>Intelligence: <input type="number" name="IntelligenceST" value={this.state.IntelligenceST} onChange={this.statChange}/></p>
	            <p>Wisdom: <input type="number" name="WisdomST" value={this.state.WisdomST} onChange={this.statChange}/></p>
	            <p>Charisma: <input type="number" name="CharismaST" value={this.state.CharismaST} onChange={this.statChange}/></p>
	          </div>
	            
	          <div>
	            <p>Modifiers</p>
	            <p>Acrobatics: <input type="number" name="Acrobatics" value={this.state.Acrobatics} onChange={this.statChange}/></p>
	            <p>Animal Handling: <input type="number" name="AnimalHandling" value={this.state.AnimalHandling} onChange={this.statChange}/></p>
	            <p>Arcana: <input type="number" name="Arcana" value={this.state.Arcana} onChange={this.statChange}/></p>
	            <p>Athletics: <input type="number" name="Athletics" value={this.state.Athletics} onChange={this.statChange}/></p>
	            <p>Deception: <input type="number" name="Deception" value={this.state.Deception} onChange={this.statChange}/></p>
	            <p>History: <input type="number" name="History" value={this.state.History} onChange={this.statChange}/></p>
	            <p>Insight: <input type="number" name="Insight" value={this.state.Insight} onChange={this.statChange}/></p>
	            <p>Intimidation: <input type="number" name="Intimidation" value={this.state.Intimidation} onChange={this.statChange}/></p>
	            <p>Investigation: <input type="number" name="Investigation" value={this.state.Investigation} onChange={this.statChange}/></p>
	            <p>Medicine: <input type="number" name="Medicine" value={this.state.Medicine} onChange={this.statChange}/></p>
	            <p>Nature: <input type="number" name="Nature" value={this.state.Nature} onChange={this.statChange}/></p>
	            <p>Perception: <input type="number" name="Perception" value={this.state.Perception} onChange={this.statChange}/></p>
	            <p>Performance: <input type="number" name="Performance" value={this.state.Performance} onChange={this.statChange}/></p>
	            <p>Persuasion: <input type="number" name="Persuasion" value={this.state.Persuasion} onChange={this.statChange}/></p>
	            <p>Religion: <input type="number" name="Religion" value={this.state.Religion} onChange={this.statChange}/></p>
	            <p>Sleight of Hand: <input type="number" name="SleightOfHand" value={this.state.SleightOfHand} onChange={this.statChange}/></p>
	            <p>Stealth: <input type="number" name="Stealth" value={this.state.Stealth} onChange={this.statChange}/></p>
	            <p>Survival: <input type="number" name="Survival" value={this.state.Survival} onChange={this.statChange}/></p>
	          </div>  

	          </label>
	          <p> Name: {this.state.Name}</p>
	          <p> Race: {this.state.Race}</p> 
	          <input type="submit" value="Submit Info"/>
	      </form>     
	    </div>
		)
	}
}
export default CharacterInfoForm;