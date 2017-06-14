import React, { Component, PropTypes } from 'react';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';

class Note extends Component{
  constructor(props){
    super(props);
    this.onChange = (editorState) => {
      this.setState({editorState});
      var tmp ={}
      tmp.note = this.state.editorState.getCurrentContent().getPlainText();
      userRef.update(tmp);
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
    console.log(user.note);
    if(user.note === ""){
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText("Type your notes here"))
      }); 
    }

    else{
      this.setState({
        editorState: EditorState.createWithContent(
        ContentState.createFromText(user.note))
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
