import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

function DnD() {

  return (
  	<BrowserRouter>
    	<MuiThemeProvider>
    			<App />
    	</MuiThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <DnD />,
  document.getElementById('root')
);
