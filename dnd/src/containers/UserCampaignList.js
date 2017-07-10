import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import dungeonMasterIn from '../services/dungeonMasterIn';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
			userID: this.props.userID,
			loading: false,
			campaignList: [],
		}
	}

	componentWillMount(){

	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	chooseCampaignAsDM(campaignID){
		this.props.enterExistingCampaignAsDM(campaignID);
	}
	render(){
		var campaignList = [];
		if(this.state.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
		}

		else{
			var app = this;
			var campaignCounter = 0;
			campaignList = this.state.campaigns.map((campaign) => {
				if(campaign.Players[this.state.userID] == true){
					return(
						<ListItem 
							fullWidth={true}
							primaryText={campaign.campaignTitle}
							primaryTogglesNestedList={true}
							nestedItems={[
								<FlatButton label="Enter Campaign" 
									fullWidth={true}
									onTouchTap={this.chooseCampaign.bind(this, campaign.campaignID)}/>,
								<FlatButton label="Enter as Dungeon Master" 
									fullWidth={true}
									onTouchTap={this.chooseCampaignAsDM.bind(this, campaign.campaignID)}/>]}>
						</ListItem>
					);
				}

				else{
					return(
						<ListItem 
							fullWidth={true}
							primaryText={campaign.campaignTitle}
							primaryTogglesNestedList={true}
							nestedItems={[
								<FlatButton 
									label="Enter Campaign"
									fullWidth={true} 
									onTouchTap={this.chooseCampaign.bind(this, campaign.campaignID)}/>]}>
						</ListItem>
					);
				}
			});
		}

		if(!this.state.loading){
			return(
				<div className="App-Campaign-List">
					Your Campaigns
					<List>
						{campaignList}
					</List>
				</div>
		)}
		else{
			return(
				<div>
				Loading...
				</div>
				)
		}
	}
}
export default UserCampaignList;