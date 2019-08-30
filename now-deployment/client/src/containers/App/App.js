import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Main } from '..';

import { Background, SecuredRoute } from '../../components';
//import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Switch>
        <SecuredRoute exact path='/' component={Main} />
        <Route component={Login} />
      </Switch>
      <Background />
    </div>
  );
}

export default App;
