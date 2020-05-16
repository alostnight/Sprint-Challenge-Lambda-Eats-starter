import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Home, Pizza, Navigation } from './components';

const App = () => (
  <div>
    <Navigation />
    <Route exact path="/" component={Home} />
    <Route exact path="/pizza" component={Pizza} />
  </div>
);

export default App;