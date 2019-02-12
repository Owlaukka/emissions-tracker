import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import NavBar from './components/NavBar';
import Extras from './pages/extras';

class App extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        {/* perhaps make Router into it's own component as well to clean up App */}
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route path="/extras" component={Extras} />
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;
