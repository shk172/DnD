import firebase from 'firebase';
export default function submitCharacter(character, state){
  return function (dispatch){
    var character = {};

    character.Name = state.Name;
    character.Race = state.Race;
    character.Level= 1;
    character.Health = 20;
    character.Note = '';
    character.Money = 0;
    character.Exp = 0;
    character.ArmorClass = state.ArmorClass;
    character.Initiative = state.Initiative;
    character.Speed = state.Speed;

    character.Skills = {};
    character.Stats = {};
    character.SavingThrows = {};

    state.Stats.forEach((stat)=>{
      character.Stats[stat] = state[stat];
    })

    state.SavingThrows.forEach((savingThrows)=>{
      character.SavingThrows[savingThrows] = state[savingThrows];
    })

    state.Skills.forEach((skill)=>{
      character.Skills[skill] = state[skill];
    })

    character.playerID = state.userID;
    character.campaignID = state.campaignID;

    if(state.characterType === "Players"){
      var campaignPlayerRef = firebase.database().ref("Campaigns/" + state.campaignID  + "/Players/" +state.userID);
      campaignPlayerRef.update(character);

      //if the player doesn't already have a DM tag, add one as a non-DM - creating a new character will not change the DM status.
      var playerCampaignRef = firebase.database().ref("Players/" + state.userID + "/Campaigns/");
      playerCampaignRef.once("value", (data)=>{
        if(data.val() === null || data.val()[state.campaignID] !== true){
          var campaignObject = {};
          campaignObject[state.campaignID] = false;
          playerCampaignRef.update(campaignObject);
        }
      });
      dispatch({
        characterCreate: false,
        character: character,
        loaded: true,
      })
    }

    else{
      var campaignNPCRef = firebase.database().ref("Campaigns/" + state.campaignID  + "/NPCs/");
      var player = {};
      player[character.Name] = character;
      campaignNPCRef.set(player);
      dispatch({
        loaded: true,
        characterCreate: false,
        character: character,
      })
    }    
  }
}
