import React, { Component } from 'react';
import createCampaignList from '../services/createCampaignList';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
			userID: this.props.userID,
			loading: true,
			campaignList: {},
		}
	}

	componentWillMount(){
		var campaignList = {};
		if(this.state.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
			this.setState({campaignList: campaignList});
		}

		else{
			createCampaignList(this.state.userID, this.state.campaigns).then(()=>{this.setState({loading: false})});
		}
	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	chooseCampaignAsDM(campaignID){
		this.props.enterExistingCampaignAsDM(campaignID);
	}
	render(){
		if(!this.state.loading){
			return(
				<div>
					Your Campaigns
					<ul>
						{this.state.campaignList}
					</ul>
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