export default function addMessage(content, player){
	return function(dispatch){
		dispatch({
			type: "NEW_MESSAGE",
			message: "Hi",
			...content,
			player
		});
	}
}