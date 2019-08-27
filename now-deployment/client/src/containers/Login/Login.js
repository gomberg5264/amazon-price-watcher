import React from 'react';

import { LoginForm } from '../../components';

import './Login.scss';

const Login = () => {
  return (
    <main>
      <div className='login-content'>
        <div className='intro'>
          <h1 className='title'>Amazon Price Watcher</h1>
          <p className='slogan'>Never miss a deal again</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
