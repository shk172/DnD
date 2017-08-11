import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducerIndex from './reducers/reducerIndex';

var middleware = function ({ dispatch, getState }) {
    return function(next) {
        //console.log('Function "next" provided:', next);
        return function (action) {
            //console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}
const middlewareStore = applyMiddleware(middleware)(createStore);
let store = middlewareStore(reducerIndex);
//console.log(store.getState());
function DnD() {
  return (
  	<Provider store={store}>
	  	<BrowserRouter>
	    	<MuiThemeProvider>
	    		<App />
	    	</MuiThemeProvider>
	    </BrowserRouter>
	</Provider>
  );
}

ReactDOM.render(
  <DnD />,
  document.getElementById('root')
);
