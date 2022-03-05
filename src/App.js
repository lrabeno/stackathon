import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Breakout from './games/breakout';

const App = () => {
  return (
    // <div className="App">
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/breakout">About</Link>
    //     </li>
    //   </ul>
    //   <hr />
    //   <Switch>
    //     <Route exact path="/">
    //       <h1>Home</h1>
    //     </Route>
    //     <Route path="/breakout">
    //       <Breakout />
    //     </Route>
    //   </Switch>
    // </div>
    <Router>
      <Switch>
        <Route path="/">
          <Breakout />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
