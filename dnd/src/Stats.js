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

export default Stats;