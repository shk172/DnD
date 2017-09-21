import React, {Component} from 'react'
import firebase from 'firebase'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	customWidth: {
		width: 200,
	}
}

class Reference extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			tempSpellClass: "Bard",
			tempSpellLevel: "Cantrip",
			spells: {},
			spellsArray: [],

		};

	}
	

	componentWillMount()
	{
		var spellsRef = firebase.database().ref("Reference/Spells");
		spellsRef.on("value", (data) =>
			{
				console.log(data.val())

			}
		)

	}


	render()
	{
		var spells = this.state.spellsArray.map((result)=>{
			return(
				<div>
					Spell Name:
					{this.state.spells[result].Name}
					<br/>
					Level:
					{this.state.spells[result].Level}
					{this.state.spells[result].School}
					<br/>
					Casting Time:
					{this.state.spells[result].CastingTime}
					<br/>
					Range:
					{this.state.spells[result].Range}
					<br/>
					Duration:
					{this.state.spells[result].Duration}
					<br/>
					Description:
					{this.state.spells[result].Description}
				</div>
				)
		})


		return(
			<div>
				Select Class
				<DropDownMenu value={this.state.tempSpellClass} onChange={this.spellClassSelect.bind(this)} style={styles.customWidth}>
					<MenuItem value="Bard" primaryText="Bard"/>
					<MenuItem value="Cleric" primaryText="Clercic"/>
					<MenuItem value="Druid" primaryText="Druid"/>
					<MenuItem value="Paladin" primaryText="Paladin"/>
					<MenuItem value="Ranger" primaryText="Ranger"/>
					<MenuItem value="Sorcerer" primaryText="Sorcerer"/>
					<MenuItem value="Warlock" primaryText="Warlock"/>
					<MenuItem value="Wizard" primaryText="Wizard"/>
				</DropDownMenu>
				Select Spell Level
				<DropDownMenu value={this.state.tempSpellLevel} onChange={this.spellLevelSelect.bind(this)}>
					<MenuItem value="Cantrips" primaryText="Cantrips"/>
					<MenuItem value="Level 1" primaryText="Level 1"/>
					<MenuItem value="Level 2" primaryText="Level 2"/>
					<MenuItem value="Level 3" primaryText="Level 3"/>
					<MenuItem value="Level 4" primaryText="Level 4"/>
					<MenuItem value="Level 5" primaryText="Level 5"/>
					<MenuItem value="Level 6" primaryText="Level 6"/>
					<MenuItem value="Level 7" primaryText="Level 7"/>
					<MenuItem value="Level 8" primaryText="Level 8"/>
					<MenuItem value="Level 9" primaryText="Level 9"/>
				</DropDownMenu>
				<FlatButton label="Find Spells" onTouchTap={this.displayClassLevelSpells.bind(this)}/>
				{spells}
			</div>
		)
	}


	displayClassLevelSpells()
	{
		var relevantClassLevelSpells = firebase.database().ref("Reference/Spells/" + this.state.tempSpellClass + "/" + this.state.tempSpellLevel)
		relevantClassLevelSpells.on("value", (data) =>
			{
				console.log(data.val());
				this.setState({
					spells: data.val(), 
					spellsArray: Object.keys(data.val())
				})

				console.log(this.state.spells);
				console.log(this.state.spellsArray);
			})

	}


	spellClassSelect(event, index, value)
	{
		this.setState({
			tempSpellClass: value
		});
		console.log(value);
	}


	spellLevelSelect(event, index, value)
	{
		this.setState({
			tempSpellLevel: value
		});
		console.log(value);
	}
}

export default Reference;