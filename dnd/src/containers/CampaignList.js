//Look at the Lists and Keys docs to fix the error

import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class CampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
		}
	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	render(){
		var campaignList = [];
		if(this.state.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
		}
		else{
			campaignList = this.state.campaigns.map((campaign) => {
				return(
					<ListItem
						onTouchTap={this.chooseCampaign.bind(this, campaign.campaignID)}
						primaryText={campaign.campaignTitle}
					/>);
			});
		}

		return(
			<div className="App-Campaign-List">
				Campaigns
				<List>
					{campaignList}
				</List>
			</div>
		)
	}
}
export default CampaignList;