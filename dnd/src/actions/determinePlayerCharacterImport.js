import getCampaign from '../services/getCampaign';
import importPlayerCharacter from '../services/importPlayerCharacter';

/*
This function will determine whether a player needs to
create a character (new campaign) or their character needs to be
imported.

Async operation - passed through middleware
*/
export default function determinePlayerCharacterImport(userID, campaignID) {
  return function (dispatch) {
    importPlayerCharacter(userID, campaignID).then(
    (character)=>{
      if(Object.keys(character).length > 1){
        //console.log("character exists");
        var characterObject = character;
        getCampaign(campaignID).then((campaign)=>{
          console.log(campaign);
          dispatch({
            type: "CAMPAIGN",
            campaign: campaign,
            loaded: true,
          });
          dispatch({
            type:"PLAYER_EXIST",
            character: characterObject,
            loaded: true,
          })
        })
      }
      
      else{
        //console.log("character does not exist");
        getCampaign(campaignID).then((campaign)=>{
          dispatch({
            type: "CAMPAIGN",
            campaign: campaign,
            loaded: true,
          });
          dispatch({
            type: "PLAYER_NOT_EXIST",
            loaded: true,
          })
        })
      }
    })
  }
}