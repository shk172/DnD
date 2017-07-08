import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider } from 'material-ui/styles';

function DnD() {
  return (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <DnD />,
  document.getElementById('root')
);
