import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import Main from './main';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <Router>
      <Main />
    </Router>
  </React.Fragment>
);

