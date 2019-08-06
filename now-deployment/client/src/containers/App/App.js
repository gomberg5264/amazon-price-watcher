import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Main } from '..';
//import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

export default App;
