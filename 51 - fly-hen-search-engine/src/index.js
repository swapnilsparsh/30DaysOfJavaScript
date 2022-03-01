import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { StateContextProvider } from './contexts/StateContextProvider';
import './global.css';

ReactDom.render(
  <StateContextProvider>
    <Router>
      <App />
    </Router>
  </StateContextProvider>,
  document.getElementById('root'),
);

