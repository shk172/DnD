import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';

class Note extends Component{
  constructor(props){
    super(props);
    this.player = this.props.player;
    this.playerRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange(editorState) {
    this.setState({editorState});
    var tmp ={}
    tmp.note = this.state.editorState.getCurrentContent().getPlainText();
    this.playerRef.update(tmp);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentWillMount(){
    console.log(this.player.note);
    if(this.player.note === ""){
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText("Type your notes here"))
      }); 
    }

    else{
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText(this.player.note))
      }); 
    }

  }
  render(){
    return(
      <div>
        <p>Note:</p>
        <Editor 
        editorState={this.state.editorState} 
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}/>
      </div>
    );
  }
}

export default Note;
