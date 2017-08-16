import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message';
class MessageListClass extends Component{
	constructor(props){
		super(props);
	}
	render(){
		var messages;
    	messages = this.props.messages.content.map((message)=>{
	      return(<Message message={message}/>)
	    })

		return(
			<div style={{
				position: "fixed", 
				bottom: 0, 
				width: '50vw',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 999}}>
				<div style={{display: 'flex', flexDirection: 'row',}}>
					{messages}
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

const mapStateToProps = state => {
	console.log(state);
	return{
		messages: state.messages,
	}
}

const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListClass)

export default MessageList;