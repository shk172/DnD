import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageClass extends Component{

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
