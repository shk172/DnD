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
  }

  showStats(){
    this.setState({showingStats: true});
  }
  showSkills(){
    this.setState({showingStats: false});
  }


  render(){
    return (
      <div className="App-modules">
        <div className="App-stats">
          <ul>
            <li>Name: {this.state.character.Name}</li>
            <li>Race: {this.state.character.Race}</li>
            <li>Level: {this.state.character.Level}</li>
            <li>Health: {this.state.character.Health}</li>
            <li>Money: {this.state.character.Money}</li>
          </ul>
          <br/>
          Stats:
          <ul>
            <li>Strength: {this.state.character.Stats.Strength}</li>
            <li>Dexterity: {this.state.character.Stats.Dexterity}</li>
            <li>Constitution: {this.state.character.Stats.Constitution}</li>
            <li>Intelligence: {this.state.character.Stats.Intelligence}</li>
            <li>Wisdom: {this.state.character.Stats.Wisdom}</li>
            <li>Charisma: {this.state.character.Stats.Charisma}</li>
          </ul>
        </div>
      <div className="App-stats">
        Skills:
        <ul>
          <li>Acrobatics: {this.state.character.Skills.Acrobatics}</li>
          <li>Animal Handling: {this.state.character.Skills.AnimalHandling}</li>
          <li>Arcana: {this.state.character.Skills.Arcana}</li>
          <li>Athletics: {this.state.character.Skills.Athletics}</li>
          <li>Deception: {this.state.character.Skills.Deception}</li>
          <li>History: {this.state.character.Skills.History}</li>
          <li>Insight: {this.state.character.Skills.Insight}</li>
          <li>Intimidation: {this.state.character.Skills.Intimidation}</li>
          <li>Investigation: {this.state.character.Skills.Investigation}</li>
          <li>Medicine: {this.state.character.Skills.Medicine}</li>
          <li>Nature: {this.state.character.Skills.Nature}</li>
          <li>Perception: {this.state.character.Skills.Perception}</li>
          <li>Performance: {this.state.character.Skills.Performance}</li>
          <li>Persuasion: {this.state.character.Skills.Persuasion}</li>
          <li>Religion: {this.state.character.Skills.Religion}</li>
          <li>Sleight of Hand: {this.state.character.Skills.SleightOfHand}</li>
          <li>Stealth: {this.state.character.Skills.Stealth}</li>
          <li>Survival: {this.state.character.Skills.Survival}</li>
        </ul>
      </div>
    </div>
    );
  }
}

export default Stats;