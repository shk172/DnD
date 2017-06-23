import React, { Component } from 'react';
import dungeonMasterIn from '../services/dungeonMasterIn';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
			userID: this.props.userID,
			loading: true,
		}
	}

	componentWillMount(){
		dungeonMasterIn(this.state.userID).then((campaigns)=>{
			var counter = 0;
			for(var campaign in campaigns){
				this.state.campaigns.push(campaigns[campaign]);
				counter++;
			}
			if(counter >= campaigns.length){
				this.setState({loading: false})
			}
		});
	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	render(){
		const campaignList = this.state.campaigns.map((campaign) =>
			<li>
				<button onClick={this.chooseCampaign.bind(this, campaign.campaignID)}>{campaign.campaignTitle} {campaign.campaignID}</button>
			</li>);
		if(!this.state.loading){
			return(
				<div>
					Your Campaigns
					<ul>
						{campaignList}
					</ul>
				</div>
			)			
		}
		else{
			return(
				<div>Loading...</div>
			)
		}
	}
}
export default UserCampaignList;