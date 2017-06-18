import React, { Component } from 'react';

class CampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
		}
		console.log(this.state.campaigns);
	}

	render(){
		const campaignList = this.state.campaigns.map((campaign) =>
			<li>
				<button>{campaign.campaignTitle}</button>
			</li>);

		return(
			<div>
				<ul>
					{campaignList}
				</ul>
			</div>
		)
	}
}
export default CampaignList;