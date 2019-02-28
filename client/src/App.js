import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AbsoluteEmissions from './pages/AbsoluteEmissions';
import PerCapitaEmissions from './pages/PerCapitaEmissions';
import CountryEmissions from './pages/CountryEmissions';

class App extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" render={(props) => <AbsoluteEmissions {...props} />} />
            <Route path="/per_capita" component={PerCapitaEmissions} />
            <Route path="/country/:countrycode/:type" component={CountryEmissions} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
