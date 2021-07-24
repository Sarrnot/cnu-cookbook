import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Notifications from 'react-notify-toast';

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
