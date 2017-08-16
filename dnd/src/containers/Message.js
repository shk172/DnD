import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';

const styles = {
	messageBox: {
		padding: 10,
		height: 270,
		width: 230
	},
	messageButton: {
		backgroundColor: '#B5B5B5', 
		marginLeft: 30, 
		marginRight: 30,
		width: 230,
	}
}

class MessageClass extends Component{
	constructor(props){
		super(props);
		this.state = {
			open: false,
		}
		console.log(this.props);
	}

	handleClick(event){
		if(this.state.open === undefined || this.state.open === false){
			this.setState({
				open: true,
				position: event.currentTarget,
			});
		}
		else{
			this.setState({open: false});
		}
	}

	render(){
		return(
			<FlatButton style={styles.messageButton} 
				label={this.props.message} 
				onTouchTap={this.handleClick.bind(this)}>
				<Popover open={(this.state.open === undefined) ? false : this.state.open}
						anchorEl={this.state.position}
        				anchorOrigin={{vertical: 'top',horizontal: 'middle'}}
        				targetOrigin={{vertical: 'bottom', horizontal: 'middle'}}>
					<Paper style={styles.messageBox}>
						Test here
					</Paper>
				</Popover>
			</FlatButton>
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

const Message = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageClass)

export default Message;