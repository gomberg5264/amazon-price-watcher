import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Main } from '..';

import { Background } from '../../components';
//import { BrowserRouter as Router } from 'react-router-dom';

import Ajax from '../../utils/Ajax';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await Ajax.verify();
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      }
    };

    verify();
  }, []);

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route component={Login} />
      </Switch>
      <Background />
    </div>
  );
}

export default App;
