//Look at the Lists and Keys docs to fix the error

import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  toolbar: {
  	display: "flex",
  	height: 45,
  	backgroundColor: '#D17400',
  	alignItems: "center",
  },
  toolbarTitle: {
  	height: 40,
  	fontSize: '18px',
  	textAlign: "center",
  	lineHeight: "42px",
  },
  list:{
  	maxHeight: 360,
  	overflow: 'auto',
  }
};


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
						key={campaign.campaignID}
						fullWidth={true}
        				primaryText={campaign.campaignTitle}
        				primaryTogglesNestedList={true}
        				nestedItems={[
							<Link to={'/campaign/'+campaign.campaignID}>
								<FlatButton 
				                    key={campaign.campaignID + '1'}
				                    label="Enter Campaign"
				                    fullWidth={true}/>
			                </Link>]}/>);
			});
		}

		return(
			<div className="App-Campaign-List">
				<Toolbar style={styles.toolbar}>
					<ToolbarTitle style={styles.toolbarTitle} text="Join a new campaign"/>
				</Toolbar>
				<List style={styles.list}>
					{campaignList}
				</List>
			</div>
		)
	}
}
export default CampaignList;