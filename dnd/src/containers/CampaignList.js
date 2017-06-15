import React, { Component } from 'react';

class CampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			campaigns: this.props.campaigns,
		}
	}

	render(){
		return(
			<div>
				Hi there will be a list of campaigns here.
			</div>
		)
	}
}
export default CampaignList;