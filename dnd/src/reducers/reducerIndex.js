import { combineReducers } from 'redux'
//import playerInfo from './playerInfo'

/*Reducers take in objects that are passed through the
dispatch functions, and the reducers' workload can be split
through each actions' types defined in the dispatch function.
*/
const playerInfo = (state = {}, action) => {
	switch(action.type){
		case "PLAYER_EXIST":
			//console.log("Following action has been passed: ", action);
			var character = action.character;
			var loaded = action.loaded;
			return{
				...state,
				character,
				loaded,
				characterCreate: false,
			}
		case "PLAYER_NOT_EXIST":
			var loaded = action.loaded;
			return{
				...state,
				characterCreate: true,
				loaded,
			}
		default:
			return {
				...state
			}
	}
}

const campaignInfo = (state={}, action) => {
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
		default:
			return{
				...state
			}
	}
}

const reducerIndex = combineReducers({
	playerInfo,
	campaignInfo
})

export default reducerIndex