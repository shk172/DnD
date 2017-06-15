import React, { Component } from 'react';

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
		}
	}

	render(){
		return(
			<div>
				Hi there will be a list of user's campaigns here.
			</div>
		)
	}
}
export default UserCampaignList;