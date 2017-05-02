import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import allStores from './stores';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider stores={allStores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
