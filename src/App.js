import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import {BrowserRouter as Router} from 'react-router-dom';

import {HashRouter as Router, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import HomePage from './HomePage/HomePage';
import AdminPage from './AdminPage/AdminPage';
import VotePage from './VotePage/VotePage';

// HorizontalSliderVotePanel

/*
      <Router>
      <div>
        <Route path="/" strict exact component={HomePage} />
        <Route path="/admin/" strict exact component={AdminPage} />
        <Route path="/vote/" strict exact component={VotePage} />
      </div>
      </Router>          
*/


class App extends Component {
  
  render() {
    return (
      <Router>
      <Switch>
        <Route path="/" strict exact component={HomePage} />
        <Route path="/admin/" strict exact component={AdminPage} />
        <Route path="/vote/" strict exact component={VotePage} />
      </Switch>
      </Router>          
    );
  }
}

export default App;
