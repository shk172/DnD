import { combineReducers } from 'redux'
//import playerInfo from './playerInfo'

/*Reducers take in objects that are passed through the
dispatch functions, and the reducers' workload can be split
through each actions' types defined in the dispatch function.
*/
const pageTitle = (state = {}, action) => {
	switch(action.type){
		case "CAMPAIGN":
			var title = action.campaign.campaignTitle;
			return{
				title: title
			}
		case "RESET":
			return {
				title: "There Will Be Dragons"
			}
		default:
			return{
				...state,
			}
	}
}
const playerInfo = (state = {}, action) => {
	var loaded;
	switch(action.type){
		case "NPC_CREATED":
			loaded = action.loaded;
			var character = action.character;
			return{
				...state,
				character,
				loaded,
				characterCreate: false,
			}
		case "PLAYER_EXIST":
			//console.log("Following action has been passed: ", action);
			var character = action.character;
			loaded = action.loaded;
			return{
				...state,
				character,
				loaded,
				characterCreate: false,
			}
		case "PLAYER_NOT_EXIST":
			loaded = action.loaded;
			return{
				...state,
				characterCreate: true,
				loaded,
			}
		case "RESET":
			return{
				loaded: false,
			}
		default:
			return {
				...state
			}
	}
}

const campaignInfo = (state={loaded: false}, action) => {
	//console.log("Following action has been passed: ", action);
	switch(action.type){
		case "CAMPAIGN":
			var campaign = action.campaign;
			var character = action.character;
			var loaded = action.loaded;
			return{
				...state,
				campaign,
				character,
				loaded
			}
		case "RESET":
			return{
				loaded: false
			}
		default:
			return{
				...state
			}
	}
}

const reducerIndex = combineReducers({
	pageTitle,
	playerInfo,
	campaignInfo
})

export default reducerIndex