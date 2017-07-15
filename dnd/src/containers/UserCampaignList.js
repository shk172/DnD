import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

import CreateCampaign from './CreateCampaign';

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

class UserCampaignList extends Component{
  constructor(props){
    super(props);
    this.state={
      userID: this.props.userID,
      createdCampaign: false,
      loading: false,
      campaignList: [],
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(data){
    this.setState(data);
  }

  render(){
    var campaignList = [];
    if(this.props.campaigns.length === 0){
      campaignList = (<p>There's currently no campaign</p>);
    }

    else{
      campaignList = this.props.campaigns.map((campaign) => {
        if(campaign.Players[this.state.userID] === true){
          return(
            <ListItem
              key={campaign.campaignID}
              primaryText={campaign.campaignTitle}
              primaryTogglesNestedList={true}
              nestedItems={[
                <FlatButton 
                  key={campaign.campaignID + '1'}
                  label={<Link to={'/campaign/'+campaign.campaignID} style={{textDecoration: 'none'}}>Enter Campaign</Link>} 
                  fullWidth={true}/>,
                <FlatButton
                  key={campaign.campaignID + '2'} 
                  label={<Link to={'/dungeonmaster/'+campaign.campaignID} style={{textDecoration: 'none'}}>Enter as  DM</Link> }
                  fullWidth={true}
                />
              ]}>
            </ListItem>
          );
        }

        else{
          return(
            <ListItem 
              key={campaign.campaignID}
              fullWidth={true}
              primaryText={campaign.campaignTitle}
              primaryTogglesNestedList={true}
              nestedItems={[
                <FlatButton 
                  key={campaign.campaignID + '1'}
                  label={<Link to={'/campaign/'+campaign.campaignID} style={{textDecoration: 'none'}}>Enter Campaign</Link>} 
                  fullWidth={true}
                />]}>
            </ListItem>
          );
        }
      });
    }

    if(!this.state.loading){
      return(
        <div className="App-Campaign-List">
          <Toolbar
            style={styles.toolbar}>
            <ToolbarTitle 
              text="Your Campaigns"
              style={styles.toolbarTitle}/>
            <CreateCampaign 
                      userID={this.state.userID}
                      creatingCampaign={this.state.createdCampaign}
                      onUpdate={this.onUpdate}/>
          </Toolbar>
          <List style={styles.list}>
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