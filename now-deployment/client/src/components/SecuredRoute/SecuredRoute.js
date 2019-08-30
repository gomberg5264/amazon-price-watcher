import React, { useState, useEffect } from 'react';

import { Route, Redirect } from 'react-router-dom';

import Auth from '../../utils/Auth';

const SecuredRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [authorised, setAuthorised] = useState(false);

  async function asyncCheckAuth() {
    try {
      const isAuth = await Auth.checkAuth();
      setAuthorised(isAuth);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    asyncCheckAuth();
  }, []);

  return (
    !loading && (
      <Route
        {...rest}
        render={props =>
          authorised ? <Component {...props} /> : <Redirect to='/login' />
        }
      />
    )
  );
};

export default SecuredRoute;
