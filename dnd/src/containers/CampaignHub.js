import React, { Component, PropTypes } from 'react';
import CharacterHub from './CharacterHub';
import importPlayerCharacter from '../services/importPlayerCharacter';

class CampaignHub extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			userID: this.props.userID,
			campaignID: this.props.campaignID,
		};
	}

	componentWillMount(){
		importPlayerCharacter(this.state.campaignID).then(
			(character)=>{
				this.setState({
					character: character,
					loading: false,
				})
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
		else{
			return(
				<div><CharacterHub character={this.state.character}/></div>
			)
		}
		
	}
}
export default CampaignHub;