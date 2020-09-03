import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import {SelectedPostProvider} from '../src/components/BlogPost/SelectedPostContext';
import {GeneralContextProvider} from './components/GeneralContext';

ReactDOM.render(
  <GeneralContextProvider>
    <SelectedPostProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SelectedPostProvider>
  </GeneralContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
