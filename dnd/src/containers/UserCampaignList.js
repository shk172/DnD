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
			console.log(campaigns);
			var counter = 0;
			for(var campaign in campaigns){
				this.state.campaigns.push(campaigns[campaign]);
				counter++;
				console.log(counter + " " + campaigns.length);
			}
			if(counter >= campaigns.length){
				console.log(this.state.campaigns);
				this.setState({loading: false})
			}
		});
	}

	render(){
		const campaignList = this.state.campaigns.map((campaign) =>
			<li>
				<button>{campaign.campaignTitle}</button>
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