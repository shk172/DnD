import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message';
class MessageListClass extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div style={{position: "fixed", 
				bottom: 0, 
				backgroundColor: '#D17400', 
				height: 65, 
				width: '100vw',
				zIndex: 999}}>
				Messages
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

const mapStateToProps = state => {
  return{

  }
}

const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListClass)

export default MessageList;