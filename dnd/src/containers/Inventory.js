import React, { Component, PropTypes } from 'react';


class Inventory extends Component {
	constructor(props){
    	super(props);
	}
}

Inventory.propTypes = {
	addItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
	itemName: PropTypes.string.isRequired
}

export default Inventory;