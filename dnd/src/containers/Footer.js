import React, { Component } from 'react';

const styles = {
  footer: {
    backgroundColor: '#404040',
    height: '20vh',
    marginTop: '5vh',
    textAlign: 'center',
    padding: 50,
  },

  footerText: {
    color: '#B5B5B5'
  },
};

class Footer extends Component{
	render(){
		return(
			<div style={styles.footer}>
				<p style={styles.footerText}> This application was built using React, Redux, and Firebase.</p>
				<p style={styles.footerText}> SangHee Kim </p>
			</div>
		)
	}
}

export default Footer;