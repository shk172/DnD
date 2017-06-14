import React, { Component, PropTypes } from 'react';
import '../App.css';

class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {
      showingStats: true
    };
    
    //this.incrementLevel = this.incrementLevel.bind(this);
    //this.decrementLevel = this.decrementLevel.bind(this);
    this.showStats = this.showStats.bind(this);
    this.showSkills = this.showSkills.bind(this);
    this.showStatsOrSkills = this.showStatsOrSkills.bind(this);
    this.player = this.props.player;

    var player = this.player;
    Object.keys(player).forEach(function(key,index) {
      var obj = player[key];
    });
  }
/*
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
  */
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
            <li>Name: {this.player.name}</li>
            <li>Race: {this.player.race}</li>
            <li>Level: {this.player.level} 
              <button onClick={this.decrementLevel}> - </button>
              <button onClick={this.incrementLevel}> + </button>
            </li>
            <li>Health: {this.player.health}</li>
            <li>Money: {this.player.money}</li>
          </ul>
          <br/>
          Stats:
          <ul>
            <li>Strength: {this.player.stats.strength}</li>
            <li>Dexterity: {this.player.stats.dexterity}</li>
            <li>Constitution: {this.player.stats.constitution}</li>
            <li>Intelligence: {this.player.stats.intelligence}</li>
            <li>Wisdom: {this.player.stats.wisdom}</li>
            <li>Charisma: {this.player.stats.charisma}</li>
          </ul>
        </div>
      )      
    }
    else{
      return(
        <div>
          Skills:
          <ul>
            <li>Acrobatics: {this.player.skills.acrobatics}</li>
            <li>Animal Handling: {this.player.skills.animalHandling}</li>
            <li>Arcana: {this.player.skills.arcana}</li>
            <li>Athletics: {this.player.skills.athletics}</li>
            <li>Deception: {this.player.skills.deception}</li>
            <li>History: {this.player.skills.history}</li>
            <li>Insight: {this.player.skills.insight}</li>
            <li>Intimidation: {this.player.skills.intimidation}</li>
            <li>Investigation: {this.player.skills.investigation}</li>
            <li>Medicine: {this.player.skills.medicine}</li>
            <li>Nature: {this.player.skills.nature}</li>
            <li>Perception: {this.player.skills.perception}</li>
            <li>Performance: {this.player.skills.performance}</li>
            <li>Persuasion: {this.player.skills.persuasion}</li>
            <li>Religion: {this.player.skills.religion}</li>
            <li>Sleight of Hand: {this.player.skills.sleightOfHand}</li>
            <li>Stealth: {this.player.skills.stealth}</li>
            <li>Survival: {this.player.skills.survival}</li>
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