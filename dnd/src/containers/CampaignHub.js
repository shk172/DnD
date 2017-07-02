import React, { Component } from 'react';
import CharacterHub from './CharacterHub';
import CharacterInfoForm from './CharacterInfoForm';
import importPlayerCharacter from '../services/importPlayerCharacter';

class CampaignHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			userID: this.props.userID,
			campaignID: this.props.campaignID,
			characterCreate: false,
		};
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentWillMount(){
		importPlayerCharacter(this.state.userID, this.state.campaignID).then(
			(character)=>{
				if(Object.keys(character).length > 1){
					this.setState({
						character: character,
						loading: false,
					})
				}
				
				else{
					this.setState({
						characterCreate: true,
						loading: false,
					})
				}
			});
	}

	onUpdate(data){
   	this.setState(data);
  }

	render(){
		if(this.state.loading){
			return(
				<div>Loading...</div>
				)
		}

		if(this.state.characterCreate){
			return(
				<CharacterInfoForm 
					userID={this.state.userID} 
					campaignID={this.state.campaignID}
					onUpdate={this.onUpdate}/>
			)
		}

		else{
			return(
				<div>
					<CharacterHub character={this.state.character}/>
				</div>
			)
		}
		
	}
}
export default CampaignHub;