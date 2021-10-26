import React from 'react';
import Header from './components/Header';
import Pictures from './components/Pictures';
import ToolBar from './components/ToolBar';
import About from './components/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header></Header>   
        <Switch>
          <Route path="/about">
            <About></About>
          </Route>
          <Route Path="/">
            <ToolBar></ToolBar>
            <Pictures></Pictures>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
