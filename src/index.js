import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';
import Login from "./js/Login";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();