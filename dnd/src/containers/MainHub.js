import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';

import importCampaigns from '../services/importCampaigns';
import importUserCampaigns from '../services/importUserCampaigns';
import firebase from 'firebase';

import CampaignHub from './CampaignHub';
import CampaignList from './CampaignList';
import DungeonMasterHub from './DungeonMasterHub';
import UserCampaignList from './UserCampaignList';

import './styles/MainHub.css';

class MainHub extends Component{
    constructor(props){
        super(props);
        this.state={
            campaignsLoading: true,
            userCampaignsLoading: true,
            inCampaign: false,
            userID: firebase.auth().currentUser.uid,
            campaignOpen: false
        };
        this.initializeLists = this.initializeLists.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount(){
        this.initializeLists();
    }

    initializeLists(){
        var hub = this;
        importUserCampaigns(this.state.userID).then(
            (userCampaigns) =>{
                hub.setState({
                    userCampaigns: userCampaigns,
                    userCampaignsLoading: false,
                })
                importCampaigns().then(
                    (campaigns) =>{
                        var redundancyTable = {};

                        var tempCampaigns = [];
                        var campaignCounter = 0;
                        var userCampaignCounter = 0;

                        for(var userCampaignIndex in userCampaigns){
                            if(userCampaignIndex){
                                redundancyTable[userCampaigns[userCampaignIndex].campaignID] = userCampaigns[userCampaignIndex];
                                userCampaignCounter++;
                            }
                        }
                        
                        if(userCampaignCounter === userCampaigns.length){
                            for(var campaignIndex in campaigns){
                                if(redundancyTable[campaigns[campaignIndex].campaignID] == null){
                                    tempCampaigns.push(campaigns[campaignIndex]);
                                }
                                campaignCounter++;
                            }
                        }
                        
                        if(campaignCounter === campaigns.length){
                            hub.setState({
                                campaigns: tempCampaigns,
                                campaignsLoading: false,
                                userCampaignCreated: false,
                            });
                        }
                    },
                    (error) =>{
                        console.log(error);
                    }
                );
            },
            (error) =>{
                console.log(error);
            }
        );
    }

    onUpdate(data){
      this.setState(data);
    }

    render(){
        var Home = () => (
            <div className="App-Main-Hub">                  
                <div className="App-Lists">
                    <CampaignList 
                        campaigns={this.state.campaigns} 
                        enterExistingCampaign={this.enterExistingCampaign}
                        onUpdate={this.onUpdate}/>
                    <UserCampaignList 
                        campaigns={this.state.userCampaigns} 
                        userID={this.state.userID}
                        onUpdate={this.onUpdate}/>
                </div>
            </div>
        )

        if(this.state.campaignsLoading){
            return(
                <div>Loading...</div>
            )
        }
        if(this.state.userCampaignsLoading){
            return(
                <div>Loading...</div>
            )
        }

        else{
            return(
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/dungeonmaster/:campaignID' render={({match})=>
                        <DungeonMasterHub
                            campaignID={match.params.campaignID}
                            userID={this.state.userID}/>}
                    />
                    <Route path='/campaign/:campaignID' render={({match})=>
                        <CampaignHub 
                            userID={this.state.userID} 
                            campaignID={match.params.campaignID}/>}
                    />
                </Switch>
            )
        }
    }

    componentDidMount(){
        this.listenForUpdates();
    }

    listenForUpdates() {
      const campaignRef = firebase.database().ref("Campaigns/");
      campaignRef.on("value", (campaigns)=>{
        this.initializeLists();
      });

      const playerCampaignRef = firebase.database().ref("Players/" + this.state.userID + "/Campaigns/");
      playerCampaignRef.on("value", (campaigns)=>{
        this.initializeLists();
      })
    }       
}
export default MainHub;