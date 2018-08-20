import React, { Component } from 'react'
// import {getPeople} from './actions/people';
import { Provider } from 'react-redux';
import store from './reducers';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { AddSurvivor } from './components/AddSurvivor';
import { ListSurvivor } from './components/ListSurvivor';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
      <Router>
          <div>
            <Header />
            <Route exact path="/" component={ListSurvivor} />
            <Route exact path="/addsurvivor" component={AddSurvivor} />
          </div>
        </Router>

      </Provider>
    )
  }
}

export default App;