import React, { Component } from 'react';
import '../App.css';

class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {
      showingStats: true,
      character: this.props.character,
    };
    
    this.showStats = this.showStats.bind(this);
    this.showSkills = this.showSkills.bind(this);
    this.showStatsOrSkills = this.showStatsOrSkills.bind(this);
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
            <li>Name: {this.state.character.name}</li>
            <li>Race: {this.state.character.race}</li>
            <li>Level: {this.state.character.level}</li>
            <li>Health: {this.state.character.health}</li>
            <li>Money: {this.state.character.money}</li>
          </ul>
          <br/>
          Stats:
          <ul>
            <li>Strength: {this.state.character.stats.strength}</li>
            <li>Dexterity: {this.state.character.stats.dexterity}</li>
            <li>Constitution: {this.state.character.stats.constitution}</li>
            <li>Intelligence: {this.state.character.stats.intelligence}</li>
            <li>Wisdom: {this.state.character.stats.wisdom}</li>
            <li>Charisma: {this.state.character.stats.charisma}</li>
          </ul>
        </div>
      )      
    }
    else{
      return(
        <div>
          Skills:
          <ul>
            <li>Acrobatics: {this.state.character.skills.acrobatics}</li>
            <li>Animal Handling: {this.state.character.skills.animalHandling}</li>
            <li>Arcana: {this.state.character.skills.arcana}</li>
            <li>Athletics: {this.state.character.skills.athletics}</li>
            <li>Deception: {this.state.character.skills.deception}</li>
            <li>History: {this.state.character.skills.history}</li>
            <li>Insight: {this.state.character.skills.insight}</li>
            <li>Intimidation: {this.state.character.skills.intimidation}</li>
            <li>Investigation: {this.state.character.skills.investigation}</li>
            <li>Medicine: {this.state.character.skills.medicine}</li>
            <li>Nature: {this.state.character.skills.nature}</li>
            <li>Perception: {this.state.character.skills.perception}</li>
            <li>Performance: {this.state.character.skills.performance}</li>
            <li>Persuasion: {this.state.character.skills.persuasion}</li>
            <li>Religion: {this.state.character.skills.religion}</li>
            <li>Sleight of Hand: {this.state.character.skills.sleightOfHand}</li>
            <li>Stealth: {this.state.character.skills.stealth}</li>
            <li>Survival: {this.state.character.skills.survival}</li>
          </ul>
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        <div>
          <button onClick={this.showStats} className="App-auth-signupbutton">Stats</button>
          <button onClick={this.showSkills} className="App-auth-signinbutton">Skills</button>
        </div>
        {this.showStatsOrSkills(this.state.showingStats)}
      </div>
    );
  }
}

export default Stats;